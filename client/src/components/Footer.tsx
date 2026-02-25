import { Link } from "wouter";
import { PawPrint, MapPin, Phone, Mail, Heart } from "lucide-react";

const serviceAreas = [
  { href: "/pet-sitting-wellington-co", label: "Wellington, CO" },
  { href: "/pet-sitting-fort-collins-co", label: "Fort Collins, CO" },
  { href: "/pet-sitting-loveland-co", label: "Loveland, CO" },
  { href: "/pet-sitting-evans-co", label: "Evans, CO" },
  { href: "/pet-sitting-timnath-co", label: "Timnath, CO" },
  { href: "/pet-sitting-berthoud-co", label: "Berthoud, CO" },
  { href: "/farm-animal-sitting-northern-colorado", label: "All Northern Colorado" },
];

const serviceLinks = [
  { href: "/services/dogs", label: "Dog Sitting" },
  { href: "/services/cats", label: "Cat Sitting" },
  { href: "/services/horses", label: "Horse Care" },
  { href: "/services/goats", label: "Goat Care" },
  { href: "/services/peacocks", label: "Peacock Care" },
  { href: "/services/livestock", label: "Livestock Care" },
  { href: "/services/exotic", label: "Exotic Animals" },
  { href: "/services/farm", label: "Farm & Ranch" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/30 mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center">
                <PawPrint className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                <span className="text-purple-glow">Paw</span>Sitting
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Professional pet sitting and farm animal care in Northern Colorado. From dogs to horses, goats to peacocks — we care for all animals.
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Northern Colorado
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                hello@pawsitting.com
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Service Areas</h3>
            <ul className="space-y-2">
              {serviceAreas.map((area) => (
                <li key={area.href}>
                  <Link href={area.href}>
                    <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {area.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/booking"><span className="text-sm text-muted-foreground hover:text-primary transition-colors">Book a Visit</span></Link></li>
              <li><Link href="/gallery"><span className="text-sm text-muted-foreground hover:text-primary transition-colors">Photo Gallery</span></Link></li>
              <li><Link href="/report-cards"><span className="text-sm text-muted-foreground hover:text-primary transition-colors">Pet Report Cards</span></Link></li>
              <li><Link href="/pet-cam"><span className="text-sm text-muted-foreground hover:text-primary transition-colors">Pet Cam</span></Link></li>
              <li><Link href="/about"><span className="text-sm text-muted-foreground hover:text-primary transition-colors">About & Mission</span></Link></li>
              <li><Link href="/dashboard"><span className="text-sm text-muted-foreground hover:text-primary transition-colors">Client Dashboard</span></Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} PawSitting. All rights reserved. Northern Colorado's premier pet & farm animal sitting service.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-primary" /> by a teen entrepreneur using AI for good
          </p>
          <p className="text-xs text-muted-foreground">
            AI chat and phone assistant provided by free sources and APIs
          </p>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "PawSitting",
            description: "Professional pet sitting and farm animal care in Northern Colorado. Dogs, cats, horses, goats, peacocks, livestock, and exotic animals.",
            url: "https://pawsitting.manus.space",
            areaServed: [
              { "@type": "City", name: "Wellington", addressRegion: "CO" },
              { "@type": "City", name: "Fort Collins", addressRegion: "CO" },
              { "@type": "City", name: "Loveland", addressRegion: "CO" },
              { "@type": "City", name: "Evans", addressRegion: "CO" },
              { "@type": "City", name: "Timnath", addressRegion: "CO" },
              { "@type": "City", name: "Berthoud", addressRegion: "CO" },
            ],
            serviceType: [
              "Pet Sitting",
              "Dog Walking",
              "Farm Animal Care",
              "Horse Sitting",
              "Livestock Care",
              "Exotic Animal Care",
            ],
            priceRange: "$20-$200+",
            founder: {
              "@type": "Person",
              name: "Reese",
              description: "Teen entrepreneur and animal lover in Northern Colorado",
            },
          }),
        }}
      />
    </footer>
  );
}
