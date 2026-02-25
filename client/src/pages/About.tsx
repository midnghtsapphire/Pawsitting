import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Heart, Sparkles, Brain, Shield, MapPin, Star, Tractor,
  ArrowRight, MessageCircle, Phone, Camera, ClipboardCheck,
  Lightbulb, Users, Globe, Zap,
} from "lucide-react";

export default function About() {
  return (
    <div className="py-12">
      <div className="container max-w-4xl">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-medium text-primary mb-6">
            <Heart className="w-3.5 h-3.5" /> AI for Good
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Meet <span className="text-purple-glow text-glow">Reese</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A teen entrepreneur in Northern Colorado using AI to build a pet sitting business that cares for every animal — from family dogs to ranch horses.
          </p>
        </div>

        {/* Story */}
        <div className="glass-card p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" /> The Story
          </h2>
          <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground">
            <p>
              Growing up on a property with horses, goats, peacocks, and dogs in Northern Colorado, I learned early that every animal deserves the same level of care and attention — whether it's a golden retriever or a quarter horse.
            </p>
            <p>
              When I started pet sitting for neighbors, I noticed something: every pet sitting app and service only handled dogs and cats. Nobody was helping families with farm animals, livestock, or exotic pets. If you had horses and went on vacation, you were on your own.
            </p>
            <p>
              That's when PawSitting was born. I built this business to fill that gap — to be the first pet sitting service in Northern Colorado (and maybe anywhere) that treats farm and ranch animals with the same professional, tech-enhanced care that companion animals get.
            </p>
            <p>
              And because I'm a teenager who goes to school during the day, I use AI to make sure no customer ever waits for a response. Our AI chat assistant and phone answering system means PawSitting has the same 24/7 customer service that billion-dollar companies have — powered by technology, delivered with genuine love for animals.
            </p>
          </div>
        </div>

        {/* AI for Good Mission */}
        <div className="glass-card p-8 md:p-12 mb-12 glow-purple">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" /> AI for Good Philosophy
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 text-muted-foreground">
              <p>
                PawSitting proves that AI isn't just for big tech companies. It's a tool that can help a kid entrepreneur compete with established businesses, provide better service, and build something meaningful.
              </p>
              <p>
                Every feature in this app — from the AI chat assistant to the smart health insights to the automated report cards — exists because AI makes it possible for one person to deliver enterprise-level service.
              </p>
              <p>
                This is what "AI for good" looks like: not replacing humans, but empowering a young person to build a real business that helps real animals and real families.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: <MessageCircle className="w-5 h-5" />, title: "AI Chat Assistant", desc: "24/7 customer service even when I'm at school" },
                { icon: <Phone className="w-5 h-5" />, title: "AI Phone Answering", desc: "Never miss a call from a potential client" },
                { icon: <Brain className="w-5 h-5" />, title: "Smart Health Insights", desc: "AI analyzes pet health patterns for better care" },
                { icon: <ClipboardCheck className="w-5 h-5" />, title: "Automated Report Cards", desc: "Professional reports generated after every visit" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg gradient-purple flex items-center justify-center text-white flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blue Ocean */}
        <div className="glass-card p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Tractor className="w-6 h-6 text-ranch-gold" /> The Blue Ocean Differentiator
          </h2>
          <div className="space-y-4 text-muted-foreground mb-8">
            <p>
              In business strategy, a "Blue Ocean" is an uncontested market space where you create new demand instead of competing in existing markets. The pet sitting industry is a "Red Ocean" — thousands of services all doing the same thing: dogs and cats.
            </p>
            <p>
              PawSitting's Blue Ocean is <strong className="text-foreground">Farm & Ranch animal care</strong>. No other pet sitting app or service handles horses, goats, peacocks, cattle, chickens, or exotic animals. We created a new category.
            </p>
            <p>
              For families in Northern Colorado with both companion animals and farm animals, PawSitting is the only option that handles everything under one roof — with the same technology, professionalism, and care.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { emoji: "🐴", label: "Horses" },
              { emoji: "🐐", label: "Goats" },
              { emoji: "🦚", label: "Peacocks" },
              { emoji: "🐄", label: "Cattle" },
            ].map((a, i) => (
              <div key={i} className="glass p-4 rounded-xl text-center">
                <span className="text-3xl block mb-1">{a.emoji}</span>
                <p className="text-sm font-medium">{a.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {[
            { icon: <Heart className="w-6 h-6" />, title: "Genuine Animal Love", desc: "Every animal gets treated like family. Period." },
            { icon: <Shield className="w-6 h-6" />, title: "Trust & Reliability", desc: "Insured, bonded, and accountable for every visit." },
            { icon: <Lightbulb className="w-6 h-6" />, title: "Innovation", desc: "Using technology to provide better care, not replace it." },
            { icon: <Users className="w-6 h-6" />, title: "Community", desc: "Serving NoCo families and building local trust." },
          ].map((value, i) => (
            <div key={i} className="glass-card p-6">
              <div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center text-white mb-4">
                {value.icon}
              </div>
              <h3 className="font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Experience the Difference?</h2>
          <p className="text-muted-foreground mb-6">
            Book your first visit and see why NoCo families trust PawSitting with all their animals.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/booking">
              <Button size="lg" className="gradient-purple text-white border-0 glow-purple gap-2">
                Book a Visit <ArrowRight className="w-4 h-4" />
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
    </div>
  );
}
