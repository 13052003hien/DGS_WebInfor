const xlsx = require('xlsx');
const Salary = require('../models/salary.model');
const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');

class SalaryService {
    async uploadSalaryFile(file) {
        let data = null;
        try {
            console.log('Starting to process file:', {
                filename: file.originalname,
                size: file.size,
                mimetype: file.mimetype
            });

            // Read Excel file from buffer with specific options
            const workbook = xlsx.read(file.buffer, { 
                type: 'buffer',
                raw: true,
                cellDates: true,
                dateNF: 'yyyy-mm-dd'
            });
            
            // Log available sheets
            console.log('Sheets in workbook:', workbook.SheetNames);
            
            // Assuming first sheet contains data
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            
            // Get the header row to check column names
            const range = xlsx.utils.decode_range(worksheet['!ref']);
            const headers = [];
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const cell = worksheet[xlsx.utils.encode_cell({r: range.s.r, c: C})];
                headers.push(cell ? cell.v : undefined);
            }
            console.log('Excel headers found:', headers);
            
            // Convert to JSON with specific options
            data = xlsx.utils.sheet_to_json(worksheet, {
                raw: false,
                defval: null,
                header: headers
            });

            if (!data || data.length === 0) {
                throw new Error('File không có dữ liệu');
            }

            // Process and validate data
            const currentMonth = new Date();
            currentMonth.setDate(1); // Set to first day of month
            currentMonth.setHours(0, 0, 0, 0); // Set to beginning of day

            const processedData = data.map((row, index) => {
                // Clean up column names by removing dots and standardizing
                const cleanRowData = {};
                Object.keys(row).forEach(key => {
                    if (key) {
                        const cleanKey = key.replace('.', '').trim();
                        cleanRowData[cleanKey] = row[key];
                    }
                });

                console.log(`Processing row ${index + 1}:`, cleanRowData);

                // Extract and clean amount
                let amount = cleanRowData['Tổng tiền']?.toString() || '0';
                // Remove currency symbol and spaces
                amount = amount.replace(/[đ₫\s]/g, '');
                // Replace dots with empty string if they're thousand separators
                amount = amount.replace(/\.(?=\d{3})/g, '');
                // Now convert to number
                const parsedAmount = parseFloat(amount);
                
                console.log('Amount processing:', {
                    original: cleanRowData['Tổng tiền'],
                    afterRemovingCurrency: amount,
                    finalParsed: parsedAmount
                });

                const item = {
                    employeeId: cleanRowData['Mã CTV']?.toString().trim(),
                    name: cleanRowData['full_name']?.toString().trim(),
                    email: (cleanRowData['email'] || cleanRowData['Email'])?.toString().toLowerCase().trim(),
                    phone: (cleanRowData['SĐT'] || cleanRowData['SDT'])?.toString().trim(),
                    amount: parsedAmount || 0,
                    note: cleanRowData['Ghi chú']?.toString().trim() || '',
                    month: currentMonth
                };

                console.log(`Processed data for row ${index + 1}:`, item);

                // Validate each row and log issues
                const validationIssues = [];
                if (!item.employeeId) validationIssues.push('Thiếu Mã CTV');
                if (!item.name) validationIssues.push('Thiếu Họ tên');
                if (!item.email) validationIssues.push('Thiếu Email');
                if (item.amount <= 0) validationIssues.push('Tổng tiền không hợp lệ');

                if (validationIssues.length > 0) {
                    console.error(`Validation issues in row ${index + 1}:`, {
                        rowData: cleanRowData,
                        processedData: item,
                        issues: validationIssues
                    });
                }

                return item;
            });

            // Validate required fields
            const validData = processedData.filter(item => {
                const isValid = 
                    item.employeeId && 
                    item.name && 
                    item.email && 
                    item.amount > 0;
                
                if (!isValid) {
                    console.error('Invalid data row:', {
                        item,
                        issues: {
                            employeeId: !item.employeeId ? 'Missing' : 'OK',
                            name: !item.name ? 'Missing' : 'OK',
                            email: !item.email ? 'Missing' : 'OK',
                            amount: item.amount <= 0 ? 'Invalid' : 'OK'
                        }
                    });
                }
                
                return isValid;
            });

            const summary = {
                totalRecords: data.length,
                validRecords: validData.length,
                invalidRecords: data.length - validData.length
            };

            console.log('Validation summary:', summary);

            if (validData.length === 0) {
                throw new Error(`Không có dữ liệu hợp lệ trong file. Tổng số ${data.length} bản ghi đều không hợp lệ.`);
            }

            // Insert valid records
            const insertResult = await Salary.insertMany(validData);
            console.log('Insert result:', {
                attempted: validData.length,
                inserted: insertResult.length
            });

            return {
                success: true,
                ...summary,
                insertedRecords: insertResult.length,
                message: `Đã xử lý thành công ${insertResult.length}/${data.length} bản ghi`
            };

        } catch (error) {
            console.error('Salary processing error:', {
                error: error,
                message: error.message,
                stack: error.stack,
                file: {
                    originalname: file.originalname,
                    mimetype: file.mimetype,
                    size: file.size
                }
            });
            throw error;
        }
    }

    async uploadToCloudinary(file) {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'raw',
                    folder: 'salary_files',
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            const buffer = Buffer.from(file.buffer);
            const readable = new Readable();
            readable._read = () => {};
            readable.push(buffer);
            readable.push(null);
            readable.pipe(stream);
        });
    }

    async getSalaries(filters = {}) {
        const query = {};
        
        if (filters.name) {
            query.name = { $regex: new RegExp(filters.name, 'i') };
        }
        if (filters.email) {
            query.email = { $regex: new RegExp(filters.email, 'i') };
        }
        if (filters.employeeId) {
            query.employeeId = { $regex: new RegExp(filters.employeeId, 'i') };
        }
        if (filters.month) {
            const startDate = new Date(filters.month);
            const endDate = new Date(filters.month);
            endDate.setMonth(endDate.getMonth() + 1);
            query.month = { $gte: startDate, $lt: endDate };
        }
        if (filters.minAmount) {
            query.amount = { $gte: parseFloat(filters.minAmount) };
        }
        if (filters.maxAmount && (!query.amount || !query.amount.$gte)) {
            query.amount = { ...query.amount, $lte: parseFloat(filters.maxAmount) };
        }

        return await Salary.find(query).sort({ month: -1, createdAt: -1 });
    }

    async getUserSalary(email) {
        return await Salary.find({ email }).sort({ month: -1 });
    }

    async getSalaryStats(month) {
        const query = {};
        if (month) {
            const startDate = new Date(month);
            const endDate = new Date(month);
            endDate.setMonth(endDate.getMonth() + 1);
            query.month = { $gte: startDate, $lt: endDate };
        }

        const [stats] = await Salary.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    totalEmployees: { $addToSet: '$employeeId' },
                    totalSalary: { $sum: '$amount' }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalEmployees: { $size: '$totalEmployees' },
                    totalSalary: 1
                }
            }
        ]);

        return stats || { totalEmployees: 0, totalSalary: 0 };
    }
}

module.exports = new SalaryService();
