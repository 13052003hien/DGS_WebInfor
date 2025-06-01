import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Projects from '../components/Projects';

const Home = () => {
    return (
        <>
            <Hero />
            <Services />
            <Projects isHomePage={true} />
            {/* View All Projects Button */}
            <div className="text-center pb-20">
                <Link 
                    to="/projects"
                    className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                    Xem tất cả dự án
                </Link>
            </div>
        </>
    );
};

export default Home;