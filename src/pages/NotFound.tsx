
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { GradientText } from "../components/Animations";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bar-dark text-white px-6">
      <div className="glass-card p-10 md:p-16 text-center max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-7xl md:text-8xl font-bold mb-4">
            <GradientText>404</GradientText>
          </h1>
          <p className="text-xl text-white/70 mb-8">This page doesn't exist or has been moved.</p>
          <div className="h-[1px] w-24 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mb-8"></div>
        </div>
        
        <a 
          href="/" 
          className="px-8 py-3 bg-bar-light border border-neon-blue/30 rounded-md text-neon-blue hover:bg-neon-blue/10 transition-all duration-300 inline-block"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
