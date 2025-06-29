import React, { useState, useEffect } from 'react';
import { Table, DatePicker, Form, Button, Card, Statistic, Empty, message } from 'antd';
import moment from 'moment';
import { getMySalary } from '../../services/salary.service';

const UserSalary = ({ email }) => {
    const [salaries, setSalaries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(null);

    useEffect(() => {
        fetchSalaryData();
    }, [email, selectedMonth]);

    const fetchSalaryData = async () => {
        if (!email) return;

        try {
            setLoading(true);
            const params = {
                month: selectedMonth ? moment(selectedMonth).format('YYYY-MM-DD') : undefined
            };
            
            const response = await getMySalary(params);
            
            if (response.success) {
                setSalaries(response.data);
                // Calculate total amount
                const total = response.data.reduce((sum, salary) => sum + salary.amount, 0);
                setTotalAmount(total);
            }
        } catch (error) {
            console.error('Error fetching salary data:', error);
            message.error('Lỗi khi tải dữ liệu lương');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Tháng',
            dataIndex: 'month',
            key: 'month',
            render: (date) => moment(date).format('MM/YYYY')
        },
        {
            title: 'Lương',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
        }
    ];

    return (
        <div>
            <div className="mb-6">
                <Card>
                    <Statistic
                        title="Tổng thu nhập"
                        value={totalAmount}
                        precision={0}
                        formatter={(value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
                    />
                </Card>
            </div>

            <div className="mb-6">
                <Form layout="inline">
                    <Form.Item label="Tháng">
                        <DatePicker
                            picker="month"
                            value={selectedMonth ? moment(selectedMonth) : null}
                            onChange={(date) => setSelectedMonth(date)}
                            placeholder="Chọn tháng"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={fetchSalaryData}>
                            Xem lương
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            {salaries.length === 0 && !loading ? (
                <Card className="shadow-sm">
                    <Empty
                        description="Không có dữ liệu lương"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                </Card>
            ) : (
                <Table
                    columns={columns}
                    dataSource={salaries}
                    loading={loading}
                    rowKey="_id"
                    pagination={{
                        defaultPageSize: 5,
                        showSizeChanger: true,
                        showTotal: (total) => `Tổng số ${total} bản ghi`
                    }}
                />
            )}
        </div>
    );
};

export default UserSalary;
