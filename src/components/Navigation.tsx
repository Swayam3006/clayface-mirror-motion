
import React from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  progressWidth: any;
}

const Navigation: React.FC<NavigationProps> = ({ progressWidth }) => {
  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Scroll Progress Indicator */}
      <motion.div 
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
        style={{ width: progressWidth }}
      />
      
      <div className="max-w-9xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img 
              src="/lovable-uploads/3382841d-c916-484e-9546-4986e750f57c.png"
              alt="Clayface Logo"
              className="h-8 w-8"
              whileHover={{ 
                scale: 1.1,
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 }
              }}
            />
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            {['Platform', 'Solutions', 'Resources', 'About'].map((item, index) => (
              <motion.a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="text-gray-600 hover:text-black transition-colors text-sm font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.1,
                  color: "#000",
                  transition: { duration: 0.2 }
                }}
              >
                {item}
              </motion.a>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                className="bg-black text-white hover:bg-gray-800 text-sm font-medium px-6"
              >
                <a
                  href="https://calendly.com/shahrukhmd/phyllo"
                  target="_self"
                  rel="noopener noreferrer"
                >
                  Get started
                </a>
              </Button>


            </motion.div>
            <div className="md:hidden">
              <motion.div whileHover={{ rotate: 90 }} whileTap={{ scale: 0.9 }}>
                <Menu className="w-6 h-6" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
