import React, { useState, useEffect } from 'react';
import { Table, Upload, Button, Form, Input, DatePicker, message, Space, Statistic, Card, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
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
        },
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
        },
        {
            title: 'Tháng',
            dataIndex: 'month',
            key: 'month',
            render: (date) => moment(date).format('MM/YYYY')
        }
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Quản lý lương</h1>
            
            <Row gutter={16} className="mb-6">
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Tổng số cộng tác viên"
                            value={stats.totalEmployees}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Tổng chi lương"
                            value={stats.totalSalary}
                            precision={0}
                            formatter={(value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
                        />
                    </Card>
                </Col>
            </Row>

            <div className="mb-6">
                <Form layout="inline" onFinish={fetchSalaries}>
                    <Form.Item label="Tên">
                        <Input
                            value={filters.name}
                            onChange={e => setFilters({ ...filters, name: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input
                            value={filters.email}
                            onChange={e => setFilters({ ...filters, email: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Mã CTV">
                        <Input
                            value={filters.employeeId}
                            onChange={e => setFilters({ ...filters, employeeId: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Tháng">
                        <DatePicker
                            picker="month"
                            value={filters.month ? moment(filters.month) : null}
                            onChange={date => setFilters({ ...filters, month: date })}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={fetchSalaries}>
                            Tìm kiếm
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <div className="mb-6">
                <Upload
                    accept=".xlsx,.csv"
                    beforeUpload={handleUpload}
                    showUploadList={false}
                >
                    <Button icon={<UploadOutlined />}>Upload File Excel</Button>
                </Upload>
            </div>

            <Table
                columns={columns}
                dataSource={salaries}
                loading={loading}
                rowKey="_id"
                scroll={{ x: true }}
            />
        </div>
    );
};

export default SalaryManagement;
