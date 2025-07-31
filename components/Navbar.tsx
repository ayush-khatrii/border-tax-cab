"use client";
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation links
  const navLinks = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Insurance', href: '/insurance' },
    { title: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="w-full border-b backdrop-blur py-2 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-xl font-extrabold text-primary">Easy Tax</a>
        </div>

        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.title}>
                  <a href={link.href}>
                    <Button variant="ghost" className="text-foreground/80 cursor-pointer hover:text-primary transition-colors duration-300">
                      {link.title}
                    </Button>
                  </a>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 pt-12">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.title}
                    href={link.href}
                    className="text-lg font-medium text-gray-700 hover:text-gray-900 px-2 py-2 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.title}
                  </a>
                ))}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;