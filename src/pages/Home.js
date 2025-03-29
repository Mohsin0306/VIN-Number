import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Statistics from '../components/Statistics';

function TypeWriter({ texts }) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    let timeout;
    
    const type = () => {
      const fullText = texts[currentIndex];
      
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
        timeout = setTimeout(type, 30); // Faster deletion
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText.length === fullText.length) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, 2000); // Longer pause at end
          return;
        }
        timeout = setTimeout(type, 40); // Faster typing
      }
    };
    
    timeout = setTimeout(type, 50);
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, texts]);
  
  return (
    <div className="h-8 md:h-10 flex justify-center items-center text-blue-400 text-lg md:text-xl font-medium">
      <span className="typing-text">{currentText}</span>
    </div>
  );
}

function Home() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchFocus, setSearchFocus] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'new', label: 'New' },
    { id: 'used', label: 'Used' }
  ];

  const handleSearch = () => {
    console.log(`Searching in ${activeTab} category:`, searchValue);
  };

  const typingTexts = [
    'Get Instant Vehicle Reports',
    'Check Car History Easily',
    'Verify Vehicle Details Now',
    'Access Complete Car Data'
  ];

  // Update the flags array with direct URLs
  const flags = [
    {
      id: 'au',
      src: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg',
      alt: 'Australia Flag'
    },
    {
      id: 'ca',
      src: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg',
      alt: 'Canada Flag'
    },
    {
      id: 'uk',
      src: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg',
      alt: 'UK Flag'
    },
    {
      id: 'us',
      src: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg',
      alt: 'USA Flag'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#1f2937] to-[#2d3b54] 
        min-h-screen
        flex flex-col">
        <div className="container mx-auto px-4 flex-1 flex flex-col">
          {/* Content Wrapper */}
          <div className="flex flex-col flex-1 max-w-4xl mx-auto w-full 
            pt-[72px] md:pt-24 md:justify-center"> {/* Adjusted desktop padding */}
            
            {/* Content Grid */}
            <div className="grid gap-8 md:gap-10">
              {/* Title Section */}
              <div className="text-center">
                <motion.h1 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4
                    leading-tight md:leading-snug" // Added proper line height
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="text-white">Accurate, Detailed</span>
                  <motion.span 
                    className="text-[#0ea5e9] ml-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    , Trusted Reports
                  </motion.span>
                </motion.h1>

                {/* Typing Text */}
                <div className="h-12 md:h-10"> {/* Adjusted height for desktop */}
                  <TypeWriter 
                    texts={typingTexts} 
                    className="text-xl md:text-2xl text-blue-400 font-medium"
                  />
                </div>
              </div>

              {/* Search Section */}
              <motion.div 
                className="w-full max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className={`bg-white/10 backdrop-blur-md rounded-xl p-3 md:p-4
                  transform transition-all duration-300 ${searchFocus ? 'scale-102 shadow-xl' : ''}`}>
                  {/* Tabs */}
                  <div className="flex justify-center mb-3">
                    {['All', 'New', 'Used'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                        className="relative px-4 md:px-6 py-2 rounded-full text-base"
                      >
                        <motion.div
                          className={`absolute inset-0 rounded-full transition-colors duration-300
                            ${activeTab === tab.toLowerCase() ? 'bg-blue-500' : 'hover:bg-white/10'}`}
                          layoutId="activeTabBackground"
                        />
                        <span className={`relative z-10 font-medium
                          ${activeTab === tab.toLowerCase() ? 'text-white' : 'text-white/70'}`}>
                          {tab}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Search Input with Fixed Button Position */}
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Search for VIN here"
                      className="w-full px-4 md:px-6 py-3 rounded-lg
                        bg-white/5 text-white placeholder-white/60
                        text-base outline-none
                        border-2 border-transparent focus:border-blue-500/30
                        transition-all duration-300"
                      onFocus={() => setSearchFocus(true)}
                      onBlur={() => setSearchFocus(false)}
                    />
                    <div className="absolute right-2 flex items-center">
                      <motion.button 
                        className="bg-blue-500 hover:bg-blue-600 text-white 
                          px-4 py-2 rounded-lg
                          flex items-center gap-2 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="hidden md:inline">Search</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Flags and Powered By */}
              <div className="space-y-6">
                <motion.div 
                  className="flex justify-center gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  {flags.map((flag, index) => (
                    <motion.div
                      key={flag.id}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden
                        shadow-lg hover:shadow-xl transition-shadow duration-300
                        border-2 border-white/10"
                      whileHover={{ scale: 1.1 }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 1 }}
                    >
                      <img
                        src={flag.src}
                        alt={flag.alt}
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div 
                  className="text-white/80 text-lg text-center font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  Powered by CARVIN INFO LTD
                </motion.div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator - Mobile Only */}
          <motion.div 
            className="md:hidden text-white/70 flex flex-col items-center py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="text-sm uppercase tracking-wider mb-1">Scroll</span>
            <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Partners and Stats */}
      <div className="flex-shrink-0">
        <PartnerLogos />
        <Statistics />
      </div>
    </div>
  );
}

function PartnerLogos() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const autoScrollRef = useRef(null);

  // Auto scroll function
  const autoScroll = () => {
    if (scrollRef.current) {
      const isLastItem = activeIndex === logos.length - 1;
      const nextIndex = isLastItem ? 0 : activeIndex + 1;
      scrollToItem(nextIndex);
      setActiveIndex(nextIndex);
    }
  };

  // Setup auto scroll timer
  useEffect(() => {
    if (window.innerWidth <= 768) { // Only auto-scroll on mobile
      autoScrollRef.current = setInterval(autoScroll, 2000);
      return () => clearInterval(autoScrollRef.current);
    }
  }, [activeIndex]);

  // Handle manual scroll
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const itemWidth = 180;
      const newIndex = Math.round(scrollPosition / itemWidth);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
        // Reset timer when manually scrolled
        if (autoScrollRef.current) {
          clearInterval(autoScrollRef.current);
          autoScrollRef.current = setInterval(autoScroll, 2000);
        }
      }
    }
  };

  // Scroll to specific item
  const scrollToItem = (index) => {
    if (scrollRef.current) {
      const itemWidth = 180;
      scrollRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
    }
  };

  const logos = [
    { src: '/images/logos/2.webp', alt: 'Blockchain' },
    { src: '/images/logos/1.webp', alt: 'Visa' },
    { src: '/images/logos/3.webp', alt: 'NMVTIS' },
    { src: '/images/logos/4.webp', alt: 'Trusted Site' }
  ];

  return (
    <div className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex md:grid md:grid-cols-4 items-center 
              overflow-x-auto md:overflow-x-visible scrollbar-hide 
              gap-6 md:gap-8 lg:gap-12 pb-4 md:pb-0 snap-x snap-mandatory"
            onScroll={handleScroll}
          >
            {logos.map((logo, index) => (
              <motion.div
                key={logo.alt}
                className="flex-shrink-0 w-[180px] md:w-full snap-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="w-full h-auto object-contain grayscale hover:grayscale-0 
                    transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>

          {/* Enhanced scroll indicators */}
          <div className="flex justify-center space-x-3 mt-4 md:hidden">
            {logos.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => scrollToItem(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300`}
                animate={{
                  backgroundColor: activeIndex === index ? '#3B82F6' : '#D1D5DB',
                  width: activeIndex === index ? 16 : 8
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Scroll to logo ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Add these CSS styles to handle responsive images better
const styles = `
  @media (max-width: 768px) {
    .partner-logo-container {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE and Edge */
    }
    
    .partner-logo-container::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
  }
`;

export default Home; 