
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Brain, Zap, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Custom counter animation component
const AnimatedCounter: React.FC<{ 
  from: number; 
  to: number; 
  duration?: number; 
  suffix?: string;
  prefix?: string;
  inView: boolean;
}> = ({ from, to, duration = 2, suffix = '', prefix = '', inView }) => {
  const [count, setCount] = useState(from);
  
  useEffect(() => {
    if (!inView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(from + (to - from) * easeOutQuart);
      
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [inView, from, to, duration]);
  
  return <span>{prefix}{count}{suffix}</span>;
};

const StatsSection = () => {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.2 });

  return (
    <section className="pt-32 pb-24 px-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden" ref={statsRef}>
      <motion.div 
        className="absolute inset-0 opacity-40"
        animate={{ 
          background: [
            "linear-gradient(45deg, #dbeafe, #e0e7ff, #f3e8ff)",
            "linear-gradient(45deg, #e0e7ff, #f3e8ff, #dbeafe)",
            "linear-gradient(45deg, #f3e8ff, #dbeafe, #e0e7ff)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 60 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-8"
            initial={{ scale: 0, opacity: 0 }}
            animate={statsInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "backOut" }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 5px 15px rgba(34, 197, 94, 0.3)"
            }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Target className="w-4 h-4" />
            </motion.div>
            Proven Results
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-black mb-8 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6, ease: "backOut" }}
            >
              The Impact Is
            </motion.span>
            <br />
            <motion.span 
              className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Immediate
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            See how Clayface transforms CPG brand management from the first week
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Stat 1 */}
          <motion.div
            initial={{ opacity: 0, y: 80, rotateX: -15 }}
            animate={statsInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ 
              y: -10,
              rotateX: 5,
              transition: { duration: 0.3 }
            }}
          >
            <Card className="relative overflow-hidden border border-slate-200 shadow-xl bg-white group hover:shadow-2xl transition-all duration-300 h-full">
              <motion.div 
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"
                initial={{ scaleX: 0 }}
                animate={statsInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.4 }}
              ></motion.div>
              <CardContent className="p-8 text-center">
                <motion.div 
                  className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform"
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.2
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Brain className="w-8 h-8 text-green-600" />
                </motion.div>
                <motion.div 
                  className="text-4xl font-bold text-black mb-2 group-hover:text-green-600 transition-colors"
                  initial={{ scale: 0 }}
                  animate={statsInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6, ease: "backOut" }}
                >
                  <AnimatedCounter from={0} to={2} duration={2} suffix="-3 weeks" inView={statsInView} />
                </motion.div>
                <div className="text-gray-600 font-medium mb-4">Saved per QBR</div>
                <div className="text-sm text-gray-500 leading-relaxed">
                  Automated report generation eliminates manual deck creation
                </div>
                <motion.div 
                  className="mt-4 text-xs text-green-600 font-medium"
                  initial={{ opacity: 0 }}
                  animate={statsInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.5 }}
                >
                  = $<AnimatedCounter from={0} to={45} duration={2} suffix="K+ annual savings per brand manager" inView={statsInView} />
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            initial={{ opacity: 0, y: 80, rotateX: -15 }}
            animate={statsInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ 
              y: -10,
              rotateX: 5,
              transition: { duration: 0.3 }
            }}
          >
            <Card className="relative overflow-hidden border border-slate-200 shadow-xl bg-white group hover:shadow-2xl transition-all duration-300 h-full">
              <motion.div 
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"
                initial={{ scaleX: 0 }}
                animate={statsInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.6 }}
              ></motion.div>
              <CardContent className="p-8 text-center">
                <motion.div 
                  className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform"
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.2
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Zap className="w-8 h-8 text-blue-600" />
                </motion.div>
                <motion.div 
                  className="text-4xl font-bold text-black mb-2 group-hover:text-blue-600 transition-colors"
                  initial={{ scale: 0 }}
                  animate={statsInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.0, ease: "backOut" }}
                >
                  Minutes
                </motion.div>
                <div className="text-gray-600 font-medium mb-4">Not months for insights</div>
                <div className="text-sm text-gray-500 leading-relaxed">
                  Real-time alerts and instant diagnostics
                </div>
                <motion.div 
                  className="mt-4 text-xs text-blue-600 font-medium"
                  initial={{ opacity: 0 }}
                  animate={statsInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.7 }}
                >
                  <AnimatedCounter from={0} to={500} duration={2} suffix="x faster than traditional methods" inView={statsInView} />
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            initial={{ opacity: 0, y: 80, rotateX: -15 }}
            animate={statsInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ 
              y: -10,
              rotateX: 5,
              transition: { duration: 0.3 }
            }}
          >
            <Card className="relative overflow-hidden border border-slate-200 shadow-xl bg-white group hover:shadow-2xl transition-all duration-300 h-full">
              <motion.div 
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ scaleX: 0 }}
                animate={statsInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.8 }}
              ></motion.div>
              <CardContent className="p-8 text-center">
                <motion.div 
                  className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform"
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.2
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Target className="w-8 h-8 text-purple-600" />
                </motion.div>
                <motion.div 
                  className="text-4xl font-bold text-black mb-2 group-hover:text-purple-600 transition-colors"
                  initial={{ scale: 0 }}
                  animate={statsInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.2, ease: "backOut" }}
                >
                  Single
                </motion.div>
                <div className="text-gray-600 font-medium mb-4">Source of truth</div>
                <div className="text-sm text-gray-500 leading-relaxed">
                  Unified data across all channels and touchpoints
                </div>
                <motion.div 
                  className="mt-4 text-xs text-purple-600 font-medium"
                  initial={{ opacity: 0 }}
                  animate={statsInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.9 }}
                >
                  Eliminates data silos completely
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stat 4 */}
          <motion.div
            initial={{ opacity: 0, y: 80, rotateX: -15 }}
            animate={statsInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ 
              y: -10,
              rotateX: 5,
              transition: { duration: 0.3 }
            }}
          >
            <Card className="relative overflow-hidden border border-slate-200 shadow-xl bg-white group hover:shadow-2xl transition-all duration-300 h-full">
              <motion.div 
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"
                initial={{ scaleX: 0 }}
                animate={statsInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 1.0 }}
              ></motion.div>
              <CardContent className="p-8 text-center">
                <motion.div 
                  className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform"
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.2
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <AlertTriangle className="w-8 h-8 text-orange-600" />
                </motion.div>
                <motion.div 
                  className="text-4xl font-bold text-black mb-2 group-hover:text-orange-600 transition-colors"
                  initial={{ scale: 0 }}
                  animate={statsInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.2, ease: "backOut" }}
                >
                  Real-time
                </motion.div>
                <div className="text-gray-600 font-medium mb-4">Competitor alerts</div>
                <div className="text-sm text-gray-500 leading-relaxed">
                  Instant notifications for threats and opportunities
                </div>
                <motion.div 
                  className="mt-4 text-xs text-orange-600 font-medium"
                  initial={{ opacity: 0 }}
                  animate={statsInView ? { opacity: 1 } : {}}
                  transition={{ delay: 2.1 }}
                >
                  React before competitors do
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
