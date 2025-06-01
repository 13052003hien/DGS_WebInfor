import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import digitalTransform from '../assets/digital-transform.png';

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-700 text-white min-h-[90vh] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10"></div>
      <div className="container mx-auto px-6 h-full">
        <div className="grid md:grid-cols-2 gap-12 items-center h-full py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="z-10 max-w-2xl"
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              DigiSER - Chuyển đổi số tổng thể
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl mb-10 leading-relaxed text-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Chúng tôi cung cấp các dịch vụ chuyển số toàn diện trong lĩnh vực hành chính công, 
              địa chính, văn bản hành chính với giải pháp hiện đại và hiệu quả.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link
                to="contact"
                smooth={true}
                className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold hover:bg-blue-100 transition-all duration-300 inline-flex items-center space-x-2 hover:shadow-lg transform hover:-translate-y-1"
              >
                <span>Đăng ký tư vấn</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 hidden md:block"
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <img
                src={digitalTransform}
                alt="Digital Transformation"
                className="w-full max-w-2xl mx-auto drop-shadow-2xl rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-700/30 to-transparent rounded-lg"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;