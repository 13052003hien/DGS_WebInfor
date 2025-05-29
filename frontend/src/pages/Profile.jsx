import { useState } from 'react';
import { getCurrentUser, updateProfile } from '../services/auth.service';

const Profile = () => {
    const [user, setUser] = useState(getCurrentUser());
    const [formData, setFormData] = useState({
        email: user?.email || '',
        fullName: user?.fullName || '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateProfile(formData);
            setUser(updatedUser);
            setMessage('Cập nhật thông tin thành công!');
            setIsSuccess(true);
            setFormData({ ...formData, password: '' });
        } catch (error) {
            setMessage(error.response?.data?.message || 'Lỗi khi cập nhật thông tin');
            setIsSuccess(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
                <div className="md:w-1/3 bg-blue-600 p-8 text-white">
                    <div className="text-center">
                        <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center text-blue-600 text-4xl font-bold mb-4">
                            {user?.fullName?.charAt(0)}
                        </div>
                        <h2 className="text-xl font-semibold mb-2">{user?.fullName}</h2>
                        <p className="text-blue-200 text-sm">{user?.role === 'admin' ? 'Quản trị viên' : 'Thành viên'}</p>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">Thông tin tài khoản</h3>
                        <div className="space-y-2 text-sm">
                            <p>
                                <span className="text-blue-200">Email:</span>
                                <br />
                                {user?.email}
                            </p>
                            <p>
                                <span className="text-blue-200">Tên đăng nhập:</span>
                                <br />
                                {user?.username}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="md:w-2/3 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Cập nhật thông tin</h2>
                    
                    {message && (
                        <div className={`p-4 mb-6 rounded-lg ${
                            isSuccess ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                Họ và tên
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Mật khẩu mới (để trống nếu không đổi)
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cập nhật
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;