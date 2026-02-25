import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import {
  CalendarDays, PawPrint, ClipboardCheck, Camera, Users,
  DollarSign, TrendingUp, Star, ArrowRight, Settings,
  Bell, BarChart3, Clock,
} from "lucide-react";

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="py-20">
        <div className="container max-w-lg text-center">
          <div className="glass-card p-8">
            <PawPrint className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-3">Client Dashboard</h1>
            <p className="text-muted-foreground mb-6">Sign in to manage your bookings, view report cards, and access pet cam.</p>
            <a href={getLoginUrl()}>
              <Button className="gradient-purple text-white border-0">Sign In</Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  const isAdmin = user?.role === "admin";

  return (
    <div className="py-8">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, <span className="text-purple-glow">{user?.name || "Friend"}</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              {isAdmin ? "Admin Dashboard — Manage PawSitting" : "Your PawSitting Dashboard"}
            </p>
          </div>
          {isAdmin && (
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded-full gradient-purple text-white">Admin</span>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <CalendarDays className="w-5 h-5" />, label: "Upcoming Bookings", value: "0", color: "text-primary" },
            { icon: <ClipboardCheck className="w-5 h-5" />, label: "Report Cards", value: "0", color: "text-nature-green" },
            { icon: <PawPrint className="w-5 h-5" />, label: "Pets Registered", value: "0", color: "text-ranch-gold" },
            { icon: <Star className="w-5 h-5" />, label: "Visits Completed", value: "0", color: "text-sky-blue" },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-4">
              <div className={`${stat.color} mb-2`}>{stat.icon}</div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Link href="/booking">
            <div className="glass-card p-5 hover:glow-purple-sm transition-all cursor-pointer group">
              <CalendarDays className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Book a Visit</h3>
              <p className="text-xs text-muted-foreground">Schedule pet sitting or farm & ranch care</p>
            </div>
          </Link>
          <Link href="/report-cards">
            <div className="glass-card p-5 hover:glow-purple-sm transition-all cursor-pointer group">
              <ClipboardCheck className="w-6 h-6 text-nature-green mb-3" />
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Report Cards</h3>
              <p className="text-xs text-muted-foreground">View visit reports and AI insights</p>
            </div>
          </Link>
          <Link href="/pet-cam">
            <div className="glass-card p-5 hover:glow-purple-sm transition-all cursor-pointer group">
              <Camera className="w-6 h-6 text-ranch-gold mb-3" />
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Pet Cam</h3>
              <p className="text-xs text-muted-foreground">Real-time activity feed and updates</p>
            </div>
          </Link>
        </div>

        {/* Admin Section */}
        {isAdmin && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" /> Admin Tools
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: <Users className="w-5 h-5" />, label: "Manage Clients", desc: "View and manage client accounts" },
                { icon: <CalendarDays className="w-5 h-5" />, label: "All Bookings", desc: "Review and confirm bookings" },
                { icon: <DollarSign className="w-5 h-5" />, label: "Payments", desc: "Track payments and revenue" },
                { icon: <BarChart3 className="w-5 h-5" />, label: "Analytics", desc: "Business performance metrics" },
              ].map((tool, i) => (
                <div key={i} className="glass-card p-4 hover:glow-purple-sm transition-all cursor-pointer" onClick={() => { import("sonner").then(m => m.toast.info("Feature coming soon")); }}>
                  <div className="text-primary mb-2">{tool.icon}</div>
                  <h3 className="font-semibold text-sm mb-0.5">{tool.label}</h3>
                  <p className="text-xs text-muted-foreground">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" /> Recent Activity
          </h2>
          <div className="glass-card p-8 text-center">
            <PawPrint className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground mb-4">No recent activity yet. Book your first visit to get started!</p>
            <Link href="/booking">
              <Button className="gradient-purple text-white border-0 gap-2">
                Book a Visit <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
