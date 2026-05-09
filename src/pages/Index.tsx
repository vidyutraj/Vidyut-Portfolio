import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/Navbar';
import { TelemetryBar } from '@/components/TelemetryBar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Certifications } from '@/components/Certifications';
import { Leadership } from '@/components/Leadership';
import { Writing } from '@/components/Writing';
import { Contact, Footer } from '@/components/Contact';
import { FloatingChatbot } from '@/components/FloatingChatbot';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Cybersecurity & Cloud Engineer | Georgia Tech</title>
        <meta 
          name="description" 
          content="Personal portfolio of a Georgia Tech Computer Engineering student specializing in cybersecurity, cloud infrastructure, automation, and applied AI. View projects and writing." 
        />
        <meta name="keywords" content="cybersecurity, cloud engineering, Georgia Tech, portfolio, security engineer, DevOps, AWS, automation" />
        <link rel="canonical" href="https://yourdomain.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Cybersecurity & Cloud Engineer Portfolio" />
        <meta property="og:description" content="Building secure, resilient systems at the intersection of zero-trust infrastructure, cloud automation, and detection engineering." />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cybersecurity & Cloud Engineer Portfolio" />
        <meta name="twitter:description" content="Building secure, resilient systems at the intersection of zero-trust infrastructure, cloud automation, and detection engineering." />
      </Helmet>

      <div className="relative min-h-screen bg-background noise-overlay scrollbar-thin">
        <TelemetryBar />
        <Navbar />
                    <main className="overflow-x-hidden">
                      <Hero />
                      <About />
                      <Experience />
                      <Projects />
                      <Certifications />
                      <Leadership />
                      <Writing />
                      <Contact />
                    </main>
                    <Footer />
                    <FloatingChatbot />
                  </div>
    </>
  );
};

export default Index;
