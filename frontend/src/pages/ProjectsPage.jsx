import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Projects from '../components/Projects';
import { useEffect } from 'react';

const ProjectsPage = () => {
  return (
    <>
      <Helmet>
        <title>Dự án - DGS</title>
        <meta name="description" content="Danh sách các dự án chuyển đổi số của DGS" />
      </Helmet>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Dự Án</h1>
            <p className="text-xl text-blue-100">
              Khám phá các dự án chuyển đổi số tiêu biểu của chúng tôi
            </p>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <Projects />
    </>
  );
};

export default ProjectsPage;
