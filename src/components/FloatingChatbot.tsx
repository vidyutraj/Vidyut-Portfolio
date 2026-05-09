import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, Loader2, X, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { personalInfo } from '@/data/personal';
import { projects } from '@/data/projects';
import { experiences } from '@/data/experience';
import { certifications } from '@/data/certifications';
import { leadership } from '@/data/leadership';
import { articles } from '@/data/writing';
import { CHATBOT_BACKEND_URL } from '@/config/chatbot';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Build knowledge base from portfolio data
const buildKnowledgeBase = (): string => {
  const projectsText = projects.map(p => 
    `Project: ${p.title}\nCategory: ${p.category}\nDescription: ${p.description}\nProblem: ${p.problem}\nOutcome: ${p.outcome}\nTech Stack: ${p.techStack.join(', ')}\n${p.githubUrl ? `GitHub: ${p.githubUrl}` : ''}\n${p.demoUrl ? `Demo: ${p.demoUrl}` : ''}`
  ).join('\n\n');

  const experienceText = experiences.map(exp => 
    `Company: ${exp.company}\n${exp.roles.map(r => 
      `Role: ${r.position} (${r.startDate} - ${r.endDate || 'Present'})\n` +
      `Type: ${r.employmentType}\n` +
      `Location: ${r.location}\n` +
      (r.defaultBullets?.length ? `Responsibilities: ${r.defaultBullets.join('; ')}\n` : '') +
      (r.technologies?.length ? `Technologies: ${r.technologies.join(', ')}\n` : '') +
      (r.achievements?.length ? `Achievements: ${r.achievements.join('; ')}` : '')
    ).join('\n')}`
  ).join('\n\n');

  const certsText = certifications.map(c => 
    `${c.name} by ${c.issuer} (Issued: ${c.issueDate}${c.expirationDate ? `, Expires: ${c.expirationDate}` : ''})`
  ).join('\n');

  const leadershipText = leadership.map(l => 
    `${l.position} at ${l.organization} (${l.startDate} - ${l.endDate || 'Present'})`
  ).join('\n');

  const writingText = articles.map(a => 
    `Article: ${a.title}\nPublished: ${a.date}\nRead Time: ${a.readTime}\nDescription: ${a.description}\nTags: ${a.tags.join(', ')}\nURL: ${a.url}`
  ).join('\n\n');

  // Education information (hardcoded in About component)
  const educationText = `Georgia Institute of Technology
Degree: B.S. in Computer Engineering
Threads: Cybersecurity and Information Internetworks
Expected Graduation: May 2027
Location: Atlanta, GA
GPA: 4.0

Relevant Coursework:
${[
  'Data Structures & Algorithms',
  'Objects & Design',
  'Object-Oriented Programming',
  'Computer Systems Programming',
  'Computer Networking',
  'Computer Architecture',
  'FPGA Design',
  'Linear Algebra',
].join(', ')}`;

  return `
PORTFOLIO KNOWLEDGE BASE:

PERSONAL INFORMATION:
Name: ${personalInfo.name}
Title: ${personalInfo.title}
Location: ${personalInfo.location}
Tagline: ${personalInfo.tagline}

BIO:
${personalInfo.bio.intro}

Current Focus: ${personalInfo.bio.currentFocus.join(', ')}

Interests: ${personalInfo.bio.interests}

EDUCATION:
${educationText}

CONTACT:
Email: ${personalInfo.social.email}
GitHub: ${personalInfo.social.github}
LinkedIn: ${personalInfo.social.linkedin}
Medium: ${personalInfo.social.medium}

PROJECTS:
${projectsText}

EXPERIENCE:
${experienceText}

CERTIFICATIONS:
${certsText}

LEADERSHIP:
${leadershipText}

WRITING/ARTICLES:
${writingText}
`.trim();
};

