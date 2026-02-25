import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PawPrint, Star, ArrowRight, Tractor, Shield, Clock, Camera, Brain,
  MapPin, CheckCircle, Dog, Cat, Bird, Rabbit,
} from "lucide-react";
import { ANIMAL_CATEGORIES, SERVICE_TIERS } from "@shared/pawsitting";
import SEOHead from "@/components/SEOHead";

const animalDetails: Record<string, { title: string; description: string; services: string[]; priceRange: string }> = {
  dogs: {
    title: "Dog Sitting & Walking",
    description: "Professional dog care including walks, feeding, playtime, and overnight stays. GPS-tracked walks with real-time updates.",
    services: ["Daily walks", "Drop-in visits", "Overnight stays", "Puppy care", "Medication administration", "GPS walk tracking"],
    priceRange: "$20-100/visit",
  },
  cats: {
    title: "Cat Sitting",
    description: "Gentle, attentive cat care in your home. Litter box maintenance, feeding, playtime, and health monitoring.",
    services: ["Drop-in visits", "Feeding & water", "Litter box care", "Playtime & enrichment", "Medication administration", "Photo updates"],
    priceRange: "$20-60/visit",
  },
  horses: {
    title: "Horse Care & Barn Sitting",
    description: "Expert horse care including feeding, turnout, stall cleaning, and health monitoring. Farm & Ranch tier specialty.",
    services: ["Feeding & watering", "Turnout & stall care", "Blanket changes", "Health checks", "Pasture inspection", "Emergency vet coordination"],
    priceRange: "$75-200/visit",
  },
  goats: {
    title: "Goat Care",
    description: "Experienced goat care including feeding, pen maintenance, health checks, and herd monitoring.",
    services: ["Feeding & supplements", "Pen & shelter checks", "Health monitoring", "Hoof inspection", "Fencing checks", "Kid (baby goat) care"],
    priceRange: "$50-150/visit",
  },
  peacocks: {
    title: "Peacock & Poultry Care",
    description: "Specialized care for peacocks, chickens, ducks, and other poultry. Coop management and health monitoring.",
    services: ["Feeding & watering", "Coop management", "Egg collection", "Health checks", "Predator protection checks", "Free-range monitoring"],
    priceRange: "$40-120/visit",
  },
  livestock: {
    title: "Livestock Care",
    description: "Professional livestock management including cattle, sheep, pigs, and more. Full farm & ranch care available.",
    services: ["Feeding & watering", "Pasture rotation", "Health monitoring", "Fencing checks", "Barn maintenance", "Emergency vet coordination"],
    priceRange: "$75-200+/visit",
  },
  exotic: {
    title: "Exotic Animal Care",
    description: "Specialized care for reptiles, amphibians, small mammals, and other exotic pets. Species-specific expertise.",
    services: ["Species-specific feeding", "Habitat maintenance", "Temperature monitoring", "Health checks", "Enrichment activities", "Specialized handling"],
    priceRange: "$35-100/visit",
  },
  farm: {
    title: "Farm & Ranch Full Service",
    description: "Complete farm and ranch animal care — our Blue Ocean specialty. No other pet sitting service in NoCo offers this level of farm animal expertise.",
    services: ["Multi-species care", "Barn & pasture management", "Feeding routines", "Health monitoring", "Property checks", "AI-powered health insights"],
    priceRange: "$100-200+/visit",
  },
};

