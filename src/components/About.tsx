import { AnimatedSection } from '@/components/AnimatedSection';
import { SectionHeader } from '@/components/SectionHeader';
import { GraduationCap, Calendar } from 'lucide-react';
import { personalInfo } from '@/data/personal';

export const About = () => {
  return (
    <section id="about" className="relative py-32 md:py-40">
      <div className="container px-6 md:px-10 max-w-7xl">
        <AnimatedSection>
          <SectionHeader
            index="01"
            kicker="About"
            title="About Me"
            meta="Profile · 01"
          />
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-6 mt-20">
          {/* Bio — wider column */}
          <AnimatedSection delay={0.1} className="lg:col-span-3">
            <div className="surface-interactive h-full p-10 rounded-2xl">
              <div className="eyebrow mb-6">Background</div>
              <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
                <p>{personalInfo.bio.intro}</p>
                <p>
                  Currently diving deep into{' '}
                  {personalInfo.bio.currentFocus.map((focus, index) => (
                    <span key={focus}>
                      <span className="text-foreground font-medium">{focus}</span>
                      {index < personalInfo.bio.currentFocus.length - 1 && ', '}
                      {index === personalInfo.bio.currentFocus.length - 2 && ' and '}
                    </span>
                  ))}
                  .
                </p>
                <p>{personalInfo.bio.interests}</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Education */}
          <AnimatedSection delay={0.2} className="lg:col-span-2">
            <div className="surface-interactive h-full p-10 rounded-2xl group">
              <div className="eyebrow mb-6">Education</div>

              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-card/80 border border-border/60 p-2 flex items-center justify-center">
                  <img
                    src={`${import.meta.env.BASE_URL}logos/GT.png`}
                    alt="Georgia Tech Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-xl font-semibold text-foreground mb-2 leading-tight">
                    Georgia Institute of Technology
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="font-mono">Expected May 2027</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                    <div className="flex items-center gap-1.5">
                      <span className="text-foreground font-medium">GPA</span>
                      <span className="font-mono">4.0</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pl-[72px] space-y-1 mb-8">
                <p className="text-base font-medium text-foreground">
                  B.S. Computer Engineering
                </p>
                <p className="text-sm text-muted-foreground">
                  Threads: Cybersecurity &amp; Information Internetworks
                </p>
              </div>

              <div className="hairline mb-6" />

              <div>
                <div className="eyebrow mb-4 flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Coursework</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Data Structures & Algorithms',
                    'Objects & Design',
                    'OOP',
                    'Computer Systems',
                    'Networking',
                    'Architecture',
                    'FPGA Design',
                    'Linear Algebra',
                  ].map((course) => (
                    <span key={course} className="chip">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
