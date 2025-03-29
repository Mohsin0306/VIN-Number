import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function Statistics() {
  // Move data declarations to the top
  const stats = [
    {
      number: 2,
      suffix: '+',
      title: 'Years in',
      subtitle: 'Service',
      numberColor: 'text-blue-500',
      textColor: 'text-gray-800'
    },
    {
      number: 200,
      suffix: 'K+',
      title: 'Records',
      subtitle: 'Generated',
      numberColor: 'text-gray-800',
      textColor: 'text-blue-500'
    },
    {
      number: 50,
      suffix: 'k+',
      title: 'Cars',
      subtitle: 'sold',
      numberColor: 'text-gray-800',
      textColor: 'text-blue-500'
    },
    {
      number: 101,
      suffix: '+',
      title: 'Databases',
      subtitle: 'Connected',
      numberColor: 'text-gray-800',
      textColor: 'text-blue-500'
    }
  ];

  const testimonials = [
    {
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      name: "Alana Dyan",
      text: "Their committed sales staff strive to find the right model for every customer to suit their lifestyle and budget. 5-star!"
    },
    {
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      name: "Willard Donovan",
      text: "Great value! Carvin.info® detailed report helped me avoid a bad deal. Highly recommend their service."
    },
    {
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      name: "Kate Stewart",
      text: "Carvin.info® helped me make a confident car purchase with their accurate and detailed VIN report. Highly recommended!"
    },
    {
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      name: "John Smith",
      text: "The detailed history report saved me from buying a car with hidden problems. Thank you Carvin.info!"
    },
    {
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      name: "Emma Wilson",
      text: "Excellent service! The VIN check revealed everything I needed to know about my car's history."
    },
    {
      image: "https://randomuser.me/api/portraits/men/33.jpg",
      name: "Michael Brown",
      text: "Very thorough report. Helped me negotiate a better price knowing the car's complete history."
    }
  ];

  // Then declare state and refs
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);
  const containerRef = useRef(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  // Simple Counter Component
  const Counter = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!isVisible) return;

      let startTime;
      let animationFrame;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        setCount(Math.floor(progress * end));
        
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
    }, [isVisible, end, duration]);

    return <span>{count}{suffix}</span>;
  };

  // Improved scroll handling with full scroll range
  useEffect(() => {
    const handleScroll = () => {
      if (!statsRef.current || !containerRef.current) return;

      const statsRect = statsRef.current.getBoundingClientRect();
      const containerWidth = containerRef.current.scrollWidth - containerRef.current.clientWidth;
      
      // Adjust these values to control scroll trigger points
      const scrollStartOffset = window.innerHeight * 0.8; // Start scrolling earlier
      const scrollRange = window.innerHeight * 1.2; // Increase scroll range
      
      // Calculate progress
      const progress = (scrollStartOffset - statsRect.top) / scrollRange;
      const clampedProgress = Math.max(0, Math.min(1, progress));
      
      // Calculate scroll position
      const targetScroll = containerWidth * clampedProgress;
      
      // Apply scroll with smooth behavior
      containerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    setTimeout(handleScroll, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => {
        const next = (prev + 1) % testimonials.length;
        setDirection(1);
        
        // Add scroll behavior for mobile
        if (containerRef.current && window.innerWidth < 768) { // Only for mobile
          containerRef.current.scrollTo({
            left: next * (250 + 16), // width of card + gap
            behavior: 'smooth'
          });
        }
        
        return next;
      });
    }, 3000);
    
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="bg-white py-8 md:py-24" ref={statsRef}>
      <div className="container mx-auto px-4">
        {/* Stats Mobile and Desktop sections */}
        <div 
          ref={containerRef}
          className="flex md:hidden overflow-x-auto scrollbar-hide gap-4 pb-4
            snap-x snap-mandatory mb-16"
          style={{ 
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex-shrink-0 flex flex-col items-center justify-center
                snap-center min-w-[140px] w-[140px] p-3 rounded-lg
                transform transition-all duration-300"
            >
              <div className={`text-4xl font-bold ${stat.numberColor}
                transition-all duration-500 ease-out whitespace-nowrap`}>
                <Counter 
                  end={stat.number} 
                  suffix={stat.suffix}
                  duration={1500}
                />
              </div>
              <div className={`text-base ${stat.textColor} 
                font-semibold mt-2 leading-tight`}>
                {stat.title}<br />{stat.subtitle}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center justify-center text-center
                transform hover:scale-105 transition-transform duration-300
                p-4 rounded-lg hover:shadow-lg"
            >
              <div className={`text-6xl md:text-7xl lg:text-8xl font-bold ${stat.numberColor}
                transition-all duration-500 ease-out`}>
                <Counter 
                  end={stat.number} 
                  suffix={stat.suffix}
                  duration={1500}
                />
              </div>
              <div className={`text-xl md:text-2xl lg:text-3xl ${stat.textColor} 
                font-semibold mt-2 leading-tight`}>
                {stat.title}<br />{stat.subtitle}
              </div>
            </motion.div>
          ))}
        </div>

       

        {/* Why Carvin.info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mx-auto mb-12 md:mb-24"
        >
          <div className="bg-black rounded-[30px] p-6 md:p-12 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Left side with image */}
              <div className="w-full md:w-1/2">
                <img
                  src="https://carvin.info/wp-content/uploads/2024/08/sample-report.avif"
                  alt="Sample Vehicle Report"
                  className="w-full rounded-[20px] shadow-xl"
                />
              </div>
              
              {/* Right side with text and button */}
              <div className="w-full md:w-1/2 text-left">
                <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">
                  Why <span className="text-[#00A3FF]">Carvin.info®</span> VIN Check?
                </h2>
                <p className="text-sm md:text-lg text-gray-300 leading-relaxed mb-6">
                  Carvin.info® reports provide you with thorough car information you can't get from a visual
                  inspection or test drive. Our VIN reports include DMV title history, ownership history,
                  insurance total loss records, safety recall events, odometer rollback alerts, and much more.
                </p>
                
                <button className="bg-[#00A3FF] hover:bg-[#0084FF] text-white px-8 py-4 rounded-xl
                  inline-flex items-center gap-2 transition-all duration-300 text-lg font-semibold w-full md:w-auto justify-center">
                  🔍 Search a VIN Number
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Vehicle Loan Calculator Section - Without Preview Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-black rounded-[30px] overflow-hidden mb-12 md:mb-24"
        >
          <div className="p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Vehicle <span className="text-[#00A3FF]">Loan</span> Calculator
                </h2>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed max-w-2xl mx-auto md:mx-0">
                  Use Carvin.info® free car loan calculator to check your car payment before visiting the dealership. 
                  Find out if you can afford your dream car or how much of a monthly payment you can afford.
                </p>
                <button className="bg-[#00A3FF] hover:bg-[#0084FF] text-white px-8 py-4 rounded-xl
                  inline-flex items-center gap-2 transition-all duration-300 text-lg font-semibold w-full md:w-auto justify-center">
                  🧮 Loan Calculator
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Our Commitment Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-16 md:mb-24 text-center mx-auto max-w-5xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Commitment to You
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-16">
            Vehicle History's team of automotive experts brings you the most accurate and up-to-date used car information.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Information You Can Trust */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Information You Can Trust</h3>
              <p className="text-gray-600 text-center">
                Our writers and editors exclusively use reputable, data-driven sources such as articles from established vehicle publications, government reports, and other trusted vehicle associations.
              </p>
            </div>

            {/* Real Owner Reviews */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Real Owner Reviews</h3>
              <p className="text-gray-600 text-center">
                Hundreds of thousands of reviews from verified vehicle owners help you better understand how vehicles perform in the real world.
              </p>
            </div>

            {/* Comprehensive and Informative */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Comprehensive and Informative</h3>
              <p className="text-gray-600 text-center">
                Our team researches and road tests hundreds of vehicles each year, then works to distill down only the most important information, specifically for used vehicle buyers.
              </p>
            </div>
          </div>
        </motion.div>

         {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mb-16 md:mb-24 overflow-hidden"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-[#F5F7FF] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-[#00A3FF] text-4xl">❝</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Testimonials
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-[#00A3FF] text-xl md:text-2xl font-semibold mb-2">
                Carvin.info® through the eyes of our customers:
              </p>
              <p className="text-gray-600 text-lg">
                indiverse perspectives and genuine testimonials demonstrating the value of our services.
              </p>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="max-w-6xl mx-auto px-4">
            {/* Mobile Slider */}
            <div className="md:hidden">
              <div 
                className="overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-4 pb-4"
                ref={containerRef}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-[250px] snap-center p-4 bg-white rounded-xl shadow-lg transition-opacity duration-300
                      ${currentTestimonial === index ? 'opacity-100' : 'opacity-50'}`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-white shadow-md"
                      />
                      <div className="flex gap-0.5 mb-2">
                        {"★★★★★".split("").map((star, i) => (
                          <span key={i} className="text-[#FFD700] text-sm">{star}</span>
                        ))}
                      </div>
                      <p className="text-gray-700 mb-2 text-sm leading-tight">{testimonial.text}</p>
                      <h3 className="font-bold text-base mb-0.5">{testimonial.name}</h3>
                      <p className="text-[#00A3FF] text-sm">Happy Customer</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Dots */}
              <div className="flex justify-center gap-1.5 mt-2">
                {testimonials.map((_, index) => (
                  <motion.div
                    key={index}
                    className="h-1.5 rounded-full cursor-pointer"
                    initial={false}
                    animate={{
                      width: index === currentTestimonial ? 12 : 6,
                      backgroundColor: index === currentTestimonial ? '#00A3FF' : '#D1D5DB'
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={() => {
                      setCurrentTestimonial(index);
                      // Add scroll behavior when clicking dots
                      containerRef.current?.scrollTo({
                        left: index * (250 + 16), // width of card + gap
                        behavior: 'smooth'
                      });
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Slider */}
            <div className="hidden md:block relative max-w-[1200px] mx-auto">
              <div className="flex justify-center items-center overflow-hidden">
                <motion.div 
                  className="flex gap-8"
                  animate={{ x: `${-33.333 * currentTestimonial}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div 
                      key={index}
                      className="min-w-[33.333%] px-4"
                    >
                      <motion.div
                        animate={{
                          scale: currentTestimonial === index ? 1.1 : 0.8,
                          opacity: currentTestimonial === index ? 1 : 0.5
                        }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-xl shadow-lg p-6"
                      >
                        <div className="flex flex-col items-center text-center">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow-md"
                          />
                          <div className="flex gap-1 mb-4">
                            {"★★★★★".split("").map((star, i) => (
                              <span key={i} className="text-[#FFD700] text-xl">{star}</span>
                            ))}
                          </div>
                          <p className="text-gray-700 mb-4 leading-relaxed">{testimonial.text}</p>
                          <h3 className="font-bold text-xl mb-1">{testimonial.name}</h3>
                          <p className="text-[#00A3FF]">Happy Customer</p>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Navigation Arrows */}
              <button
                className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-lg
                  hover:bg-gray-50 transition-colors duration-200 z-20"
                onClick={() => {
                  setDirection(-1);
                  setCurrentTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1);
                }}
              >
                <span className="text-2xl">←</span>
              </button>
              <button
                className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-lg
                  hover:bg-gray-50 transition-colors duration-200 z-20"
                onClick={() => {
                  setDirection(1);
                  setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
                }}
              >
                <span className="text-2xl">→</span>
              </button>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <motion.div
                    key={index}
                    className="h-2 rounded-full cursor-pointer"
                    initial={false}
                    animate={{
                      width: index === currentTestimonial ? 16 : 8,
                      backgroundColor: index === currentTestimonial ? '#00A3FF' : '#D1D5DB'
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default Statistics; 