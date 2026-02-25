import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  PawPrint, Star, MapPin, Shield, Smartphone, Heart, Camera,
  ClipboardCheck, Brain, Tractor, Dog, Cat, Bird, Rabbit,
  ChevronRight, Sparkles, Phone, MessageCircle, ArrowRight,
} from "lucide-react";
import { ANIMAL_CATEGORIES, SERVICE_TIERS, SERVICE_CITIES } from "@shared/pawsitting";
import SEOHead from "@/components/SEOHead";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const iconMap: Record<string, React.ReactNode> = {
  Dog: <Dog className="w-6 h-6" />,
  Cat: <Cat className="w-6 h-6" />,
  Horse: <PawPrint className="w-6 h-6" />,
  Goat: <PawPrint className="w-6 h-6" />,
  Bird: <Bird className="w-6 h-6" />,
  Beef: <PawPrint className="w-6 h-6" />,
  Rabbit: <Rabbit className="w-6 h-6" />,
  Tractor: <Tractor className="w-6 h-6" />,
};

export default function Home() {
  return (
    <div className="overflow-hidden">
      <SEOHead />
      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-glow/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-soft/10 blur-[100px]" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-ranch-gold/5 blur-[80px]" />
        </div>

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-medium text-primary mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Northern Colorado's Only Farm & Ranch Pet Sitter
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-foreground">Every Animal</span>
                <br />
                <span className="text-foreground">Deserves </span>
                <span className="text-purple-glow text-glow">Premium Care</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-8 max-w-lg">
                From your family dog to your ranch horses — PawSitting provides AI-enhanced, professional animal care across all of Northern Colorado. The only pet sitter that handles livestock and exotic animals.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <Link href="/booking">
                  <Button size="lg" className="gradient-purple text-white border-0 glow-purple font-semibold gap-2">
                    Book a Visit <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                    View Services <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary" /> All NoCo Areas
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-nature-green" /> Insured & Bonded
                </span>
                <span className="flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-ranch-gold" /> AI-Powered 24/7
                </span>
              </motion.div>
            </motion.div>

            {/* Hero Visual - Animal Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="grid grid-cols-3 gap-3">
                {["🐕", "🐴", "🐈", "🐐", "🦚", "🐄", "🦎", "🐓", "🐾"].map((emoji, i) => (
                  <div
                    key={i}
                    className={`glass-card p-6 flex items-center justify-center text-4xl transition-transform hover:scale-105 ${
                      i === 4 ? "glow-purple" : ""
                    }`}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Animal Categories ─── */}
      <section className="py-20">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-4">
              We Care for <span className="text-purple-glow">Every</span> Animal
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-2xl mx-auto">
              Not just dogs and cats. PawSitting is the only pet sitting service in Northern Colorado that specializes in farm animals, livestock, and exotic species.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {ANIMAL_CATEGORIES.map((cat) => (
              <motion.div key={cat.id} variants={fadeUp}>
                <Link href={`/services/${cat.id}`}>
                  <div className="glass-card p-6 text-center hover:glow-purple-sm transition-all group cursor-pointer">
                    <span className="text-3xl mb-3 block">{cat.emoji}</span>
                    <p className="font-medium text-sm group-hover:text-primary transition-colors">{cat.label}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Blue Ocean: Farm & Ranch ─── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-deep/20 to-transparent" />
        </div>
        <div className="container relative z-10">
          <div className="glass-card p-8 md:p-12 glow-purple">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ranch-gold/20 text-ranch-gold text-xs font-semibold mb-4">
                  <Tractor className="w-3.5 h-3.5" /> BLUE OCEAN — No Competitor Offers This
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Farm & Ranch <span className="text-ranch-gold">Premium Care</span>
                </h2>
                <p className="text-muted-foreground mb-6">
                  The pet sitting industry ignores farm and ranch animals. PawSitting fills that gap. Horses, goats, peacocks, cattle, chickens, and exotic animals — we provide the same professional, tech-enhanced care that companion animals get.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Pasture & barn checks with photo documentation",
                    "Feeding routines for large & exotic animals",
                    "Health monitoring with AI-powered insights",
                    "Emergency vet coordination",
                    "GPS-tracked property rounds",
                    "Comprehensive report cards after every visit",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Star className="w-4 h-4 text-ranch-gold mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/booking">
                  <Button className="gradient-purple-gold text-white border-0 font-semibold gap-2">
                    Book Farm & Ranch Care <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["🐴 Horses", "🐐 Goats", "🦚 Peacocks", "🐄 Cattle"].map((item, i) => (
                  <div key={i} className="glass p-6 rounded-xl text-center">
                    <span className="text-3xl block mb-2">{item.split(" ")[0]}</span>
                    <p className="text-sm font-medium">{item.split(" ")[1]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Service Tiers ─── */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Service Tiers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From quick drop-in visits to full farm & ranch care — choose the tier that fits your animals' needs.
            </p>
          </div>

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
                    <Star className="w-3 h-3" /> Blue Ocean
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
      </section>

      {/* ─── Tech Features ─── */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              AI-Enhanced <span className="text-purple-glow">Pet Care</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The same 24/7 customer service that billion-dollar companies have — powered by AI, delivered by a teen entrepreneur who genuinely loves animals.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <ClipboardCheck className="w-6 h-6" />,
                title: "Pet Report Cards",
                desc: "Detailed reports after every visit with photos, health logs, mood tracking, and AI-generated insights.",
              },
              {
                icon: <Camera className="w-6 h-6" />,
                title: "Real-Time Pet Cam",
                desc: "Photo and video updates with a timestamped activity feed so you can check in on your pets anytime.",
              },
              {
                icon: <MapPin className="w-6 h-6" />,
                title: "GPS Walk Tracking",
                desc: "See exactly where your pet walked with real-time GPS tracking and route visualization.",
              },
              {
                icon: <Brain className="w-6 h-6" />,
                title: "AI Health Insights",
                desc: "AI analyzes your pet's mood, activity, and health patterns to provide actionable care recommendations.",
              },
              {
                icon: <MessageCircle className="w-6 h-6" />,
                title: "AI Chat Assistant",
                desc: "Get instant answers about services, pricing, and availability — 24/7, even when Reese is at school.",
              },
              {
                icon: <Phone className="w-6 h-6" />,
                title: "AI Phone Answering",
                desc: "Never miss a call. Our AI phone system handles inquiries and booking requests around the clock.",
              },
            ].map((feature, i) => (
              <div key={i} className="glass-card p-6 group hover:glow-purple-sm transition-all">
                <div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Service Areas ─── */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Serving All of <span className="text-purple-glow">Northern Colorado</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Wellington, Fort Collins, Loveland, Evans, Timnath, Berthoud, and all surrounding NoCo areas.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICE_CITIES.filter((c) => c.id !== "noco-farm").map((city) => (
              <Link key={city.id} href={`/pet-sitting-${city.id}-co`}>
                <div className="glass-card p-5 hover:glow-purple-sm transition-all cursor-pointer group">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {city.name}, {city.state}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground italic mb-2">{city.tagline}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {city.features.map((f, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-accent/50 text-accent-foreground">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-20">
        <div className="container">
          <div className="glass-card p-8 md:p-12 text-center glow-purple relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-purple-glow/10 blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-ranch-gold/10 blur-[60px]" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Ready to Give Your Animals the Best Care?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Whether it's a quick drop-in for your cat or a week of farm & ranch care for your horses and goats — PawSitting has you covered.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/booking">
                  <Button size="lg" className="gradient-purple text-white border-0 glow-purple font-semibold gap-2">
                    Book Your First Visit <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="bg-transparent gap-2">
                    <Heart className="w-4 h-4" /> Our Mission
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
