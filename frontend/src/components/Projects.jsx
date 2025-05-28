import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Số hóa hồ sơ hộ tịch Nam Định',
    date: 'Tháng 12/24',
    description: 'Chuyển đổi số và quản lý dữ liệu hộ tịch tại Nam Định',
    image: '/assets/project1.jpg'
  },
  {
    title: 'Văn bản hành chính Hải Dương',
    date: 'Tháng 02/25',
    description: 'Số hóa văn bản hành chính tại Hải Dương',
    image: '/assets/project2.jpg'
  },
  {
    title: 'Dự án địa chính Vĩnh Phúc',
    date: 'Tháng 01/25',
    description: 'Quản lý và số hóa dữ liệu địa chính tại Vĩnh Phúc',
    image: '/assets/project3.jpg'
  }
];

const Projects = () => {
  return (
    <div className="py-20 bg-white" id="projects">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dự án tiêu biểu
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Các dự án chuyển đổi số đã và đang triển khai
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  {project.date}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
                <button className="mt-4 text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300">
                  Xem chi tiết →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;