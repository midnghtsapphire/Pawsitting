import { useState } from "react";
import { Accessibility, X, Ear, Hand, BookOpen, Brain, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAccessibility, type AccessibilityMode } from "@/contexts/AccessibilityContext";

const modes: { id: AccessibilityMode; label: string; description: string; icon: React.ReactNode }[] = [
  {
    id: "deaf",
    label: "Deaf-Friendly",
    description: "Visual indicators for audio content, captions emphasis",
    icon: <Ear className="w-4 h-4" />,
  },
  {
    id: "no-arms",
    label: "No-Arms Navigation",
    description: "Larger click targets, enhanced keyboard/voice navigation",
    icon: <Hand className="w-4 h-4" />,
  },
  {
    id: "dyslexic",
    label: "Dyslexic-Friendly",
    description: "OpenDyslexic font, increased spacing and line height",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    id: "neuro",
    label: "Neuro-Friendly",
    description: "Reduced motion, no animations, calm interface",
    icon: <Brain className="w-4 h-4" />,
  },
  {
    id: "no-blue-light",
    label: "No Blue Light",
    description: "Warm filter to reduce blue light exposure",
    icon: <Sun className="w-4 h-4" />,
  },
];

export default function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const { modes: activeModes, toggleMode, resetAll, isAnyActive } = useAccessibility();

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-20 right-4 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg ${
          isAnyActive ? "gradient-purple glow-purple" : "glass-strong hover:glow-purple-sm"
        }`}
        aria-label="Accessibility settings"
      >
        <Accessibility className="w-5 h-5 text-white" />
        {isAnyActive && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-ranch-gold text-[10px] font-bold flex items-center justify-center text-black">
            {Object.values(activeModes).filter(Boolean).length}
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-36 right-4 z-50 w-80 glass-strong rounded-xl p-4 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Accessibility Modes</h3>
            <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-accent/50">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {modes.map((mode) => (
              <div key={mode.id} className="flex items-start gap-3">
                <div className="mt-0.5 text-primary">{mode.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium cursor-pointer" htmlFor={`a11y-${mode.id}`}>
                      {mode.label}
                    </label>
                    <Switch
                      id={`a11y-${mode.id}`}
                      checked={activeModes[mode.id]}
                      onCheckedChange={() => toggleMode(mode.id)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{mode.description}</p>
                </div>
              </div>
            ))}
          </div>

          {isAnyActive && (
            <Button variant="ghost" size="sm" onClick={resetAll} className="w-full mt-3 text-xs">
              Reset All
            </Button>
          )}
        </div>
      )}
    </>
  );
}