export default function Services() {
  const params = useParams<{ category?: string }>();
  const activeCategory = params.category || "all";

  return (
    <div className="py-12">
      <SEOHead title="Pet & Farm Animal Sitting Services" description="Professional pet sitting services for dogs, cats, horses, goats, peacocks, livestock, and exotic animals in Northern Colorado. Farm & Ranch tier available." path="/services" />
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Our <span className="text-purple-glow">Services</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From companion animals to farm & ranch livestock — PawSitting provides professional, AI-enhanced care for every animal in Northern Colorado.
          </p>
        </div>

        {/* Animal Category Tabs */}
        <Tabs defaultValue={activeCategory} className="mb-16">
          <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-8">
            <TabsTrigger value="all" className="glass px-4 py-2 data-[state=active]:gradient-purple data-[state=active]:text-white">
              All Animals
            </TabsTrigger>
            {ANIMAL_CATEGORIES.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="glass px-4 py-2 data-[state=active]:gradient-purple data-[state=active]:text-white"
              >
                {cat.emoji} {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ANIMAL_CATEGORIES.map((cat) => {
                const detail = animalDetails[cat.id];
                return (
                  <div key={cat.id} className="glass-card p-6 flex flex-col">
                    <span className="text-4xl mb-4">{cat.emoji}</span>
                    <h3 className="font-bold text-lg mb-2">{detail?.title || cat.label}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{detail?.description}</p>
                    <p className="text-lg font-bold text-primary mb-4">{detail?.priceRange}</p>
                    <Link href={`/booking?animal=${cat.id}`}>
                      <Button className="w-full gradient-purple text-white border-0">Book Now</Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {ANIMAL_CATEGORIES.map((cat) => {
            const detail = animalDetails[cat.id];
            return (
              <TabsContent key={cat.id} value={cat.id}>
                <div className="glass-card p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <span className="text-6xl mb-6 block">{cat.emoji}</span>
                      <h2 className="text-3xl font-bold mb-4">{detail?.title}</h2>
                      <p className="text-muted-foreground mb-6">{detail?.description}</p>
                      <p className="text-2xl font-bold text-primary mb-6">{detail?.priceRange}</p>
                      <Link href={`/booking?animal=${cat.id}`}>
                        <Button size="lg" className="gradient-purple text-white border-0 gap-2">
                          Book {cat.label} Care <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4">What's Included</h3>
                      <ul className="space-y-3">
                        {detail?.services.map((s, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm">
                            <CheckCircle className="w-4 h-4 text-nature-green flex-shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 p-4 glass rounded-xl">
                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                          <Brain className="w-4 h-4 text-primary" /> AI-Enhanced Features
                        </h4>
                        <ul className="space-y-1.5 text-xs text-muted-foreground">
                          <li>• Pet report card after every visit</li>
                          <li>• AI health & mood insights</li>
                          <li>• Real-time photo updates</li>
                          <li>• GPS tracking (where applicable)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Service Tiers */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Service Tiers & Pricing</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICE_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`glass-card p-6 flex flex-col ${
                  tier.id === "farm_ranch" ? "glow-purple ring-1 ring-primary/30" : ""
                }`}
              >
                {tier.id === "farm_ranch" && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-ranch-gold/20 text-ranch-gold text-xs font-semibold mb-3 self-start">
                    <Star className="w-3 h-3" /> Blue Ocean Differentiator
                  </div>
                )}
                <h3 className="text-lg font-bold mb-1">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{tier.description}</p>
                <p className="text-2xl font-bold text-primary mb-4">{tier.priceRange}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <PawPrint className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/booking">
                  <Button
                    variant={tier.id === "farm_ranch" ? "default" : "outline"}
                    className={`w-full ${tier.id === "farm_ranch" ? "gradient-purple-gold text-white border-0" : "bg-transparent"}`}
                  >
                    Book Now
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="glass-card p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold mb-8">Why Choose PawSitting?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Tractor className="w-6 h-6" />, title: "Farm & Ranch Expertise", desc: "The only NoCo pet sitter handling livestock and exotic animals" },
              { icon: <Brain className="w-6 h-6" />, title: "AI-Powered Service", desc: "24/7 AI assistant, smart health insights, automated report cards" },
              { icon: <Camera className="w-6 h-6" />, title: "Real-Time Updates", desc: "Pet cam, GPS tracking, and photo updates during every visit" },
              { icon: <Shield className="w-6 h-6" />, title: "Trusted & Reliable", desc: "Insured, bonded, and deeply passionate about animal welfare" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center text-white mx-auto mb-3">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
