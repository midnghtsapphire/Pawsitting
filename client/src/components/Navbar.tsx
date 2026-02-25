import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, PawPrint, ChevronDown } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/booking", label: "Book Now" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
];

const cityLinks = [
  { href: "/pet-sitting-wellington-co", label: "Wellington" },
  { href: "/pet-sitting-fort-collins-co", label: "Fort Collins" },
  { href: "/pet-sitting-loveland-co", label: "Loveland" },
  { href: "/pet-sitting-evans-co", label: "Evans" },
  { href: "/pet-sitting-timnath-co", label: "Timnath" },
  { href: "/pet-sitting-berthoud-co", label: "Berthoud" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 glass-strong">
      <nav className="container flex items-center justify-between h-16" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg gradient-purple flex items-center justify-center glow-purple-sm">
            <PawPrint className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            <span className="text-purple-glow">Paw</span>
            <span className="text-foreground">Sitting</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent/50 ${
                  location === link.href ? "text-primary bg-accent/30" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}

          {/* Service Areas Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent/50 transition-colors flex items-center gap-1">
                Areas <ChevronDown className="w-3 h-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass-strong">
              {cityLinks.map((city) => (
                <DropdownMenuItem key={city.href} asChild>
                  <Link href={city.href}>
                    <span>{city.label}, CO</span>
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild>
                <Link href="/farm-animal-sitting-northern-colorado">
                  <span className="text-primary font-medium">Farm & Ranch — All NoCo</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Auth + CTA */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <div className="w-6 h-6 rounded-full gradient-purple flex items-center justify-center text-xs text-white font-bold">
                    {user?.name?.[0] || "U"}
                  </div>
                  {user?.name || "Account"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-strong">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard"><span>Dashboard</span></Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/report-cards"><span>Report Cards</span></Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/pet-cam"><span>Pet Cam</span></Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <a href={getLoginUrl()}>
              <Button size="sm" className="gradient-purple text-white border-0 glow-purple-sm">
                Sign In
              </Button>
            </a>
          )}
          <Link href="/booking">
            <Button size="sm" className="gradient-purple-gold text-white border-0 font-semibold">
              Book Now
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-accent/50"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-border/50 pb-4">
          <div className="container flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                <span
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                    location === link.href ? "text-primary bg-accent/30" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <div className="border-t border-border/30 my-2" />
            <p className="px-3 text-xs text-muted-foreground uppercase tracking-wider">Service Areas</p>
            {cityLinks.map((city) => (
              <Link key={city.href} href={city.href} onClick={() => setMobileOpen(false)}>
                <span className="block px-3 py-2 rounded-lg text-sm text-muted-foreground">
                  {city.label}, CO
                </span>
              </Link>
            ))}
            <div className="border-t border-border/30 my-2" />
            <div className="px-3 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full">Dashboard</Button>
                  </Link>
                  <Button variant="ghost" onClick={() => { logout(); setMobileOpen(false); }}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <a href={getLoginUrl()}>
                  <Button className="w-full gradient-purple text-white border-0">Sign In</Button>
                </a>
              )}
              <Link href="/booking" onClick={() => setMobileOpen(false)}>
                <Button className="w-full gradient-purple-gold text-white border-0 font-semibold">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
