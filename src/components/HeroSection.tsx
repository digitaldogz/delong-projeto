import { ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative w-full min-h-screen bg-background text-foreground overflow-hidden font-sans selection:bg-destructive selection:text-destructive-foreground">
      
      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-8 md:px-12 flex justify-between items-start z-50">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <span className="text-2xl font-bold tracking-tighter text-foreground">ZEIT</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex flex-col items-end gap-2">
          <ul className="flex gap-8 text-sm font-medium tracking-wide">
            {['01 About', '02 Works', '03 Services', '04 Blog'].map((item) => (
              <li key={item}>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          
          {/* CTA */}
          <a href="#" className="mt-2 flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors group">
            CONTACT 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden text-foreground cursor-pointer">
          <div className="space-y-1.5">
            <span className="block w-8 h-0.5 bg-foreground"></span>
            <span className="block w-8 h-0.5 bg-foreground"></span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="absolute bottom-24 left-8 md:left-12 z-20 max-w-4xl pointer-events-none">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-foreground uppercase">
          <span className="block">Art Comes First —</span>
          <span className="block text-muted-foreground">Creative Above All</span>
        </h1>
      </main>

      {/* New Project Widget */}
      <div className="absolute bottom-24 right-8 md:right-12 z-20 hidden md:block">
        <div className="w-[300px] bg-card border border-border p-3 flex items-center gap-4 cursor-pointer hover:border-muted-foreground/50 transition-colors group">
          
          {/* Project Thumbnail */}
          <div className="relative w-16 h-16 overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900 to-blue-600 opacity-80"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Play size={20} fill="currentColor" className="text-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Widget Text */}
          <div className="flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
              New Project
            </span>
            <span className="text-xs font-bold text-foreground leading-tight group-hover:underline">
              CAMPAIGN 'WE GOT YOU'
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 left-0 w-full px-8 md:px-12 flex justify-between items-end z-30 text-[10px] md:text-xs font-medium tracking-widest uppercase">
        
        {/* Social Links */}
        <div className="flex gap-6 text-muted-foreground/60">
          <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
          <a href="#" className="hover:text-foreground transition-colors">Facebook</a>
          <a href="#" className="hover:text-foreground transition-colors">Behance</a>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:block absolute left-1/2 bottom-0 -translate-x-1/2 animate-bounce text-foreground/20">
          ↓
        </div>

        {/* Quick Links */}
        <div className="flex gap-6 text-foreground">
          <a href="#" className="hover:text-primary transition-colors">[ All Works ]</a>
          <a href="#" className="hover:text-primary transition-colors">[ Show Reel ]</a>
        </div>
      </footer>

      {/* Background Effect */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_hsl(var(--card))_0%,_hsl(var(--background))_70%)] opacity-40 pointer-events-none"></div>
    </div>
  );
};

export default HeroSection;
