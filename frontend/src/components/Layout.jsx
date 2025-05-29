import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isAdminPage = location.pathname.startsWith('/admin');

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className={`flex-1 ${!isHomePage && 'pt-16'}`}>
                <div className={`${!isHomePage && !isAdminPage && 'container mx-auto px-4 py-8'}`}>
                    <Outlet />
                </div>
            </main>
            {!isAdminPage && (
                <footer className="bg-gray-800 text-white py-8 mt-auto">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Về chúng tôi</h3>
                                <p className="text-gray-300">
                                    DigiSER - Đơn vị tiên phong trong lĩnh vực chuyển đổi số toàn diện cho doanh nghiệp và tổ chức.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
                                <ul className="space-y-2">
                                    <li><a href="/services" className="text-gray-300 hover:text-white">Dịch vụ</a></li>
                                    <li><a href="/projects" className="text-gray-300 hover:text-white">Dự án</a></li>
                                    <li><a href="/about" className="text-gray-300 hover:text-white">Về chúng tôi</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li>Email: contact@digiser.com</li>
                                    <li>Điện thoại: (024) 123 456 789</li>
                                    <li>Địa chỉ: Việt Nam</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                            <p>&copy; {new Date().getFullYear()} DigiSER. Đã đăng ký bản quyền.</p>
                        </div>
                    </div>
                </footer>
            )}
        </div>
    );
};

export default Layout;
