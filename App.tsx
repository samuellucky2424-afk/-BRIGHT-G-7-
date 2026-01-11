
import React, { useEffect, useState, useRef } from 'react';
import { SERVICES, OFFICES } from './constants';
import TrackingSection from './components/TrackingSection';
import AIConsultant from './components/AIConsultant';

const QuoteModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="bg-slate-950 p-8 text-white flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-brand font-black">Request a Quote</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Direct Logistics Procurement</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors text-2xl">✕</button>
        </div>
        
        <div className="p-8">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✓</div>
              <h4 className="text-2xl font-brand font-black text-slate-950">Inquiry Received</h4>
              <p className="text-slate-500 font-medium mt-2">A logistics analyst will contact you within 2 business hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="First Name" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" />
                <input required type="text" placeholder="Last Name" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" />
              </div>
              <input required type="email" placeholder="Corporate Email" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" />
              <div className="grid grid-cols-2 gap-4">
                <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all">
                  <option>Air Freight</option>
                  <option>Sea Freight</option>
                  <option>Land Transport</option>
                </select>
                <input type="text" placeholder="Est. Weight (kg)" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" />
              </div>
              <textarea placeholder="Cargo details and requirements..." rows={3} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"></textarea>
              <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-xl transition-all shadow-xl shadow-orange-500/20 uppercase tracking-widest text-xs">
                Submit Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const Header: React.FC<{ onTrackClick: () => void }> = ({ onTrackClick }) => {
  const [scrolled, setScrolled] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center px-6 py-3 rounded-full transition-all duration-500 ${scrolled ? 'glass-card shadow-lg ring-1 ring-slate-900/5' : 'bg-transparent'}`}>
          <div className="flex items-center gap-2">
            <div className="bg-slate-950 p-2 rounded-xl shadow-inner cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <span className="text-white font-brand font-black text-2xl tracking-tighter">BG7</span>
            </div>
            <div className="flex flex-col cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <span className="font-brand font-black text-slate-950 leading-none text-lg">BRIGHT G-7</span>
              <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">Logistics Ltd</span>
            </div>
          </div>
          
          <nav className="hidden md:flex gap-10 text-xs font-bold uppercase tracking-widest text-slate-600">
            {['Services', 'About', 'Tracking', 'Network'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-orange-500 transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <button 
            onClick={onTrackClick}
            className="bg-slate-950 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl hover:shadow-orange-500/20 active:scale-95"
          >
            Track Cargo
          </button>
        </div>
      </div>
    </header>
  );
};

const Hero: React.FC<{ onTrackClick: () => void; onQuoteClick: () => void }> = ({ onTrackClick, onQuoteClick }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-[100vh] bg-slate-950 flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ transform: `translateY(${scrollY * 0.2}px)` }}></div>
        <div className="absolute bottom-20 right-10 w-[50rem] h-[50rem] bg-orange-600/10 rounded-full blur-[150px] animate-subtle-pulse" style={{ transform: `translateY(${scrollY * -0.15}px)` }}></div>
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <img src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover scale-110 animate-[kenburns_40s_infinite_alternate]" alt="Logistic Background" />
          <div className="absolute inset-0 bg-slate-950/60 mix-blend-multiply"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
        <div className="max-w-4xl" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em]">Global Network Active • 2025</span>
          </div>
          
          <h1 className="text-6xl md:text-[5.5rem] font-brand font-black text-white leading-[0.9] mb-8 tracking-tighter">
            NAVIGATING <span className="text-gradient">GLOBAL</span> <br/>
            COMMERCE <span className="text-orange-500 italic">SMART.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-2xl mb-12">
            Premier freight management and AI-driven logistics from our Dubai headquarters to the most critical lanes of world trade.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <button onClick={onTrackClick} className="group relative px-10 py-5 bg-orange-500 rounded-2xl overflow-hidden font-bold text-white transition-all shadow-2xl shadow-orange-500/30 active:scale-95">
              <span className="relative z-10 flex items-center gap-2 text-lg">
                Track Shipment <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
            <button onClick={onQuoteClick} className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-bold text-white text-lg hover:bg-white/10 transition-all backdrop-blur-md">
              Get a Quote
            </button>
          </div>
        </div>
      </div>
      
      <div className="hidden xl:block absolute right-[-2%] top-1/2 -translate-y-1/2 w-1/2 z-20 pointer-events-none">
        <div className="relative" style={{ transform: `translateY(${scrollY * -0.05}px)` }}>
          <div className="absolute inset-0 bg-orange-500/10 blur-[120px] rounded-full animate-pulse"></div>
          <img src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1200" alt="Cargo Vessel" className="rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10 grayscale hover:grayscale-0 transition-all duration-1000 animate-[float_6s_ease-in-out_infinite]" />
        </div>
      </div>

      <div className="absolute bottom-10 left-0 w-full px-8 hidden lg:block overflow-hidden">
          <div className="max-w-7xl mx-auto flex justify-between items-center border-t border-white/10 pt-10" style={{ transform: `translateY(${scrollY * 0.15}px)` }}>
              {[
                  { label: "Vessels Active", value: "2.4k+" },
                  { label: "Countries Served", value: "190+" },
                  { label: "Annual Tonnage", value: "1.2M" },
                  { label: "Support Desk", value: "24/7" }
              ].map(stat => (
                  <div key={stat.label} className="group cursor-default">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 group-hover:text-orange-500 transition-colors">{stat.label}</p>
                      <p className="text-4xl font-brand font-black text-white group-hover:scale-105 transition-transform origin-left">{stat.value}</p>
                  </div>
              ))}
          </div>
      </div>
    </section>
  );
};

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1500);
  };

  return (
    <section id="contact" className="py-32 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px]">Reach Out</span>
            <h2 className="text-4xl md:text-6xl font-brand font-black text-white mt-4 mb-8 tracking-tighter">Speak to an Expert.</h2>
            <p className="text-slate-400 text-lg mb-12 max-w-md">Our global response team is available 24/7 to handle urgent cargo inquiries and strategic planning.</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Support</p>
                  <p className="font-bold">+971 4 123 4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">General Inquiries</p>
                  <p className="font-bold">desk@bright-g7.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-md">
            {status === 'sent' ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">✓</div>
                <h4 className="text-2xl font-brand font-black">Transmission Sent</h4>
                <p className="text-slate-400 mt-2">Our team has received your message and is reviewing it.</p>
                <button onClick={() => setStatus('idle')} className="mt-8 text-orange-500 font-black uppercase text-[10px] tracking-widest hover:underline">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSend} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <input required type="text" placeholder="FULL NAME" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold tracking-widest focus:outline-none focus:border-orange-500 transition-all" />
                  <input required type="email" placeholder="EMAIL" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold tracking-widest focus:outline-none focus:border-orange-500 transition-all" />
                </div>
                <input required type="text" placeholder="SUBJECT" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold tracking-widest focus:outline-none focus:border-orange-500 transition-all" />
                <textarea required rows={4} placeholder="YOUR MESSAGE" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold tracking-widest focus:outline-none focus:border-orange-500 transition-all"></textarea>
                <button disabled={status === 'sending'} className="w-full bg-white text-slate-950 hover:bg-orange-500 hover:text-white font-black py-5 rounded-2xl transition-all uppercase tracking-widest text-xs disabled:opacity-50">
                  {status === 'sending' ? 'TRANSMITTING...' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const Services: React.FC = () => (
  <section id="services" className="py-32 bg-white relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div className="max-w-2xl">
          <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px]">Strategic Operations</span>
          <h2 className="text-4xl md:text-6xl font-brand font-black text-slate-950 mt-4 leading-tight tracking-tighter">
            Integrated Freight & <br/>Supply Solutions.
          </h2>
        </div>
        <p className="text-slate-500 font-medium max-w-sm border-l-2 border-orange-500/20 pl-6 py-2">
          Harnessing advanced logistics architecture to mobilize cargo across the world's most complex supply chains.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {SERVICES.map((service, idx) => (
          <div key={service.id} className="group relative bg-slate-50 p-6 rounded-[3rem] border border-slate-100 hover-lift hover:bg-slate-950 transition-all duration-700 overflow-hidden">
            <div className="h-48 mb-8 overflow-hidden rounded-[2rem]">
              <img src={service.icon} alt={service.title} className="w-full h-full object-cover transform transition-transform group-hover:scale-110 duration-700" />
            </div>
            <h3 className="text-2xl font-black text-slate-950 group-hover:text-white mb-4 transition-colors tracking-tight">{service.title}</h3>
            <p className="text-slate-500 group-hover:text-slate-400 leading-relaxed text-sm mb-8 transition-colors">{service.description}</p>
            <div className="w-12 h-1 bg-orange-500 rounded-full group-hover:w-full transition-all duration-700"></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Network: React.FC = () => (
  <section id="network" className="py-32 bg-slate-950 overflow-hidden relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
                <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px]">Global Footprint</span>
                <h2 className="text-4xl md:text-6xl font-brand font-black text-white mt-4 mb-10 tracking-tighter">A Connected <br/>Powerhouse.</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {OFFICES.map(office => (
                        <div key={office.city} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all group backdrop-blur-sm">
                            <p className="text-orange-500 font-black text-[10px] uppercase tracking-widest mb-2">{office.country}</p>
                            <p className="text-2xl font-brand font-black text-white mb-4">{office.city}</p>
                            <p className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors leading-relaxed font-medium">{office.address}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative">
                <div className="absolute -inset-20 bg-blue-600/10 blur-[120px] rounded-full animate-pulse"></div>
                <img 
                    src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200" 
                    className="rounded-[4rem] shadow-2xl relative z-10 border border-white/10 grayscale hover:grayscale-0 transition-all duration-1000 shadow-blue-900/20" 
                    alt="Dubai Hub"
                />
            </div>
        </div>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="bg-slate-950 pt-32 pb-12 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-8">
                <div className="bg-white p-2 rounded-xl">
                    <span className="text-slate-950 font-brand font-black text-2xl tracking-tighter">BG7</span>
                </div>
                <span className="font-brand font-black text-white text-2xl tracking-tight">BRIGHT G-7</span>
            </div>
            <p className="text-slate-400 text-lg max-w-md leading-relaxed font-medium">
                Pioneering the future of logistics through global collaboration and tech-driven cargo orchestration. From Dubai to the World.
            </p>
        </div>
        <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-[10px]">Resources</h4>
            <ul className="space-y-4 text-slate-500 font-bold text-xs uppercase tracking-widest">
                <li><a href="#services" className="hover:text-orange-500 transition-colors">Service Level Agreements</a></li>
                <li><a href="#network" className="hover:text-orange-500 transition-colors">Carrier Network</a></li>
                <li><a href="#contact" className="hover:text-orange-500 transition-colors">Compliance Hub</a></li>
                <li><a href="#tracking" className="hover:text-orange-500 transition-colors">Customer Portal</a></li>
            </ul>
        </div>
        <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-[10px]">Official Comms</h4>
                <div className="flex gap-4">
                  {[
                    { icon: 'LinkedIn', symbol: '🔗' },
                    { icon: 'Twitter', symbol: '𝕏' },
                    { icon: 'Instagram', symbol: '📸' },
                    { icon: 'Phone', symbol: '📞' }
                  ].map((item, i) => (
                    <div key={i} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:text-white text-slate-400 transition-all cursor-pointer group" title={item.icon}>
                        <span className="group-hover:scale-110 transition-transform text-xl">
                          {item.symbol}
                        </span>
                    </div>
                  ))}
                </div>
        </div>
      </div>
      
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-600 text-[10px] font-black uppercase tracking-[0.4em]">
        <p>© 2025 BRIGHT G-7 LTD. PRECISION IN MOTION.</p>
        <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Infrastructure</a>
            <a href="#" className="hover:text-white transition-colors">Anti-Bribery</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const trackInputRef = useRef<HTMLInputElement>(null);

  const scrollToTracking = () => {
    const el = document.getElementById('tracking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Short delay to allow scroll to complete before focusing
      setTimeout(() => {
        const input = document.getElementById('tracking-input');
        input?.focus();
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onTrackClick={scrollToTracking} />
      <Hero onTrackClick={scrollToTracking} onQuoteClick={() => setIsQuoteOpen(true)} />
      <Services />
      <Network />
      <TrackingSection />
      <Contact />
      <Footer />
      <AIConsultant />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
};

export default App;
