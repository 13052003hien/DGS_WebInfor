import { motion } from 'framer-motion';
import { FaFileAlt, FaBuilding, FaDatabase, FaChartLine, FaUsersCog, FaLaptopCode } from 'react-icons/fa';

const services = [
  {
    icon: FaFileAlt,
    title: 'Văn thư lưu trữ',
    description: 'Số hóa và quản lý văn bản, tài liệu lưu trữ một cách hiệu quả'
  },
  {
    icon: FaBuilding,
    title: 'Hộ tịch',
    description: 'Chuyển đổi số dữ liệu hộ tịch và quản lý thông tin công dân'
  },
  {
    icon: FaDatabase,
    title: 'Địa chính',
    description: 'Số hóa và quản lý dữ liệu địa chính, bản đồ số'
  },
  {
    icon: FaChartLine,
    title: 'Văn bản hành chính',
    description: 'Quản lý và xử lý văn bản hành chính điện tử'
  },
  {
    icon: FaUsersCog,
    title: 'Tư vấn chuyển đổi số',
    description: 'Tư vấn giải pháp và lộ trình chuyển đổi số toàn diện'
  },
  {
    icon: FaLaptopCode,
    title: 'Phát triển phần mềm',
    description: 'Xây dựng các giải pháp phần mềm theo yêu cầu'
  }
];

const Services = () => {
  return (
    <div className="py-20 bg-gray-50" id="services">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dịch vụ của chúng tôi
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Cung cấp giải pháp chuyển đổi số toàn diện cho doanh nghiệp và cơ quan nhà nước
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-blue-600 mb-4">
                <service.icon size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;