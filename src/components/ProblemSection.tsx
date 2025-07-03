import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AlertTriangle, Database, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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
            animate={inView ? { y: 0, opacity: 1 } : {}}
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

const ProblemSection = () => {
  const problemRef = useRef(null);
  const problemInView = useInView(problemRef, { once: true, amount: 0.2 });

  return (
    <section className="pt-32 pb-24 px-6 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden" ref={problemRef}>
      {/* Advanced Parallax Background */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgb(148, 163, 184, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgb(100, 116, 139, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgb(71, 85, 105, 0.1) 0%, transparent 50%)
          `
        }}
      />
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-20 h-20 border border-slate-200 rounded-full opacity-20"
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      <motion.div 
        className="absolute top-32 right-20 w-16 h-16 bg-slate-100 rounded-lg opacity-20"
        animate={{ 
          y: [-10, 10, -10],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-slate-300 rounded-full opacity-20"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={problemInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Professional Badge */}
          <motion.div 
            className="inline-flex items-center gap-3 bg-slate-100 text-slate-700 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-slate-200 shadow-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={problemInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div 
              className="flex items-center justify-center w-5 h-5 bg-slate-300 rounded-full"
              animate={problemInView ? { rotate: 360 } : {}}
              transition={{ duration: 1.5, delay: 0.8, ease: "backOut" }}
            >
              <AlertTriangle className="w-3 h-3 text-slate-600" />
            </motion.div>
            The Hidden Cost of Complexity
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-normal text-slate-900 mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={problemInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            CPG Brands Are{" "}
            <motion.span
              className="relative inline-block"
              initial={{ fontWeight: 400 }}
              animate={problemInView ? { 
                fontWeight: 700,
                color: "#0f172a"
              } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 1.2,
                ease: "easeOut"
              }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-200 -z-10 rounded-lg"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={problemInView ? { 
                  scaleX: 1, 
                  opacity: 0.3 
                } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.4,
                  ease: "easeOut"
                }}
                style={{ transformOrigin: "left" }}
              />
              Drowning in Data
            </motion.span>
            —But{" "}
            <motion.span
              className="relative inline-block"
              initial={{ fontWeight: 400 }}
              animate={problemInView ? { 
                fontWeight: 700,
                color: "#0f172a"
              } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 1.6,
                ease: "easeOut"
              }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-red-100 to-red-200 -z-10 rounded-lg"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={problemInView ? { 
                  scaleX: 1, 
                  opacity: 0.3 
                } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.8,
                  ease: "easeOut"
                }}
                style={{ transformOrigin: "left" }}
              />
              Starving for Direction
            </motion.span>
          </motion.h2>

          <motion.p 
            className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={problemInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <RevealText inView={problemInView} delay={1.2}>
              Despite having access to comprehensive dashboards and detailed reports, most CPG brands struggle to extract actionable insights when critical decisions need to be made. This leads to delayed strategic initiatives, reliance on intuition over data, and missed growth opportunities.
            </RevealText>
          </motion.p>
        </motion.div>

        {/* Problem Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Database,
              title: "Data Fragmentation",
              description: "Multiple disconnected systems create information silos, preventing unified strategic decision-making across brand portfolios.",
              delay: 0.2
            },
            {
              icon: Clock,
              title: "Insight Lag",
              description: "Critical market insights arrive weeks too late, forcing reactive strategies instead of proactive competitive advantage.",
              delay: 0.4
            },
            {
              icon: Target,
              title: "Decision Uncertainty",
              description: "Lack of integrated analytics creates uncertainty in strategic decisions, limiting confidence in budget allocation and market positioning.",
              delay: 0.6
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="group bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={problemInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: item.delay }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-slate-100 rounded-2xl mb-6 group-hover:bg-slate-200 transition-colors">
                <item.icon className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={problemInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-lg text-slate-600 mb-8">
            There has to be a better way to navigate the complexity.
          </p>
          <Button 
            size="lg" 
            className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Discover the Solution
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
