
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Sparkles } from 'lucide-react';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import FadeIn from './animations/FadeIn';
import { useFeedback } from '@/hooks/use-feedback';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openFeedback } = useFeedback();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Simplified navigation links
  const navLinks = [
    { name: 'ホーム', href: '#home' },
    { name: 'サービス', href: '#features' },
    { name: '料金', href: '#pricing' },
    { name: 'お問い合わせ', href: '#contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4',
        scrolled ? 'glass shadow-sm py-3' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center">
            <Logo />
          </a>

          {/* Desktop Navigation - Enhanced with animations */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link, index) => (
              <FadeIn 
                key={link.name} 
                direction="down" 
                delay={index * 100}
                duration={500}
                className="story-link"
              >
                <a
                  href={link.href}
                  className="text-foreground/80 hover:text-foreground font-medium transition-all duration-200"
                  onClick={closeMenu}
                >
                  {link.name}
                </a>
              </FadeIn>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <FadeIn direction="down" delay={400} duration={500}>
              <button
                onClick={openFeedback}
                className="flex items-center px-4 py-1.5 text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
              >
                <Sparkles className="h-4 w-4 mr-1.5 text-amber-500" />
                フィードバック
              </button>
            </FadeIn>
            
            <FadeIn direction="down" delay={500} duration={500}>
              <Link
                to="/dashboard"
                className="btn-outline"
              >
                ダッシュボード
              </Link>
            </FadeIn>
            
            <FadeIn direction="down" delay={600} duration={500}>
              <a
                href="#contact"
                className="btn-primary hover-scale"
              >
                はじめる
              </a>
            </FadeIn>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Enhanced */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full justify-center items-center space-y-6 p-4">
          {navLinks.map((link, index) => (
            <FadeIn 
              key={link.name}
              direction="up"
              delay={index * 100}
              duration={400}
            >
              <a
                href={link.href}
                className="text-foreground text-xl font-medium"
                onClick={closeMenu}
              >
                {link.name}
              </a>
            </FadeIn>
          ))}
          <div className="flex flex-col space-y-4 pt-4">
            <FadeIn direction="up" delay={400} duration={400}>
              <button
                onClick={() => {
                  closeMenu();
                  openFeedback();
                }}
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
              >
                <Sparkles className="h-4 w-4 mr-1.5 text-amber-500" />
                フィードバック
              </button>
            </FadeIn>
            
            <FadeIn direction="up" delay={500} duration={400}>
              <Link to="/dashboard" className="btn-outline text-center" onClick={closeMenu}>
                ダッシュボード
              </Link>
            </FadeIn>
            
            <FadeIn direction="up" delay={600} duration={400}>
              <a href="#contact" className="btn-primary text-center hover-scale" onClick={closeMenu}>
                はじめる
              </a>
            </FadeIn>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
