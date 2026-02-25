import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  Camera, Video, Clock, Heart, PawPrint, MapPin,
  Utensils, Activity, ArrowRight, Eye,
} from "lucide-react";

const demoFeed = [
  { id: 1, time: "2:45 PM", type: "photo", pet: "Buddy 🐕", content: "Buddy enjoying the afternoon sun in the backyard", icon: <Camera className="w-4 h-4" /> },
  { id: 2, time: "2:30 PM", type: "walk_start", pet: "Buddy 🐕", content: "Walk started — GPS tracking active", icon: <MapPin className="w-4 h-4" /> },
  { id: 3, time: "2:15 PM", type: "feeding", pet: "Buddy 🐕", content: "Afternoon feeding complete — ate full portion", icon: <Utensils className="w-4 h-4" /> },
  { id: 4, time: "1:00 PM", type: "health_check", pet: "Thunder 🐴", content: "Health check complete — all vitals normal, good energy", icon: <Activity className="w-4 h-4" /> },
  { id: 5, time: "12:30 PM", type: "photo", pet: "Thunder 🐴", content: "Thunder grazing peacefully in the north pasture", icon: <Camera className="w-4 h-4" /> },
  { id: 6, time: "12:00 PM", type: "feeding", pet: "Thunder 🐴", content: "Midday feeding — hay and grain distributed", icon: <Utensils className="w-4 h-4" /> },
  { id: 7, time: "11:30 AM", type: "note", pet: "Billy & Nanny 🐐", content: "Goats are in great spirits today. Both playful and eating well.", icon: <Heart className="w-4 h-4" /> },
  { id: 8, time: "11:00 AM", type: "photo", pet: "Billy & Nanny 🐐", content: "Billy climbing on the play structure, Nanny supervising", icon: <Camera className="w-4 h-4" /> },
  { id: 9, time: "10:30 AM", type: "video", pet: "Buddy 🐕", content: "Morning walk video — 15 second clip of Buddy at the park", icon: <Video className="w-4 h-4" /> },
  { id: 10, time: "9:00 AM", type: "feeding", pet: "All Animals", content: "Morning feeding rounds complete for all animals", icon: <Utensils className="w-4 h-4" /> },
];

const typeColors: Record<string, string> = {
  photo: "text-primary",
  video: "text-primary",
  walk_start: "text-nature-green",
  walk_end: "text-nature-green",
  feeding: "text-ranch-gold",
  health_check: "text-sky-blue",
  note: "text-muted-foreground",
};

export default function PetCam() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="py-12">
      <div className="container max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">
            Real-Time <span className="text-purple-glow">Pet Cam</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Check in on your pets anytime with our timestamped activity feed. Photos, videos, feeding updates, health checks, and GPS tracking — all in real time.
          </p>
        </div>

        {/* Live Status Banner */}
        <div className="glass-card p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-nature-green animate-pulse" />
            <span className="text-sm font-medium">Live Activity Feed</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Eye className="w-3.5 h-3.5" />
            <span>Updates every visit</span>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { icon: <Camera className="w-5 h-5" />, label: "Photo Updates" },
            { icon: <Video className="w-5 h-5" />, label: "Video Clips" },
            { icon: <MapPin className="w-5 h-5" />, label: "GPS Tracking" },
            { icon: <Activity className="w-5 h-5" />, label: "Health Checks" },
          ].map((f, i) => (
            <div key={i} className="glass-card p-3 text-center">
              <div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center text-white mx-auto mb-1.5">
                {f.icon}
              </div>
              <p className="text-xs font-medium">{f.label}</p>
            </div>
          ))}
        </div>

        {/* Activity Feed */}
        <div className="space-y-1">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" /> Today's Activity Feed
            <span className="text-xs text-muted-foreground font-normal">(Sample)</span>
          </h2>

          {demoFeed.map((item) => (
            <div key={item.id} className="glass-card p-4 flex items-start gap-4 hover:glow-purple-sm transition-all">
              <div className="text-xs text-muted-foreground w-16 flex-shrink-0 pt-0.5">
                {item.time}
              </div>
              <div className={`w-8 h-8 rounded-lg glass flex items-center justify-center flex-shrink-0 ${typeColors[item.type] || ""}`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-0.5">{item.pet}</p>
                <p className="text-sm">{item.content}</p>
                {(item.type === "photo" || item.type === "video") && (
                  <div className="mt-2 glass rounded-lg h-24 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      {item.type === "photo" ? <Camera className="w-5 h-5 mx-auto" /> : <Video className="w-5 h-5 mx-auto" />}
                      <p className="text-[10px] mt-1">{item.type === "photo" ? "Photo" : "Video"} attachment</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {!isAuthenticated && (
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">Sign in to view your pet's live activity feed.</p>
            <a href={getLoginUrl()}>
              <Button className="gradient-purple text-white border-0">Sign In to View Pet Cam</Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
