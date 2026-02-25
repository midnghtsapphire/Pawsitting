import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import {
  ClipboardCheck, Heart, Brain, MapPin, Camera, Clock,
  PawPrint, Star, ArrowRight, Smile, Frown, Zap, Moon, Activity,
} from "lucide-react";

const moodIcons: Record<string, React.ReactNode> = {
  happy: <Smile className="w-5 h-5 text-nature-green" />,
  calm: <Moon className="w-5 h-5 text-sky-blue" />,
  playful: <Zap className="w-5 h-5 text-ranch-gold" />,
  anxious: <Frown className="w-5 h-5 text-destructive" />,
  tired: <Moon className="w-5 h-5 text-muted-foreground" />,
  energetic: <Activity className="w-5 h-5 text-primary" />,
};

// Demo report cards
const demoReports = [
  {
    id: 1,
    petName: "Buddy",
    species: "dog",
    emoji: "🐕",
    date: "Feb 24, 2026",
    mood: "happy",
    healthStatus: "excellent",
    walkCompleted: true,
    walkDuration: 45,
    walkDistance: 2.3,
    feedingCompleted: true,
    activities: "Morning walk through Horsetooth trails, played fetch in the yard, belly rubs and treats.",
    aiInsights: "Buddy showed excellent energy levels today with consistent enthusiasm during the walk. His appetite was strong and he responded well to commands. Mood pattern over the last 3 visits shows consistently happy and energetic behavior — a great sign of overall wellbeing.",
    photos: 3,
  },
  {
    id: 2,
    petName: "Thunder",
    species: "horse",
    emoji: "🐴",
    date: "Feb 23, 2026",
    mood: "calm",
    healthStatus: "good",
    walkCompleted: false,
    feedingCompleted: true,
    activities: "Morning feeding, stall cleaning, turnout to pasture, evening feeding and blanket change.",
    aiInsights: "Thunder was calm and cooperative during all routines today. Coat condition looks healthy and hooves appear in good shape. Recommend scheduling a farrier visit within the next 2-3 weeks based on hoof growth patterns observed.",
    photos: 5,
  },
  {
    id: 3,
    petName: "Billy & Nanny",
    species: "goat",
    emoji: "🐐",
    date: "Feb 22, 2026",
    mood: "playful",
    healthStatus: "excellent",
    walkCompleted: false,
    feedingCompleted: true,
    activities: "Feeding, pen cleaning, health check, enrichment toys, fencing inspection.",
    aiInsights: "Both goats are in excellent spirits with healthy appetites. Billy's playfulness is a positive indicator. Pen area is clean and secure. No signs of parasites or health concerns. Fencing integrity is good — no weak spots detected during inspection.",
    photos: 4,
  },
];

export default function ReportCards() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="py-12">
      <div className="container max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">
            Pet <span className="text-purple-glow">Report Cards</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            After every visit, you receive a detailed report card with photos, health and mood logging, GPS walk data, and AI-generated insights about your pet's wellbeing.
          </p>
        </div>

        {/* Feature Overview */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { icon: <Camera className="w-5 h-5" />, label: "Photo Updates" },
            { icon: <Heart className="w-5 h-5" />, label: "Health & Mood" },
            { icon: <MapPin className="w-5 h-5" />, label: "GPS Tracking" },
            { icon: <Brain className="w-5 h-5" />, label: "AI Insights" },
          ].map((f, i) => (
            <div key={i} className="glass-card p-4 text-center">
              <div className="w-10 h-10 rounded-lg gradient-purple flex items-center justify-center text-white mx-auto mb-2">
                {f.icon}
              </div>
              <p className="text-sm font-medium">{f.label}</p>
            </div>
          ))}
        </div>

        {/* Report Cards */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">
            {isAuthenticated ? "Your Report Cards" : "Sample Report Cards"}
          </h2>

          {demoReports.map((report) => (
            <div key={report.id} className="glass-card p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{report.emoji}</span>
                  <div>
                    <h3 className="font-bold text-lg">{report.petName}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {report.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {moodIcons[report.mood]}
                  <span className="text-sm capitalize">{report.mood}</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="glass p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground">Health</p>
                  <p className="font-semibold text-sm capitalize text-nature-green">{report.healthStatus}</p>
                </div>
                <div className="glass p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground">Feeding</p>
                  <p className="font-semibold text-sm">{report.feedingCompleted ? "✅ Complete" : "—"}</p>
                </div>
                {report.walkCompleted && (
                  <>
                    <div className="glass p-3 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Walk</p>
                      <p className="font-semibold text-sm">{report.walkDuration} min</p>
                    </div>
                    <div className="glass p-3 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Distance</p>
                      <p className="font-semibold text-sm">{report.walkDistance} mi</p>
                    </div>
                  </>
                )}
                <div className="glass p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground">Photos</p>
                  <p className="font-semibold text-sm">{report.photos} 📸</p>
                </div>
              </div>

              {/* Activities */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-1 flex items-center gap-1">
                  <ClipboardCheck className="w-4 h-4 text-primary" /> Activities
                </h4>
                <p className="text-sm text-muted-foreground">{report.activities}</p>
              </div>

              {/* GPS Track Placeholder */}
              {report.walkCompleted && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-primary" /> GPS Walk Track
                  </h4>
                  <div className="glass rounded-xl h-32 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="w-6 h-6 mx-auto mb-1" />
                      <p className="text-xs">Walk route map — {report.walkDistance} miles tracked</p>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Insights */}
              <div className="glass p-4 rounded-xl border-l-2 border-primary">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                  <Brain className="w-4 h-4 text-primary" /> AI Insights
                </h4>
                <p className="text-sm text-muted-foreground">{report.aiInsights}</p>
              </div>
            </div>
          ))}
        </div>

        {!isAuthenticated && (
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">Sign in to view your pet's report cards.</p>
            <a href={getLoginUrl()}>
              <Button className="gradient-purple text-white border-0">Sign In</Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
