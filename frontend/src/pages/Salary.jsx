import React, { useState, useEffect } from 'react';
import { Table, DatePicker, Form, Button, Input } from 'antd';
import moment from 'moment';
import { getSalaries } from '../services/salary.service';
import { getCurrentUser } from '../services/auth.service';

const Salary = () => {
    const [salaries, setSalaries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        name: '',
        email: '',
        month: null
    });

    useEffect(() => {
        fetchSalaries();
    }, [filters]);

    const fetchSalaries = async () => {
        try {
            setLoading(true);
            const params = {
                ...filters,
                month: filters.month ? moment(filters.month).format('YYYY-MM-DD') : undefined
            };

            const response = await getSalaries(params);
            
            if (response.success) {
                setSalaries(response.data);
            }
        } catch (error) {
            console.error('Error fetching salary data:', error);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
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
            <h1 className="text-2xl font-bold mb-6">Danh sách lương cộng tác viên</h1>

            <div className="mb-6">
                <Form layout="inline" onFinish={fetchSalaries}>
                    <Form.Item label="Tên">
                        <Input
                            value={filters.name}
                            onChange={e => setFilters({ ...filters, name: e.target.value })}
                            placeholder="Nhập tên cộng tác viên"
                        />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input
                            value={filters.email}
                            onChange={e => setFilters({ ...filters, email: e.target.value })}
                            placeholder="Nhập email"
                        />
                    </Form.Item>
                    <Form.Item label="Tháng">
                        <DatePicker
                            picker="month"
                            value={filters.month ? moment(filters.month) : null}
                            onChange={date => setFilters({ ...filters, month: date })}
                            placeholder="Chọn tháng"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={fetchSalaries}>
                            Tìm kiếm
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <Table
                columns={columns}
                dataSource={salaries}
                loading={loading}
                rowKey="_id"
                scroll={{ x: true }}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total) => `Tổng số ${total} bản ghi`,
                }}
            />
        </div>
    );
};

export default Salary;