const SYSTEM_PROMPT = `You are a technical assistant representing ${personalInfo.name}. Answer questions using ONLY explicitly documented information from the knowledge base.

CRITICAL RULES - NO INFERENCES OR IMPLICATIONS:
1. ONLY state facts that are explicitly written in the knowledge base. Do NOT infer, imply, or assume anything.
2. Do NOT use phrases like: "likely," "probably," "implied," "suggests," "may have," "would have," "typically," "usually." These are inferences, not facts.
3. Role titles alone do NOT imply activities. For example, "Researcher" does NOT mean "presented findings" or "co-authored papers" unless explicitly stated.
4. Do NOT infer accomplishments, presentations, publications, or contributions from role titles or descriptions. Only mention what is explicitly documented.
5. For questions that can be answered by synthesizing explicit information (e.g., "what skills?" when projects list tech stacks), compile ONLY what is explicitly listed.
6. If the knowledge base does not contain enough explicit information to answer a question, say: "I don't have enough information to answer that accurately from the available portfolio data."
7. Avoid resume buzzwords and hype language. Do NOT use: "extensive," "expert," "highly accomplished," "deep expertise," "years of experience," "proven track record."
8. Use concrete, action-oriented language for explicitly documented activities: "built," "configured," "developed," "implemented," "worked on."
9. When listing technologies, projects, or experiences, only include what is explicitly mentioned. Do not extrapolate.
10. For dates, roles, and certifications, use the exact information provided. Never assume duration, scope, or activities beyond what is stated.
11. Keep responses technical, precise, and conversational. Write for a technically literate audience.
12. Use **bold** (with double asterisks) to highlight important information like project names, key technologies, achievements, or metrics. Use bold sparingly.
13. Example of what NOT to do: "As a Researcher, Vidyut likely presented findings" → This is inference.
14. Example of what TO do: "Vidyut worked as an Embedded System Security Researcher starting in 2026-02" → This is a documented fact.

Tone: Technical peer stating only documented facts, never inferring or implying unstated activities.

Knowledge Base:
${buildKnowledgeBase()}`;

export const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi! I can answer questions about ${personalInfo.name.split(' ')[0]}'s portfolio based on documented projects, experience, and work. What would you like to know?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen && !isMinimized && messagesContainerRef.current) {
      // Use setTimeout to ensure DOM is updated
      setTimeout(() => {
        messagesContainerRef.current?.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [messages, isOpen, isMinimized, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Scroll to bottom after user message
    setTimeout(() => {
      messagesContainerRef.current?.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }, 50);

    try {
      // Call secure backend endpoint instead of Groq directly
      // The backend handles API key authentication server-side
      const response = await fetch(CHATBOT_BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage.content },
          ],
        }),
      });

      if (!response.ok) {
        if (response.status === 405) {
          throw new Error('Method not allowed');
        }
        throw new Error(`Backend error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || data.content || 'Sorry, I encountered an error processing your request.';
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: content,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Scroll to bottom after response
      setTimeout(() => {
        messagesContainerRef.current?.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    } catch (error) {
      console.error('Chatbot error:', error);
      let errorContent = 'Sorry, I\'m having trouble connecting to the chatbot service right now. Please try again later or reach out directly via email!';
      
      // Provide helpful error message for network issues
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorContent = 'Unable to connect to the chatbot service. Please check your connection and try again, or reach out directly via email!';
      }
      
      const errorMessage: Message = {
        role: 'assistant',
        content: errorContent,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      
      // Scroll to bottom after error message
      setTimeout(() => {
        messagesContainerRef.current?.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-foreground text-background shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.6)] hover:shadow-[0_15px_50px_-10px_hsl(var(--primary)/0.8)] hover:scale-105 transition-all duration-500 flex items-center justify-center group"
          aria-label="Open chatbot"
        >
          <MessageCircle className="w-5 h-5 transition-transform duration-500 group-hover:scale-110" />
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full border-2 border-background animate-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex flex-col bg-card/90 backdrop-blur-2xl border border-border/70 rounded-2xl shadow-2xl shadow-background/60 transition-all duration-500 ${
            isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm tracking-tight">Portfolio Assistant</h3>
                <p className="text-[11px] text-muted-foreground font-mono tracking-wide">Ask about {personalInfo.name.split(' ')[0]}'s work</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={isMinimized ? 'Expand' : 'Minimize'}
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto space-y-4 p-4 bg-background/50"
                style={{ maxHeight: '450px' }}
              >
                {messages.map((message, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                      message.role === 'user' 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-terminal-green/20 text-terminal-green'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-3.5 h-3.5" />
                      ) : (
                        <Bot className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                      <div className={`inline-block p-2.5 rounded-lg text-sm ${
                        message.role === 'user'
                          ? 'bg-primary/20 text-foreground'
                          : 'bg-secondary/50 text-muted-foreground'
                      }`}>
                        <p className="leading-relaxed whitespace-pre-wrap">
                          {message.role === 'assistant' ? (
                            message.content.split(/(\*\*[^*]+\*\*)/g).map((part, partIdx) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={partIdx} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
                              }
                              return <span key={partIdx}>{part}</span>;
                            })
                          ) : (
                            message.content
                          )}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 px-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-terminal-green/20 text-terminal-green">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <div className="inline-block p-2.5 rounded-lg bg-secondary/50">
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-border/30 bg-card rounded-b-2xl">
                <form onSubmit={handleSend} className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about projects, experience, skills..."
                    className="flex-1 px-3 py-2 rounded-lg bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-sm"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    variant="hero"
                    size="sm"
                    disabled={!input.trim() || isLoading}
                    className="px-3"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

