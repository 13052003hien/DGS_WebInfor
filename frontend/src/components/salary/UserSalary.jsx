import React, { useState, useEffect } from 'react';
import { Table, Card, Empty, message } from 'antd';
import moment from 'moment';
import axios from 'axios';

const UserSalary = () => {
    const [salaries, setSalaries] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUserSalary();
    }, []);

    const fetchUserSalary = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/salary/my-salary');
            setSalaries(response.data.data);
        } catch (error) {
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
            title: 'Tổng tiền',
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

    if (salaries.length === 0 && !loading) {
        return (
            <Card className="shadow-sm">
                <Empty
                    description="Không có dữ liệu lương"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            </Card>
        );
    }

    return (
        <Card title="Lịch sử lương của bạn" className="shadow-sm">
            <Table
                columns={columns}
                dataSource={salaries}
                loading={loading}
                rowKey="_id"
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total) => `Tổng ${total} bản ghi`
                }}
            />
        </Card>
    );
};

export default UserSalary;
