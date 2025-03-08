
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const navLinks = [
    { name: 'ホーム', href: '#home' },
    { name: 'サービス', href: '#features' },
    { name: '料金', href: '#pricing' },
    { name: 'お客様の声', href: '#testimonials' },
    { name: 'よくある質問', href: '#faq' },
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
            <span className="text-2xl font-bold text-foreground transition-all">
              StayFlow
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground/80 hover:text-foreground font-medium transition-all duration-200"
                onClick={closeMenu}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#contact"
              className="btn-primary"
            >
              はじめる
            </a>
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

      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full justify-center items-center space-y-8 p-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-foreground text-xl font-medium"
              onClick={closeMenu}
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="btn-primary mt-4" onClick={closeMenu}>
            はじめる
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
