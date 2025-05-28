import Hero from '../components/Hero';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Hero />
            <Services />
            <Projects />
        </div>
    );
};

export default Home;