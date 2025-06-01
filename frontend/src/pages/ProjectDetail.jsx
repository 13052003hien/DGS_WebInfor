import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle, FaBuilding, FaPhone, FaEnvelope, FaDollarSign, FaClipboardList, FaChartLine, FaTasks, FaUsers } from 'react-icons/fa';
import projectService from '../services/project.service';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await projectService.getProjectById(id);
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Không tìm thấy dự án</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Project Header */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="relative h-96">
              <img
                src={project.images?.[0]?.url || '/assets/placeholder-project.jpg'}
                alt={project.projectName}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h1 className="text-4xl font-bold text-white mb-2">{project.projectName}</h1>
                <div className="flex items-center text-white/90 gap-4">
                  <span>{project.projectType}</span>
                  <span>•</span>
                  <span>{format(new Date(project.createdAt), 'dd MMMM, yyyy', { locale: vi })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">              {/* Breadcrumb */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center text-sm">
                <Link to="/" className="text-gray-500 hover:text-blue-600">Trang chủ</Link>
                <span className="mx-2 text-gray-400">/</span>
                <Link to="/#projects" className="text-gray-500 hover:text-blue-600">Dự án</Link>
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-blue-600">{project.projectName}</span>
              </div>

              {/* Project Overview */}
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <FaBuilding className="text-2xl text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-800">Tổng quan dự án</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-700">Địa điểm</h4>
                      <p className="text-gray-600">{project.specificLocation}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCalendarAlt className="text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-700">Thời gian</h4>
                      <p className="text-gray-600">
                        {format(new Date(project.createdAt), 'dd MMMM, yyyy', { locale: vi })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Mô tả chi tiết</h3>
                  <div className="prose max-w-none text-gray-600 leading-relaxed">
                    {project.projectDetails.split('\\n').map((paragraph, index) => (
                      paragraph.trim() && (
                        <div key={index} className="flex items-start gap-3 mb-4">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <p>{paragraph}</p>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Gallery with Improved Layout */}
              {project.images && project.images.length > 1 && (
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                    Hình ảnh dự án
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {project.images.map((image, index) => (
                      <motion.div
                        key={index}
                        className="relative aspect-video group cursor-pointer overflow-hidden rounded-lg"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <img
                          src={image.url}
                          alt={`${project.projectName} - ${index + 1}`}
                          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>            {/* Project Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                  Thông tin liên hệ
                </h3>
                <div className="space-y-6">
                  {/* {project.location && (
                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-700">Khu vực</h4>
                        <p className="text-gray-600">{project.location.name}</p>
                      </div>
                    </div>
                  )} */}
                  
                  {project.salary && (
                    <div className="flex items-start gap-3">
                      <FaDollarSign className="text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-700">Giá trị dự án</h4>
                        <p className="text-gray-600">{project.salary}</p>
                      </div>
                    </div>
                  )}

                  {project.contact && (
                    <div className="border-t border-gray-100 pt-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(project.contact.name)}&background=e3f2fd&color=1e88e5`}
                            alt={project.contact.name}
                            className="w-10 h-10 rounded-full"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700">{project.contact.name}</h4>
                          <p className="text-sm text-gray-500">Người phụ trách dự án</p>
                        </div>
                      </div>
                      
                      {project.contact.email && (
                        <div className="flex items-center gap-3 mb-3">
                          <FaEnvelope className="text-blue-600" />
                          <a href={`mailto:${project.contact.email}`} className="text-gray-600 hover:text-blue-600 transition-colors">
                            {project.contact.email}
                          </a>
                        </div>
                      )}
                      
                      {project.contact.phone && (
                        <div className="flex items-center gap-3 mb-3">
                          <FaPhone className="text-blue-600" />
                          <a href={`tel:${project.contact.phone}`} className="text-gray-600 hover:text-blue-600 transition-colors">
                            {project.contact.phone}
                          </a>
                        </div>
                      )}

                      {project.contact.address && (
                        <div className="flex items-center gap-3">
                          <FaMapMarkerAlt className="text-blue-600" />
                          <span className="text-gray-600">
                            {project.contact.address}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
