import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { ANIMAL_CATEGORIES, SERVICE_TIERS } from "@shared/pawsitting";
import { CalendarDays, PawPrint, CreditCard, ArrowRight, CheckCircle, Star, Tractor } from "lucide-react";

export default function Booking() {
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedDate] = useState<Date | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [animalType, setAnimalType] = useState("");
  const [tier, setTier] = useState("");
  const [petName, setPetName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [instructions, setInstructions] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const createBooking = trpc.bookings.create.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Booking request submitted! We'll confirm shortly.");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to submit booking. Please try again.");
    },
  });

  const isFarmAnimal = ["horses", "goats", "peacocks", "livestock", "exotic", "farm"].includes(animalType);

  const selectedTierData = useMemo(
    () => SERVICE_TIERS.find((t) => t.id === tier),
    [tier]
  );

  const handleSubmit = () => {
    if (!date || !animalType || !tier || !address || !city) {
      toast.error("Please fill in all required fields.");
      return;
    }
    createBooking.mutate({
      scheduledDate: date.getTime(),
      animalType,
      tier,
      petName,
      address,
      city,
      specialInstructions: instructions,
    });
  };

  if (submitted) {
    return (
      <div className="py-20">
        <div className="container max-w-lg">
          <div className="glass-card p-8 text-center">
            <div className="w-16 h-16 rounded-full gradient-purple flex items-center justify-center mx-auto mb-6 glow-purple">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Booking Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Your booking request has been received. Reese will review and confirm your appointment shortly. You'll receive a notification once it's confirmed.
            </p>
            <Button onClick={() => { setSubmitted(false); setStep(1); }} variant="outline" className="bg-transparent">
              Book Another Visit
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">
            Book a <span className="text-purple-glow">Visit</span>
          </h1>
          <p className="text-muted-foreground">
            Schedule pet sitting or farm & ranch care in just a few steps.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[
            { num: 1, label: "Animal & Service" },
            { num: 2, label: "Date & Location" },
            { num: 3, label: "Review & Book" },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= s.num ? "gradient-purple text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {s.num}
              </div>
              <span className={`text-sm hidden sm:inline ${step >= s.num ? "text-foreground" : "text-muted-foreground"}`}>
                {s.label}
              </span>
              {s.num < 3 && <div className="w-8 h-px bg-border" />}
            </div>
          ))}
        </div>

        {!isAuthenticated ? (
          <div className="glass-card p-8 text-center">
            <PawPrint className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-3">Sign In to Book</h2>
            <p className="text-muted-foreground mb-6">Create an account or sign in to schedule your pet sitting visit.</p>
            <a href={getLoginUrl()}>
              <Button className="gradient-purple text-white border-0">Sign In to Continue</Button>
            </a>
          </div>
        ) : (
          <div className="glass-card p-6 md:p-8">
            {/* Step 1: Animal & Service */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <PawPrint className="w-5 h-5 text-primary" /> Select Animal & Service
                </h2>

                <div>
                  <Label className="mb-3 block">What type of animal?</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {ANIMAL_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setAnimalType(cat.id)}
                        className={`p-4 rounded-xl text-center transition-all ${
                          animalType === cat.id
                            ? "gradient-purple text-white glow-purple-sm"
                            : "glass hover:bg-accent/30"
                        }`}
                      >
                        <span className="text-2xl block mb-1">{cat.emoji}</span>
                        <span className="text-xs font-medium">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {animalType && (
                  <div>
                    <Label className="mb-3 block">Service Tier</Label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {SERVICE_TIERS.filter((t) =>
                        isFarmAnimal ? true : t.id !== "farm_ranch"
                      ).map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTier(t.id)}
                          className={`p-4 rounded-xl text-left transition-all ${
                            tier === t.id
                              ? "gradient-purple text-white glow-purple-sm"
                              : "glass hover:bg-accent/30"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {t.id === "farm_ranch" && <Tractor className="w-4 h-4" />}
                            <span className="font-semibold text-sm">{t.name}</span>
                            {t.id === "farm_ranch" && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20">Blue Ocean</span>
                            )}
                          </div>
                          <p className={`text-xs ${tier === t.id ? "text-white/80" : "text-muted-foreground"}`}>
                            {t.priceRange}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {animalType && (
                  <div>
                    <Label htmlFor="petName">Pet/Animal Name (optional)</Label>
                    <input
                      id="petName"
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                      placeholder="e.g., Buddy, Thunder, Billy..."
                      className="w-full mt-2 bg-secondary/50 border border-border/30 rounded-lg px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!animalType || !tier}
                    className="gradient-purple text-white border-0 gap-2"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Date & Location */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-primary" /> Date & Location
                </h2>

                <div>
                  <Label className="mb-3 block">Select Date</Label>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(d) => d < new Date()}
                      className="rounded-xl glass"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Ranch Road"
                      className="w-full mt-2 bg-secondary/50 border border-border/30 rounded-lg px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Select value={city} onValueChange={setCity}>
                      <SelectTrigger className="mt-2 bg-secondary/50">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Wellington">Wellington</SelectItem>
                        <SelectItem value="Fort Collins">Fort Collins</SelectItem>
                        <SelectItem value="Loveland">Loveland</SelectItem>
                        <SelectItem value="Evans">Evans</SelectItem>
                        <SelectItem value="Timnath">Timnath</SelectItem>
                        <SelectItem value="Berthoud">Berthoud</SelectItem>
                        <SelectItem value="Other NoCo">Other NoCo Area</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="instructions">Special Instructions</Label>
                  <Textarea
                    id="instructions"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Any special care instructions, feeding schedules, medications, gate codes, etc."
                    className="mt-2 bg-secondary/50 border-border/30"
                    rows={3}
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)} className="bg-transparent">
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!date || !address || !city}
                    className="gradient-purple text-white border-0 gap-2"
                  >
                    Review <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" /> Review & Confirm
                </h2>

                <div className="glass p-6 rounded-xl space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Animal Type</p>
                      <p className="font-medium">
                        {ANIMAL_CATEGORIES.find((c) => c.id === animalType)?.emoji}{" "}
                        {ANIMAL_CATEGORIES.find((c) => c.id === animalType)?.label}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Service Tier</p>
                      <p className="font-medium">{selectedTierData?.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="font-medium">{date?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="font-medium">{address}, {city}</p>
                    </div>
                    {petName && (
                      <div>
                        <p className="text-xs text-muted-foreground">Pet Name</p>
                        <p className="font-medium">{petName}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-muted-foreground">Price Range</p>
                      <p className="font-medium text-primary">{selectedTierData?.priceRange}</p>
                    </div>
                  </div>
                  {instructions && (
                    <div>
                      <p className="text-xs text-muted-foreground">Special Instructions</p>
                      <p className="text-sm">{instructions}</p>
                    </div>
                  )}
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Final pricing will be confirmed after Reese reviews your booking request. Payment will be processed via Stripe.
                </p>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)} className="bg-transparent">
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={createBooking.isPending}
                    className="gradient-purple text-white border-0 gap-2"
                  >
                    {createBooking.isPending ? "Submitting..." : "Submit Booking"} <CheckCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
