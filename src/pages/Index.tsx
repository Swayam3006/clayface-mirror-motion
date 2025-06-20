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

const Index = () => {
  const [activeModule, setActiveModule] = useState(0);
  // Refs used for detecting when each module section scrolls into view
  const moduleRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  
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
          <span key={index} className="inline-block overflow-hidden">
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

  // Register an IntersectionObserver to update `activeModule` based on scroll position
  React.useEffect(() => {
    const refs = moduleRefs.current;
    if (!refs.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(idx)) {
              setActiveModule(idx);
            }
          }
        });
      },
      {
        root: null,
        threshold: 0.5, // Trigger when 50% of sentinel is visible
        rootMargin: '-20% 0px -20% 0px', // Create a smaller trigger zone
      }
    );

    refs.forEach((ref) => ref && observer.observe(ref));

    return () => observer.disconnect();
  }, []);

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

  // Helper component that renders the currently active module card
  const ModuleShowcase: React.FC<{ module: typeof modules[number] }> = ({ module }) => {
    const Icon = module.icon;
    const colors = getColorClasses(module.color);

    return (
      <div className="grid md:grid-cols-2 gap-16 items-center p-8 max-w-7xl mx-auto transition-all duration-700 ease-out">
        {/* Module Info */}
        <motion.div 
          className="space-y-8 transform transition-all duration-700 ease-out"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={`w-20 h-20 ${colors.bg} rounded-3xl flex items-center justify-center shadow-lg transition-all duration-300`}>
            <Icon className={`w-10 h-10 ${colors.icon} transition-all duration-300`} />
          </div>

          <div>
            <div className="text-sm text-blue-400 mb-3 font-medium tracking-wide uppercase transition-all duration-300">Module {module.id}</div>
            <h3 className="text-4xl font-bold text-white mb-3 leading-tight transition-all duration-300">{module.title}</h3>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed transition-all duration-300">{module.subtitle}</p>
            <p className="text-gray-400 leading-relaxed mb-8 text-lg transition-all duration-300">{module.description}</p>
          </div>

          <div className="space-y-4">
            {module.features.map((feature, idx) => (
              <motion.div 
                key={idx} 
                className="flex items-start gap-4 transition-all duration-300" 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0 transition-all duration-300"></div>
                <span className="text-gray-300 text-lg leading-relaxed transition-all duration-300">{feature}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg font-medium rounded-full transition-all duration-300">
              <Play className="w-5 h-5 mr-2" />
              View Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Module Screenshot - Clean, Professional Layout */}
        <motion.div 
          className="relative transform transition-all duration-700 ease-out"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500">
            {/* Clean browser header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div className="ml-4 text-sm text-gray-500 font-medium">clayface.ai/dashboard</div>
            </div>
            
            {/* Module image with improved contrast and clarity */}
            <div className="relative overflow-hidden">
              <img 
                src={module.mockupImage} 
                alt={`${module.title} Interface`} 
                className="w-full h-auto transition-all duration-500 filter brightness-110 contrast-105" 
                style={{
                  filter: 'brightness(1.1) contrast(1.05) saturate(1.1)'
                }}
                key={module.id}
              />
              
              {/* Subtle overlay for better aesthetics */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/5 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Clean status indicators */}
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
      {/* Navigation */}
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
        
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className="text-black font-bold text-xl"
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                clayface
              </motion.span>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Product', 'Modules', 'Pricing', 'Company'].map((item, index) => (
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" className="text-black hover:bg-gray-100 text-sm font-medium">
                  Sign in
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-black text-white hover:bg-gray-800 text-sm font-medium px-6">
                  Get started
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

      {/* Enhanced Hero Section with Advanced Parallax */}
      <section className="pt-48 pb-20 px-6 relative overflow-hidden" ref={heroRef}>
        {/* Advanced Parallax Background */}
        <motion.div 
          className="absolute inset-0 -z-10"
          style={{ y: heroParallaxY }}
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
            animate={heroInView ? { scale: 1, opacity: 1 } : {}}
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
            Decision Intelligence Platform for CPG Brand Managers
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
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
                y: 0,
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              } : {
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ 
                opacity: { duration: 0.6, delay: 0.8 },
                y: { duration: 0.6, delay: 0.8 },
                backgroundPosition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
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
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <RevealText inView={heroInView} delay={0.5}>
              Your Strategic Command Center. Access a single source of truth, generate actionable insights instantly, 
              and make confident decisions backed by triangulated data across retail, panel, and internal sales.
            </RevealText>
          </motion.p>
          
          <motion.div 
            className="flex justify-center items-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 35px rgba(0,0,0,0.15)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-10 py-5 text-lg font-medium rounded-full">
                Talk to us
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Product Preview with Real Dashboard */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
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

      {/* Enhanced Problem Section - UPDATED VERSION */}
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
              Brand Managers Are{" "}
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
                Despite having access to comprehensive dashboards and detailed reports, most brand managers struggle to extract actionable insights when critical decisions need to be made. This leads to delayed strategic initiatives, reliance on intuition over data, and missed growth opportunities.
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
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 text-lg font-semibold">
              Discover the Solution
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Product Modules – Sticky Scroll Showcase */}
      <section id="modules" className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
        {/* Subtle gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-slate-900/10 pointer-events-none" />

        {/* Container that creates the scroll area */}
        <div className="relative" style={{ height: `${modules.length * 100}vh` }}>
          {/* Sticky container that displays the active module */}
          <div className="sticky top-0 z-10 flex flex-col justify-center min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 py-20">
            <div className="text-center mb-16 px-6">
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
              
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
                Everything you need to make confident, data-driven decisions in real-time
              </p>
            </div>

            {/* Active module showcase */}
            <div className="flex-1 flex items-center justify-center">
              <ModuleShowcase module={modules[activeModule]} />
            </div>

            {/* Enhanced Module indicator dots */}
            <div className="flex justify-center mt-12 space-x-3">
              {modules.map((_, idx) => (
                <motion.span
                  key={idx}
                  className={`transition-all duration-500 rounded-full cursor-pointer ${
                    idx === activeModule 
                      ? 'bg-blue-500 w-10 h-4 shadow-lg shadow-blue-500/50' 
                      : 'bg-white/20 w-4 h-4 hover:bg-white/40'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>

          {/* Scroll trigger zones positioned absolutely */}
          {modules.map((_, idx) => (
            <div
              key={idx}
              ref={(el) => (moduleRefs.current[idx] = el)}
              data-index={idx}
              className="absolute opacity-0 pointer-events-none"
              style={{ 
                top: `${idx * 100}vh`,
                left: 0,
                width: '100%',
                height: '100vh'
              }}
            >
              {/* Hidden trigger zone */}
            </div>
          ))}
        </div>
      </section>

      {/* Completely Redesigned Stats Section */}
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

          {/* Enhanced ROI Calculator */}
          <motion.div 
            className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-3xl p-8 md:p-12 text-center"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={statsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(0,0,0,0.2)"
            }}
          >
            <motion.h3 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              Calculate Your ROI
            </motion.h3>
            <motion.p 
              className="text-xl opacity-90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              See how much Clayface can save your organization in the first year
            </motion.p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { value: 2.4, suffix: "M", label: "Average annual savings", prefix: "$" },
                { value: 85, suffix: "%", label: "Faster decision making", prefix: "" },
                { value: 12, suffix: "x", label: "ROI in first year", prefix: "" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.6 + (index * 0.2) }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="text-5xl font-bold mb-2">
                    <AnimatedCounter 
                      from={0} 
                      to={stat.value} 
                      duration={2.5} 
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                      inView={statsInView} 
                    />
                  </div>
                  <div className="text-lg opacity-80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 2.2 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 35px rgba(255,255,255,0.2)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 mt-8 px-10 py-5 text-lg font-semibold rounded-full">
                <Calculator className="w-5 h-5 mr-2" />
                Talk to us
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
            <RevealText inView={ctaInView} delay={0.2}>
              Ready to transform your brand management?
            </RevealText>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <RevealText inView={ctaInView} delay={0.6}>
              Join CPG leaders who've moved from reactive to proactive with Clayface's Decision Intelligence Platform.
            </RevealText>
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
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-10 py-5 text-lg font-medium rounded-full">
                Talk to us
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="mb-6">
                <span className="text-black font-bold text-xl">clayface</span>
              </div>
              <p className="text-gray-600 mb-6 max-w-sm">
                Decision Intelligence Platform for CPG Brand Managers. From insight to impact in minutes, not months.
              </p>
            </div>
            
            <div>
              <h4 className="text-black font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">Smart Alerts</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Report Auto-Gen</a></li>
                <li><a href="#" className="hover:text-black transition-colors">What-If Simulators</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Market Diagnostics</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-black font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">About</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-black font-semibold mb-4">Resources</h4>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-black transition-colors">CPG Insights</a></li>
                <li><a href="#" className="hover:text-black transition-colors">API</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600">&copy; 2024 clayface. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-black transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
