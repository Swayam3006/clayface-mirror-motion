
import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronRight, 
  Play, 
  CheckCircle, 
  ArrowRight, 
  Zap, 
  Target, 
  TrendingUp, 
  Users, 
  BarChart3, 
  Clock,
  AlertTriangle,
  Globe,
  Brain,
  Lightbulb,
  Shield,
  Rocket,
  Star,
  Award,
  MessageSquare,
  Calendar,
  DollarSign,
  PieChart,
  Activity,
  Database,
  Filter,
  Search,
  RefreshCw,
  Eye,
  Layers,
  ArrowUpRight,
  Sparkles,
  ChevronUp,
  X,
  FileText,
  Calculator,
  Mail,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import StatsSection from '@/components/StatsSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [activeModule, setActiveModule] = useState(0);
  
  // Animation refs and scroll tracking
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const problemRef = useRef(null);
  const problemInView = useInView(problemRef, { once: true, amount: 0.2 });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.2 });
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });
  
  // Transform scroll progress to width for progress bar
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  
  // Advanced parallax transforms
  const heroParallaxY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const problemParallaxY = useTransform(scrollYProgress, [0.2, 0.6], [0, -150]);
  const statsParallaxY = useTransform(scrollYProgress, [0.6, 1], [0, -200]);
  
  // Morphing text effects
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  
  // Mouse position for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Mouse tracking for advanced effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Auto carousel functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModule((prev) => (prev + 1) % modules.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

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

  // Morphing Card Component
  const MorphingCard: React.FC<{
    children: React.ReactNode;
    delay?: number;
    inView: boolean;
    className?: string;
  }> = ({ children, delay = 0, inView, className = "" }) => {
    return (
      <motion.div
        initial={{ 
          opacity: 0, 
          scale: 0.8,
          rotateX: -15,
          y: 60
        }}
        animate={inView ? { 
          opacity: 1, 
          scale: 1,
          rotateX: 0,
          y: 0
        } : {}}
        transition={{ 
          duration: 0.8, 
          delay,
          ease: [0.22, 1, 0.36, 1]
        }}
        whileHover={{ 
          scale: 1.05,
          rotateX: 5,
          y: -10,
          transition: { duration: 0.3 }
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  const modules = [
    {
      id: 1,
      icon: AlertTriangle,
      title: "Smart Alerts",
      subtitle: "SWOT Signals in real-time. Tuned to impact, not noise.",
      description: "Get alerts for opportunities and threats across SKUs, geographies, and competitor movements. 2 pings that change your QBR story, not 20 pings of noise.",
      features: [
        "Tunable thresholds based on SKU value & seasonality",
        "1-click diagnostics with promo overlays & Nielsen data", 
        "Opportunity & threat alerts with impact scoring"
      ],
      color: "blue",
      mockupImage: "/lovable-uploads/1242170f-dc8b-4eb4-87db-757e6ca5954f.png"
    },
    {
      id: 2,
      icon: FileText,
      title: "Narrative Report Auto-Gen",
      subtitle: "From dashboards to decks, without PowerPoint pain.",
      description: "Automatically generate QBR narratives with sales trends, campaign performance, and competitive movement. Save 2-3 weeks per quarter.",
      features: [
        "Slide-ready insights, annotated & exportable",
        "Campaign ROI analysis with GRPs & SOV",
        "Brand health metrics integration"
      ],
      color: "green",
      mockupImage: "/lovable-uploads/76c33c9a-0cf5-430d-bb80-174ca1466cc0.png"
    },
    {
      id: 3,
      icon: Calculator,
      title: "What-If Simulators",
      subtitle: "See impact before you spend.",
      description: "Simulate marketing and distribution changes with ML-powered predictions. Reduce guesswork in marketing investment.",
      features: [
        "What if we add 15% GRPs in West? scenarios",
        "Modern Trade coverage impact modeling",
        "Promo lift predictions with attribution logic"
      ],
      color: "purple",
      mockupImage: "/lovable-uploads/5cd2d046-4001-44da-aa5e-03b344aaa2c5.png"
    },
    {
      id: 4,
      icon: Mail,
      title: "Push Intelligence",
      subtitle: "Weekly wins, losses, and actionables – on your phone.",
      description: "Mobile-friendly, curated reports delivered via email/WhatsApp. No more pulling up 3 dashboards for Monday's sales call.",
      features: [
        "Key movers (SKUs, geos, competitors)",
        "Spend ROI & share gains/losses",
        "Campaign diagnostics on mobile"
      ],
      color: "indigo",
      mockupImage: "/lovable-uploads/5cd2d046-4001-44da-aa5e-03b344aaa2c5.png"
    },
    {
      id: 5,
      icon: TrendingUp,
      title: "Market Share Diagnostics",
      subtitle: "See not just what dropped, but why.",
      description: "Triangulate Nielsen retail, secondary sales, and panel data to show volume vs. value drops, household switching, and competitor lift sources.",
      features: [
        "Category dynamics analysis",
        "Household switching patterns",
        "Competitor lift source identification"
      ],
      color: "red",
      mockupImage: "/lovable-uploads/76c33c9a-0cf5-430d-bb80-174ca1466cc0.png"
    },
    {
      id: 6,
      icon: BarChart3,
      title: "Brand Health Deep Dives",
      subtitle: "Peel back the onion on image, awareness, and consideration.",
      description: "Combine Brand Track, SOV/GRP data, and awareness metrics to explain whether brand issues are media-driven or perception-led.",
      features: [
        "Ad recall & affinity analysis",
        "Consumer segment erosion detection",
        "Media vs. perception impact analysis"
      ],
      color: "slate",
      mockupImage: "/lovable-uploads/1242170f-dc8b-4eb4-87db-757e6ca5954f.png"
    },
    {
      id: 7,
      icon: Users,
      title: "Consumer Segmentation",
      subtitle: "Segment smarter, grow faster.",
      description: "Use HH Panel data, U&A insights, and digital signals to surface which segments over/under-index on SKUs and suggest high potential segments for new launches.",
      features: [
        "Household panel data integration",
        "Usage & attitude insights",
        "Digital signal analysis",
        "New launch segment recommendations"
      ],
      color: "emerald",
      mockupImage: "/lovable-uploads/5cd2d046-4001-44da-aa5e-03b344aaa2c5.png"
    }
  ];

  // Helper component that renders a module card
  const ModuleCard: React.FC<{ module: typeof modules[number] }> = ({ module }) => {
    const Icon = module.icon;
    const colors = getColorClasses(module.color);

    return (
      <div className="grid md:grid-cols-2 gap-16 items-center p-8 max-w-7xl mx-auto">
        {/* Module Info */}
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={`w-20 h-20 ${colors.bg} rounded-3xl flex items-center justify-center shadow-lg`}>
            <Icon className={`w-10 h-10 ${colors.icon}`} />
          </div>

          <div>
            <div className="text-sm text-blue-400 mb-3 font-medium tracking-wide uppercase">Module {module.id}</div>
            <h3 className="text-4xl font-bold text-white mb-3 leading-tight">{module.title}</h3>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">{module.subtitle}</p>
            <p className="text-gray-400 leading-relaxed mb-8 text-lg">{module.description}</p>
          </div>

          <div className="space-y-4">
            {module.features.map((feature, idx) => (
              <motion.div 
                key={idx} 
                className="flex items-start gap-4" 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 text-lg leading-relaxed">{feature}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg font-medium rounded-full"
              onClick={() => window.location.href = 'https://calendly.com/shahrukhmd/phyllo'}
            >
              <Play className="w-5 h-5 mr-2" />
              View Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Module Screenshot with Smooth Crossfade Transition */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div className="ml-4 text-sm text-gray-500 font-medium">clayface.ai/dashboard</div>
            </div>
            
            <div className="relative overflow-hidden bg-gray-100">
              <AnimatePresence mode="wait">
                <motion.img
                  key={module.id}
                  src={module.mockupImage} 
                  alt={`${module.title} Interface`} 
                  className="w-full h-auto filter brightness-110 contrast-105"
                  style={{
                    filter: 'brightness(1.1) contrast(1.05) saturate(1.1)'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 0.6,
                    ease: "easeInOut"
                  }}
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/5 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>

          <motion.div 
            className="absolute -top-3 -right-3 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ✓ Live
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-3 -left-3 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            Real-time Data
          </motion.div>
        </motion.div>
      </div>
    );
  };

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; icon: string; text: string; border: string } } = {
      blue: { bg: "bg-blue-50", icon: "text-blue-600", text: "text-blue-600", border: "border-blue-200" },
      green: { bg: "bg-green-50", icon: "text-green-600", text: "text-green-600", border: "border-green-200" },
      purple: { bg: "bg-purple-50", icon: "text-purple-600", text: "text-purple-600", border: "border-purple-200" },
      indigo: { bg: "bg-indigo-50", icon: "text-indigo-600", text: "text-indigo-600", border: "border-indigo-200" },
      red: { bg: "bg-red-50", icon: "text-red-600", text: "text-red-600", border: "border-red-200" },
      slate: { bg: "bg-slate-50", icon: "text-slate-600", text: "text-slate-600", border: "border-slate-200" },
      emerald: { bg: "bg-emerald-50", icon: "text-emerald-600", text: "text-emerald-600", border: "border-emerald-200" },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      <Navigation progressWidth={progressWidth} />
      <HeroSection 
        heroParallaxY={heroParallaxY}
        heroScale={heroScale}
        heroOpacity={heroOpacity}
      />
      <ProblemSection />

      {/* Professional Global Crisis Section */}
      <section className="pt-32 pb-24 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500 rounded-full opacity-5 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-slate-600 rounded-full opacity-5 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-gray-600 rounded-full opacity-3 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-slate-800 text-slate-300 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-slate-700">
              <Globe className="w-5 h-5" />
              Industry-Wide Impact
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              The Global
              <br />
              <span className="text-slate-400">
                Strategic Crisis
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium mb-12">
              This challenge extends beyond individual companies—it's a systemic issue affecting the entire consumer goods industry worldwide.
            </p>
          </div>

          {/* Professional Animated Counter */}
          <div className="relative mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-2xl blur-xl opacity-50"></div>
            <div className="relative bg-slate-800 rounded-2xl p-12 border border-slate-700 shadow-2xl">
              <div className="text-center">
                <div className="text-8xl md:text-9xl font-black mb-6 text-white">
                  $60B+
                </div>
                <div className="text-2xl md:text-3xl font-bold text-slate-200 mb-4">
                  ANNUAL INDUSTRY LOSS
                </div>
                <div className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
                  Lost by CPG companies globally due to fragmented data, delayed insights, and reactive decision-making
                </div>
              </div>
              
              {/* Industry Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center p-6 bg-slate-700/50 rounded-xl border border-slate-600">
                  <div className="text-4xl font-bold text-blue-400 mb-2">85%</div>
                  <div className="text-slate-300">Of Fortune 500 CPG companies affected</div>
                </div>
                <div className="text-center p-6 bg-slate-700/50 rounded-xl border border-slate-600">
                  <div className="text-4xl font-bold text-slate-300 mb-2">47 days</div>
                  <div className="text-slate-300">Average insight delivery timeline</div>
                </div>
                <div className="text-center p-6 bg-slate-700/50 rounded-xl border border-slate-600">
                  <div className="text-4xl font-bold text-slate-400 mb-2">$164M</div>
                  <div className="text-slate-300">Average annual loss per major brand</div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Call to Action */}
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Transform Your Decision Intelligence
            </h3>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join industry leaders who've revolutionized their strategic decision-making with Clayface
            </p>
            <Button 
              size="lg" 
              className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 text-lg font-semibold"
              onClick={() => window.location.href = 'https://calendly.com/shahrukhmd/phyllo'}
            >
              Discover the Solution
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Product Modules – Automatic Carousel */}
      <section id="modules" className="py-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
        {/* Subtle gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-slate-900/10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div 
              className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-6 py-3 rounded-full text-sm font-medium mb-10 border border-blue-500/30"
              whileHover={{ scale: 1.05, borderColor: "rgba(59, 130, 246, 0.5)" }}
            >
              <Zap className="w-4 h-4" />
              7 Powerful Modules
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
              <span className="block">Transform From</span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Reactive To Proactive
              </span>
            </h2>
            
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light mb-12">
              Everything you need to make confident, data-driven decisions in real-time
            </p>
          </div>

          {/* Automatic Carousel Implementation */}
          <div className="relative">
            <div className="min-h-[80vh] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModule}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <ModuleCard module={modules[activeModule]} />
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Module indicators */}
            <div className="flex justify-center mt-12 space-x-2">
              {modules.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setActiveModule(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === activeModule ? 'bg-white scale-125' : 'bg-white/30'
                  }`}
                  whileHover={{ scale: 1.3 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Enhanced CTA Section with Advanced Animations */}
      <section className="pt-32 pb-20 px-6 bg-black text-white relative overflow-hidden" ref={ctaRef}>
        {/* Advanced parallax background */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{ y: useTransform(scrollYProgress, [0.8, 1], [0, -100]) }}
        >
          <motion.div 
            className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 360],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 0.8, 1],
              rotate: [360, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
        </motion.div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Ready to transform your brand management?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Join CPG leaders who've moved from reactive to proactive with Clayface's Decision Intelligence Platform.
          </motion.p>
          
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(255,255,255,0.2)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className="bg-white text-gray-900 hover:bg-gray-100 mt-8 px-10 py-5 text-lg font-medium rounded-full inline-flex items-center"
                onClick={() => window.location.href = 'https://calendly.com/shahrukhmd/phyllo'}
              >
                Talk to us
                <motion.div className="ml-2">
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
