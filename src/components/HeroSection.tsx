
import React, { useRef } from 'react';
import { motion, useInView, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  heroParallaxY: any;
  heroScale: any;
  heroOpacity: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ heroParallaxY, heroScale, heroOpacity }) => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });

  // Advanced Text Reveal Component
  const RevealText: React.FC<{ 
    children: string; 
    inView: boolean; 
    delay?: number;
    className?: string;
  }> = ({ children, inView, delay = 0, className = "" }) => {
    const words = children.split(' ');
    
    return (
      <span className={className}>
        {words.map((word, index) => (
          <span key={index} className="inline-block">
            <motion.span
              className="inline-block"
              initial={{ y: 100, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
              transition={{
                duration: 0.8,
                delay: delay + (index * 0.1),
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {word}&nbsp;
            </motion.span>
          </span>
        ))}
      </span>
    );
  };

  return (
    <section className="pt-48 pb-20 px-6 relative overflow-hidden" ref={heroRef}>
      {/* Advanced Parallax Background */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ y: heroParallaxY }}
        viewport={{ once: true }}
      >
        {/* Floating gradient orbs */}
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-indigo-200/30 to-pink-200/30 rounded-full blur-3xl"
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.5, 1],
            rotate: [0, 360],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>

      <motion.div 
        className="max-w-6xl mx-auto text-center relative z-10"
        style={{ 
          scale: heroScale,
          opacity: heroOpacity 
        }}
      >
        <motion.div 
          className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 relative"
          initial={{ scale: 0, opacity: 0 }}
          animate={heroInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ 
            duration: 0.6, 
            ease: "backOut",
            delay: 0.2 
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(59, 130, 246, 0.3)"
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          Decision Intelligence Platform for CPG Brands
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <RevealText inView={heroInView} delay={0.6}>
            From insight to impact
          </RevealText>
          <br />
          <motion.span 
            className="text-blue-600 inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { 
              opacity: 1, 
              y: 0
            } : { 
              opacity: 0, 
              y: 20 
            }}
            transition={{ 
              opacity: { duration: 0.6, delay: 0.8 },
              y: { duration: 0.6, delay: 0.8 }
            }}
            style={{
              background: "linear-gradient(45deg, #2563eb, #7c3aed, #ec4899)",
              backgroundSize: "200% 200%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            <RevealText inView={heroInView} delay={1.0}>
              in minutes, not months
            </RevealText>
          </motion.span>
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <RevealText inView={heroInView} delay={1.8}>
            Your Strategic Command Center. Access a single source of truth, generate actionable insights instantly, 
            and make confident decisions backed by triangulated data across retail, panel, and internal sales.
          </RevealText>
        </motion.p>
        
        <motion.div 
          className="flex justify-center items-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.div
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 15px 35px rgba(0,0,0,0.15)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="bg-black text-white hover:bg-gray-800 px-10 py-5 text-lg font-medium rounded-full"
              onClick={() => window.open('https://calendly.com/shahrukhmd/phyllo', '_self')}
            >
              Talk to us
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced Product Preview with Real Dashboard */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
        >
          <motion.div 
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center space-x-2">
              <motion.div 
                className="w-3 h-3 bg-red-500 rounded-full"
                whileHover={{ scale: 1.3 }}
              ></motion.div>
              <motion.div 
                className="w-3 h-3 bg-yellow-500 rounded-full"
                whileHover={{ scale: 1.3 }}
              ></motion.div>
              <motion.div 
                className="w-3 h-3 bg-green-500 rounded-full"
                whileHover={{ scale: 1.3 }}
              ></motion.div>
              <div className="ml-4 text-sm text-gray-500">clayface.com/dashboard</div>
            </div>
            <div className="relative">
              <img 
                src="/lovable-uploads/5cd2d046-4001-44da-aa5e-03b344aaa2c5.png" 
                alt="Clayface Dashboard Preview" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
            </div>
          </motion.div>
          
          {/* Enhanced Floating elements */}
          <motion.div 
            className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.1 }}
          >
            +2.3% Market Share
          </motion.div>
          <motion.div 
            className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium"
            animate={{ 
              y: [0, 10, 0],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            whileHover={{ scale: 1.1 }}
          >
            Real-time alerts
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
