import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import projectService from '../services/project.service';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getAllProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

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
            >              <div className="relative h-48">
                <img
                  src={project.images?.[0]?.url || '/assets/placeholder-project.jpg'}
                  alt={project.projectName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  {format(new Date(project.createdAt), 'MM/yyyy', { locale: vi })}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.projectName}</h3>
                <p className="text-gray-600 line-clamp-2">{project.projectDetails}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{project.projectType}</span>                  <span 
                    onClick={() => navigate(`/projects/${project._id}`)}
                    className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300 cursor-pointer"
                  >
                    Xem chi tiết →
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <span className="font-medium">Địa điểm:</span> {project.specificLocation}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;