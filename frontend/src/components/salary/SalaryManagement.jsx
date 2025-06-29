import React, { useState, useEffect } from 'react';
import { 
    Table, 
    Upload, 
    Button, 
    Form, 
    Input, 
    DatePicker, 
    message, 
    Statistic, 
    Card, 
    Row, 
    Col,
    Divider,
    Tooltip
} from 'antd';
import { 
    UploadOutlined, 
    UserOutlined, 
    DollarOutlined,
    SearchOutlined,
    CalendarOutlined,
    MailOutlined,
    IdcardOutlined
} from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { apiClient } from '../../config/api.config';
import moment from 'moment';

const SalaryManagement = () => {
    const [salaries, setSalaries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({
        totalEmployees: 0,
        totalSalary: 0
    });
    const [filters, setFilters] = useState({
        name: '',
        email: '',
        employeeId: '',
        month: null
    });

    useEffect(() => {
        fetchSalaries();
    }, [filters]); // Refetch when filters change

    const fetchSalaries = async () => {
        try {
            setLoading(true);
            const params = {
                ...filters,
                month: filters.month ? moment(filters.month).format('YYYY-MM-DD') : undefined
            };

            const [salariesRes, statsRes] = await Promise.all([
                apiClient.get('/salary/all', { params }),
                apiClient.get('/salary/stats', { 
                    params: { month: params.month } 
                })
            ]);

            setSalaries(salariesRes.data.data);
            setStats(statsRes.data.data);
        } catch (error) {
            message.error('Lỗi khi tải dữ liệu lương');
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (file) => {
        try {
            setLoading(true);
            // Kiểm tra loại file và dung lượng
            const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                           file.type === 'application/vnd.ms-excel' ||
                           file.type === 'text/csv';
            
            const isLt5M = file.size / 1024 / 1024 < 5;

            if (!isExcel) {
                message.error('Chỉ chấp nhận file Excel (.xlsx, .xls) hoặc CSV');
                return false;
            }
            if (!isLt5M) {
                message.error('File phải nhỏ hơn 5MB!');
                return false;
            }

            const formData = new FormData();
            formData.append('file', file);
            
            const response = await apiClient.post('/salary/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                message.success('Upload file lương thành công');
                fetchSalaries();
            } else {
                throw new Error(response.data.message || 'Upload không thành công');
            }
        } catch (error) {
            console.error('Upload error:', error.response || error);
            message.error(error.response?.data?.message || error.response?.data?.details || 'Lỗi khi upload file lương');
        } finally {
            setLoading(false);
        }
        return false; // Prevent default upload behavior
    };

    const columns = [
        {
            title: 'Mã CTV',
            dataIndex: 'employeeId',
            key: 'employeeId',
            width: 120,
        },
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
            width: 200,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 250,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            width: 150,
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'amount',
            key: 'amount',
            width: 150,
            render: (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
            width: 200,
        },
        {
            title: 'Tháng',
            dataIndex: 'month',
            key: 'month',
            width: 120,
            render: (date) => moment(date).format('MM/YYYY')
        }
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">Quản lý lương</h1>
                    <Upload
                        accept=".xlsx,.csv"
                        beforeUpload={handleUpload}
                        showUploadList={false}
                    >
                        <Button 
                            type="primary" 
                            icon={<UploadOutlined />}
                            size="large"
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Upload File Excel
                        </Button>
                    </Upload>
                </div>

                {/* Statistics Cards */}
                <Row gutter={16} className="mb-8">
                    <Col xs={24} sm={12} md={8} lg={8}>
                        <Card 
                            hoverable 
                            className="shadow-md transition-all duration-300 hover:shadow-lg"
                        >
                            <Statistic
                                title={<span className="text-lg font-semibold text-gray-600">Tổng số cộng tác viên</span>}
                                value={stats.totalEmployees}
                                prefix={<UserOutlined className="text-blue-500" />}
                                valueStyle={{ color: '#1890ff', fontWeight: 'bold' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8}>
                        <Card 
                            hoverable 
                            className="shadow-md transition-all duration-300 hover:shadow-lg"
                        >
                            <Statistic
                                title={<span className="text-lg font-semibold text-gray-600">Tổng chi lương</span>}
                                value={stats.totalSalary}
                                precision={0}
                                prefix={<DollarOutlined className="text-green-500" />}
                                formatter={(value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
                                valueStyle={{ color: '#52c41a', fontWeight: 'bold' }}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Search Filters */}
                <Card className="mb-8 shadow-md">
                    <Form layout="vertical" onFinish={fetchSalaries} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Form.Item label="Tên">
                            <Input
                                prefix={<UserOutlined className="text-gray-400" />}
                                value={filters.name}
                                onChange={e => setFilters({ ...filters, name: e.target.value })}
                                placeholder="Nhập tên cộng tác viên"
                                className="rounded-lg"
                            />
                        </Form.Item>
                        <Form.Item label="Email">
                            <Input
                                prefix={<MailOutlined className="text-gray-400" />}
                                value={filters.email}
                                onChange={e => setFilters({ ...filters, email: e.target.value })}
                                placeholder="Nhập email"
                                className="rounded-lg"
                            />
                        </Form.Item>
                        <Form.Item label="Mã CTV">
                            <Input
                                prefix={<IdcardOutlined className="text-gray-400" />}
                                value={filters.employeeId}
                                onChange={e => setFilters({ ...filters, employeeId: e.target.value })}
                                placeholder="Nhập mã CTV"
                                className="rounded-lg"
                            />
                        </Form.Item>
                        <Form.Item label="Tháng">
                            <DatePicker
                                picker="month"
                                value={filters.month ? moment(filters.month) : null}
                                onChange={date => setFilters({ ...filters, month: date })}
                                placeholder="Chọn tháng"
                                className="w-full rounded-lg"
                                suffixIcon={<CalendarOutlined className="text-gray-400" />}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button 
                                type="primary" 
                                onClick={fetchSalaries}
                                icon={<SearchOutlined />}
                                className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg h-10"
                            >
                                Tìm kiếm
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>

                {/* Data Table */}
                <Card className="shadow-md">
                    <Table
                        columns={columns}
                        dataSource={salaries}
                        loading={loading}
                        rowKey="_id"
                        scroll={{ x: 'max-content' }}
                        className="overflow-hidden rounded-lg"
                        pagination={{
                            defaultPageSize: 10,
                            showSizeChanger: true,
                            showTotal: (total) => `Tổng số ${total} bản ghi`,
                            className: "pb-4"
                        }}
                        rowClassName="hover:bg-gray-50 transition-colors"
                    />
                </Card>
            </div>
        </div>
    );
};

export default SalaryManagement;
