import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              DigiSER - Chuyển đổi số tổng thể
            </h1>
            <p className="text-xl mb-8">
              Chúng tôi cung cấp các dịch vụ chuyển đổi số dữ liệu từ quy trình
              triển khai dự án số hoá đến phần mềm số hoá
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
              >
                Liên hệ ngay
              </Link>
              <Link
                to="/projects"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Xem dự án
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform -skew-y-2 origin-left"></div>
      </div>

      {/* History Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Bắt đầu từ những dự án nhỏ - Thành công
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Được hình thành từ cuối 2022, DigiSER nổi lên là một trong những
              đơn vị gia công dịch vụ số hàng đầu trong lĩnh vực số hoá dữ liệu.
              Bước đầu tiếp cận với dữ liệu khối công, những dự án tỉnh thành
              công đã tạo động lực cho chúng tôi từng bước phát triển hơn.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Với phương chăm khách hàng và CTV ưu tiên hàng đầu, chúng tôi đã
              đầu tư công nghệ kỹ thuật để online hóa toàn bộ quy trình dự án
              triển khai. Chúng tôi mong muốn tạo ra môi trường làm việc hiệu
              quả và năng động cho các đối tác khắp cả nước.
            </p>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Sứ mệnh và tầm nhìn</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg leading-relaxed mb-12">
              DGS mong muốn tạo ra môi trường làm việc an toàn và hiệu quả cho
              các bạn CTV số hoá, đảm bảo bảo mật dữ liệu an toàn và tiến độ thi
              công đối với các đơn vị thầu đã tin tưởng hợp tác với chúng tôi.
              Cùng đồng hành tạo ra môi trường làm việc minh bạch và chuyên
              nghiệp.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">3+</div>
              <div className="text-gray-600">Năm kinh nghiệm</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
              <div className="text-gray-600">Dự án thành công</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">25k+</div>
              <div className="text-gray-600">Nhân sự</div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Areas */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Lĩnh vực hoạt động</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Hành chính công</h3>
              <p className="text-gray-600">
                Số hóa và tối ưu hóa quy trình hành chính
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Địa chính</h3>
              <p className="text-gray-600">
                Quản lý và số hóa dữ liệu địa chính
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Văn thư lưu trữ</h3>
              <p className="text-gray-600">
                Số hóa và quản lý tài liệu lưu trữ
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Văn bản hành chính</h3>
              <p className="text-gray-600">
                Chuyển đổi và quản lý văn bản điện tử
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Bạn đang cần hỗ trợ dịch vụ về dự án số hoá?
          </h2>
          <p className="text-xl mb-8">
            Liên hệ với chúng tôi để được tư vấn giải pháp phù hợp nhất!
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
          >
            Liên hệ ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
