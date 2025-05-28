import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-700 text-white min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              DigiSER - Chuyển đổi số tổng thể
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Chúng tôi cung cấp các dịch vụ chuyển số toàn diện trong lĩnh vực hành chính công, 
              địa chính, văn bản hành chính
            </p>
            <Link
              to="contact"
              smooth={true}
              className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300 inline-block"
            >
              Đăng ký tư vấn
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block"
          >
            <img
              src="/assets/digital-transform.svg"
              alt="Digital Transformation"
              className="w-full max-w-lg mx-auto"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;