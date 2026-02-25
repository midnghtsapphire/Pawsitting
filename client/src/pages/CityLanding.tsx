import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MapPin, Star, ArrowRight, PawPrint, Tractor, Shield, Brain, CheckCircle } from "lucide-react";
import { SERVICE_CITIES, ANIMAL_CATEGORIES, SERVICE_TIERS } from "@shared/pawsitting";

interface CityLandingProps {
  city: string;
}

export default function CityLanding({ city }: CityLandingProps) {
  const cityData = SERVICE_CITIES.find((c) => c.id === city);

  if (!cityData) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">City not found</h1>
        <Link href="/"><Button className="mt-4">Go Home</Button></Link>
      </div>
    );
  }

  const isFarmPage = city === "noco-farm";

  return (
    <div className="py-12">
      {/* SEO-optimized structured data for this city */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `PawSitting - ${cityData.name} Pet & Farm Animal Sitting`,
            description: cityData.description,
            areaServed: { "@type": "City", name: cityData.name, addressRegion: cityData.state },
            serviceType: ["Pet Sitting", "Farm Animal Care", "Horse Sitting", "Livestock Care"],
            priceRange: "$20-$200+",
          }),
        }}
      />

      <div className="container">
        {/* Hero */}
        <div className="glass-card p-8 md:p-12 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-purple-glow/10 blur-[80px]" />
            {isFarmPage && <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-ranch-gold/10 blur-[60px]" />}
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">{cityData.name}, {cityData.state}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {isFarmPage ? (
                <>
                  <span className="text-ranch-gold">Farm & Ranch</span> Animal Sitting
                  <br />
                  <span className="text-foreground">in Northern Colorado</span>
                </>
              ) : (
                <>
                  Pet & Farm Animal Sitting
                  <br />
                  <span className="text-purple-glow">in {cityData.name}, Colorado</span>
                </>
              )}
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">{cityData.description}</p>
            <p className="text-sm italic text-muted-foreground mb-6">"{cityData.tagline}"</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {cityData.features.map((f, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-full glass text-foreground">
                  {f}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/booking">
                <Button size="lg" className="gradient-purple text-white border-0 glow-purple gap-2">
                  Book in {cityData.name} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="bg-transparent">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Animals We Care For */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Animals We Care for in {cityData.name}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {ANIMAL_CATEGORIES.map((cat) => (
              <Link key={cat.id} href={`/services/${cat.id}`}>
                <div className="glass-card p-5 text-center hover:glow-purple-sm transition-all cursor-pointer">
                  <span className="text-3xl block mb-2">{cat.emoji}</span>
                  <p className="text-sm font-medium">{cat.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Why PawSitting in this city */}
        <div className="glass-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Why Choose PawSitting in {cityData.name}?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Tractor className="w-5 h-5" />,
                title: "Farm & Ranch Expertise",
                desc: `The only pet sitter in ${cityData.name} that handles horses, goats, livestock, and exotic animals alongside dogs and cats.`,
              },
              {
                icon: <Brain className="w-5 h-5" />,
                title: "AI-Powered Service",
                desc: "24/7 AI chat and phone answering, smart health insights, GPS tracking, and automated report cards.",
              },
              {
                icon: <Shield className="w-5 h-5" />,
                title: "Local & Trusted",
                desc: `Born and raised in Northern Colorado. We know ${cityData.name} and its community.`,
              },
              {
                icon: <Star className="w-5 h-5" />,
                title: "Premium Care",
                desc: "Every visit includes photo updates, health logging, and a detailed pet report card.",
              },
              {
                icon: <MapPin className="w-5 h-5" />,
                title: "Full Area Coverage",
                desc: `We cover all of ${cityData.name} and surrounding areas — from neighborhoods to rural properties.`,
              },
              {
                icon: <PawPrint className="w-5 h-5" />,
                title: "All Animals Welcome",
                desc: "Dogs, cats, horses, goats, peacocks, chickens, reptiles, and more. If it has paws, hooves, or feathers — we care for it.",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg gradient-purple flex items-center justify-center text-white flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Tiers */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Service Tiers Available in {cityData.name}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICE_TIERS.map((tier) => (
              <div key={tier.id} className={`glass-card p-5 ${tier.id === "farm_ranch" ? "glow-purple-sm ring-1 ring-primary/20" : ""}`}>
                <h3 className="font-bold mb-1">{tier.name}</h3>
                <p className="text-lg font-bold text-primary mb-2">{tier.priceRange}</p>
                <p className="text-xs text-muted-foreground mb-3">{tier.description}</p>
                <Link href="/booking">
                  <Button size="sm" variant={tier.id === "farm_ranch" ? "default" : "outline"} className={`w-full ${tier.id === "farm_ranch" ? "gradient-purple text-white border-0" : "bg-transparent"}`}>
                    Book
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Content Block */}
        <div className="glass-card p-8 mb-12">
          <h2 className="text-xl font-bold mb-4">
            Professional Pet Sitting & Farm Animal Care in {cityData.name}, Colorado
          </h2>
          <div className="text-sm text-muted-foreground space-y-3">
            <p>
              Looking for a reliable pet sitter in {cityData.name}, CO? PawSitting provides professional, AI-enhanced pet sitting and farm animal care services throughout {cityData.name} and all of Northern Colorado. Whether you need someone to walk your dog, check on your cats, or manage your entire ranch while you're away, PawSitting has you covered.
            </p>
            <p>
              Unlike traditional pet sitting services that only handle dogs and cats, PawSitting specializes in all animal types — including horses, goats, peacocks, cattle, chickens, reptiles, and other exotic animals. Our Farm & Ranch tier is the first of its kind in Northern Colorado, providing the same professional, technology-enhanced care for farm animals that companion animals have always received.
            </p>
            <p>
              Every visit includes a detailed Pet Report Card with photos, health and mood logging, GPS walk tracking (for applicable services), and AI-generated insights about your pet's wellbeing. Our AI chat assistant is available 24/7 to answer questions about services, pricing, and availability — even when our sitter is at school.
            </p>
            <p>
              PawSitting serves all areas of {cityData.name}, including residential neighborhoods, rural properties, farms, ranches, and hobby farms. We also serve Wellington, Fort Collins, Loveland, Evans, Timnath, Berthoud, and all surrounding Northern Colorado communities.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Book Pet Sitting in {cityData.name}?
          </h2>
          <p className="text-muted-foreground mb-6">
            Schedule your first visit today and experience Northern Colorado's most comprehensive animal care service.
          </p>
          <Link href="/booking">
            <Button size="lg" className="gradient-purple text-white border-0 glow-purple gap-2">
              Book Now in {cityData.name} <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
