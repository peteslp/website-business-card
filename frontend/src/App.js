import React, { useState, useEffect } from "react";
import "./App.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollY, setScrollY] = useState(0);
  const [visibleExperiences, setVisibleExperiences] = useState([]);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const observeExperiences = () => {
      const experienceElements = document.querySelectorAll('.experience-card');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleExperiences(prev => [...new Set([...prev, index])]);
          }
        });
      }, { threshold: 0.3 });

      experienceElements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    };

    // Counter animation
    const animateCounters = () => {
      const counters = document.querySelectorAll('.counter');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let count = 0;
        const updateCounter = () => {
          if (count < target) {
            count++;
            counter.textContent = count;
            setTimeout(updateCounter, 50);
          }
        };
        setTimeout(updateCounter, 1000); // Start after 1 second delay
      });
    };

    window.addEventListener('scroll', handleScroll);
    const cleanup = observeExperiences();
    animateCounters();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cleanup();
    };
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth' 
    });
    setActiveSection(sectionId);
  };

  const experiences = [
    {
      title: "Speech-Language Pathologist – Simply SLPs, LLC (Owner)",
      period: "August 2019 – Current",
      description: "Contract SLP with Charter Schools in Arizona. Supervision and case management."
    },
    {
      title: "Speech-Language Pathologist – Simply SLPs, LLC (Owner)", 
      period: "December 2008 – May 2019",
      description: "Contract SLP with Public School Districts in California and Arizona. Direct therapy, supervision and case management."
    },
    {
      title: "Speech-Language Pathologist",
      period: "September 2003 – December 2008", 
      description: "Contracted with various therapy agencies to provide quality in-home speech therapy to children and adults."
    },
    {
      title: "Regional Sales Consultant/SLP – Assistive Technology, Inc.",
      period: "September 2001 – August 2003",
      description: "Developed and managed assistive technology sales for clinics, hospitals, and schools. Exceeded goals and contributed to product development."
    },
    {
      title: "Speech-Language Pathologist",
      period: "September 1998 – August 2001",
      description: "Worked with Public School Districts in New York. Direct therapy and case management."
    }
  ];

  const specializations = [
    "Pragmatic Language Development",
    "Autism Spectrum Disorders", 
    "SLPA Supervision",
    "Case Management",
    "ABA Certification (In Progress)",
    "Pediatric Speech Therapy"
  ];

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-white">Pete O'Rourke, M.S., CCC-SLP</div>
            <div className="hidden md:flex space-x-6">
              <button onClick={() => scrollToSection('hero')} className="text-gray-300 hover:text-blue-400 transition-colors">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-blue-400 transition-colors">About</button>
              <button onClick={() => scrollToSection('experience')} className="text-gray-300 hover:text-blue-400 transition-colors">Experience</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-blue-400 transition-colors">Contact</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        <div className="hero-overlay" style={{ opacity: Math.max(0.8, 1 - scrollY / 1000) }}></div>
        <div className="hero-content" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
          <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="profile-image-container">
              <div className="profile-image floating">
                <div className="profile-placeholder">
                  <span className="text-4xl font-bold text-gray-600">PO</span>
                </div>
                <div className="profile-ring"></div>
                <div className="profile-ring-2"></div>
              </div>
            </div>
            <h1 className="hero-title typewriter">Pete O'Rourke</h1>
            <h2 className="hero-subtitle">M.S., CCC-SLP</h2>
            <p className="hero-description">Speech-Language Pathologist</p>
            <div className="hero-stats">
              <div className="stat-item pulse-animation">
                <span className="stat-number counter" data-target="25">0</span><span className="stat-number">+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item pulse-animation">
                <span className="stat-number">Simply SLPs</span>
                <span className="stat-label">LLC Owner</span>
              </div>
            </div>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="cta-button pulse-button"
            >
              <span>Get In Touch</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">Professional Summary</h2>
            <div className="section-divider"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                With over 25 years of experience in Speech-Language Pathology, I specialize in pragmatic language development and am passionate about supporting children on the Autism Spectrum.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                As an experienced SLPA supervisor and caseload manager, I founded and manage Simply SLPs, LLC, providing quality speech therapy services across Arizona and California.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Currently pursuing ABA Certification through Arizona State University to expand my expertise in behavioral approaches to communication disorders.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Specializations</h3>
              <div className="grid grid-cols-2 gap-3">
                {specializations.map((spec, index) => (
                  <div key={index} className="specialization-tag">
                    {spec}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">Professional Experience</h2>
            <div className="section-divider"></div>
          </div>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                data-index={index}
                className={`experience-card ${visibleExperiences.includes(index) ? 'animate-in' : ''}`}
              >
                <div className="experience-timeline"></div>
                <div className="experience-content">
                  <h3 className="experience-title">{exp.title}</h3>
                  <p className="experience-period">{exp.period}</p>
                  <p className="experience-description">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title text-white">Contact Information</h2>
            <div className="section-divider bg-blue-400"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="contact-card">
              <div className="contact-icon">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <h3 className="contact-title">Email</h3>
              <a href="mailto:simplyslps@gmail.com" className="contact-link">
                simplyslps@gmail.com
              </a>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
              </div>
              <h3 className="contact-title">Phone</h3>
              <a href="tel:+18053412334" className="contact-link">
                (805) 341-2334
              </a>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="contact-title">Location</h3>
              <p className="contact-link">Mesa, Arizona</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p>&copy; 2024 Pete O'Rourke, M.S., CCC-SLP - Simply SLPs, LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;