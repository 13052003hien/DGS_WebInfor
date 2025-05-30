import { useState, useRef } from 'react';
import { getCurrentUser, updateProfile } from '../services/auth.service';
import { userService } from '../services/user.service';
import Toast from '../components/Toast';

const Profile = () => {
    const [user, setUser] = useState(getCurrentUser());
    const [formData, setFormData] = useState({
        email: user?.email || '',
        fullName: user?.fullName || '',
        password: ''
    });
    const [message, setMessage] = useState({ type: '', content: '' });
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

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
            setMessage({ type: 'success', content: 'Cập nhật thông tin thành công!' });
            setIsSuccess(true);
            setFormData({ ...formData, password: '' });
        } catch (error) {
            setMessage({ type: 'error', content: error.response?.data?.message || 'Lỗi khi cập nhật thông tin' });
            setIsSuccess(false);
        }
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setMessage({ type: 'error', content: 'Vui lòng tải lên tệp hình ảnh' });
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setMessage({ type: 'error', content: 'Kích thước hình ảnh phải nhỏ hơn 5MB' });
            return;
        }

        const formData = new FormData();
        formData.append('avatar', file);

        setLoading(true);
        try {            const result = await userService.uploadAvatar(formData);
            const updatedUser = { ...user, imageUrl: result.imageUrl };
            setUser(updatedUser);
            // Update localStorage with new user data
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setMessage({ type: 'success', content: 'Cập nhật ảnh đại diện thành công' });
        } catch (error) {
            setMessage({ type: 'error', content: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
                <div className="md:w-1/3 bg-blue-600 p-8 text-white">
                    <div className="text-center">
                        <div className="relative group mx-auto w-32">
                            <div className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden mb-4 transition-transform duration-300 transform group-hover:scale-105">
                                {user?.imageUrl ? (
                                    <img
                                        src={user.imageUrl}
                                        alt={user.fullName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-blue-600 text-4xl font-bold bg-white">
                                        {user?.fullName?.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={loading}
                                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-md opacity-0 group-hover:opacity-100"
                                title="Thay đổi ảnh đại diện"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleAvatarChange}
                                className="hidden"
                                accept="image/*"
                            />
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
                    
                    {message.content && (
                        <Toast 
                            type={message.type}
                            message={message.content}
                            onClose={() => setMessage({ type: '', content: '' })}
                        />
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