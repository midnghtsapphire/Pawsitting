import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Heart } from "lucide-react";
import { ANIMAL_CATEGORIES } from "@shared/pawsitting";

// Placeholder gallery data - in production these come from the database
const placeholderGallery = [
  { id: 1, category: "dogs", title: "Happy pup after a walk", animalName: "Buddy", description: "Golden retriever enjoying the NoCo sunshine after a 2-mile walk through Wellington trails." },
  { id: 2, category: "horses", title: "Morning barn check", animalName: "Thunder", description: "Checking on Thunder during morning feeding rounds at a Fort Collins ranch." },
  { id: 3, category: "cats", title: "Cozy afternoon", animalName: "Whiskers", description: "Whiskers enjoying some quality lap time during a drop-in visit in Loveland." },
  { id: 4, category: "goats", title: "Goat playtime", animalName: "Billy & Nanny", description: "The goat duo at a Timnath hobby farm getting their afternoon enrichment." },
  { id: 5, category: "peacocks", title: "Peacock patrol", animalName: "Jewel", description: "Jewel showing off during evening feeding at a Berthoud property." },
  { id: 6, category: "dogs", title: "Trail adventure", animalName: "Luna", description: "Luna the husky on a GPS-tracked walk through Horsetooth trails." },
  { id: 7, category: "livestock", title: "Cattle check", animalName: "The Herd", description: "Morning pasture check on a 40-acre Evans ranch. All cattle accounted for." },
  { id: 8, category: "exotic", title: "Reptile care", animalName: "Scales", description: "Bearded dragon habitat maintenance and feeding during a Fort Collins visit." },
  { id: 9, category: "farm", title: "Full farm rounds", animalName: "The Whole Gang", description: "Complete farm rounds at a Wellington property — chickens, goats, and horses all cared for." },
  { id: 10, category: "horses", title: "Evening turnout", animalName: "Starlight", description: "Starlight heading out to pasture after evening feeding and grooming." },
  { id: 11, category: "dogs", title: "Puppy playtime", animalName: "Max", description: "Max the lab puppy burning off energy during an afternoon play session." },
  { id: 12, category: "cats", title: "Window watching", animalName: "Shadow", description: "Shadow keeping watch from her favorite perch during a Timnath drop-in." },
];

const categoryEmojis: Record<string, string> = {};
ANIMAL_CATEGORIES.forEach((c) => { categoryEmojis[c.id] = c.emoji; });

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("all");
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

  const filtered = activeTab === "all" ? placeholderGallery : placeholderGallery.filter((g) => g.category === activeTab);

  const toggleLike = (id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="py-12">
      <div className="container">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-purple-glow">Photo</span> Gallery
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See our experience caring for all kinds of animals across Northern Colorado — from neighborhood dogs to ranch horses and everything in between.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-8">
            <TabsTrigger value="all" className="glass px-4 py-2 data-[state=active]:gradient-purple data-[state=active]:text-white">
              All ({placeholderGallery.length})
            </TabsTrigger>
            {ANIMAL_CATEGORIES.map((cat) => {
              const count = placeholderGallery.filter((g) => g.category === cat.id).length;
              if (count === 0) return null;
              return (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="glass px-4 py-2 data-[state=active]:gradient-purple data-[state=active]:text-white"
                >
                  {cat.emoji} {cat.label} ({count})
                </TabsTrigger>
              );
            })}
          </TabsList>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div key={item.id} className="glass-card overflow-hidden group">
                {/* Placeholder image area */}
                <div className="aspect-[4/3] bg-gradient-to-br from-purple-deep/30 to-purple-glow/10 flex items-center justify-center relative">
                  <div className="text-center">
                    <span className="text-5xl block mb-2">{categoryEmojis[item.category] || "🐾"}</span>
                    <Camera className="w-6 h-6 text-muted-foreground mx-auto" />
                    <p className="text-xs text-muted-foreground mt-1">Photo: {item.animalName}</p>
                  </div>
                  <button
                    onClick={() => toggleLike(item.id)}
                    className="absolute top-3 right-3 p-2 rounded-full glass opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className={`w-4 h-4 ${likedIds.has(item.id) ? "fill-primary text-primary" : ""}`} />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{categoryEmojis[item.category]}</span>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Tabs>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No photos in this category yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
