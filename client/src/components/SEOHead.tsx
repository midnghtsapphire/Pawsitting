import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "article" | "local_business";
  image?: string;
  city?: string;
}

const BASE_URL = "https://pawsitting.manus.space";
const DEFAULT_TITLE = "PawSitting | Northern Colorado Pet & Farm Animal Sitting";
const DEFAULT_DESC = "Professional pet and farm animal sitting in Northern Colorado. Dogs, cats, horses, goats, peacocks, livestock, and exotic animals. Serving Wellington, Fort Collins, Loveland, Evans, Timnath, Berthoud, and all NoCo areas. AI-powered care by teen entrepreneur Reese.";

export default function SEOHead({ title, description, path = "/", type = "website", image, city }: SEOHeadProps) {
  const fullTitle = title ? `${title} | PawSitting NoCo` : DEFAULT_TITLE;
  const fullDesc = description || DEFAULT_DESC;
  const fullUrl = `${BASE_URL}${path}`;

  useEffect(() => {
    document.title = fullTitle;

    // Update meta tags
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", fullDesc);
    setMeta("keywords", `pet sitting Northern Colorado, farm animal care NoCo, horse sitting Wellington CO, goat care Fort Collins, livestock sitter, exotic animal care, pet sitting ${city || "NoCo"}, dog sitting, cat sitting, peacock care, farm ranch animal sitting, teen entrepreneur pet sitter`);

    // Open Graph
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", fullDesc, true);
    setMeta("og:url", fullUrl, true);
    setMeta("og:type", type === "local_business" ? "business.business" : type, true);
    setMeta("og:site_name", "PawSitting", true);
    if (image) setMeta("og:image", image, true);

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", fullDesc);

    // Structured Data - LocalBusiness
    let script = document.getElementById("structured-data");
    if (!script) {
      script = document.createElement("script");
      script.id = "structured-data";
      script.setAttribute("type", "application/ld+json");
      document.head.appendChild(script);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "PawSitting",
      "description": "Professional pet and farm animal sitting service in Northern Colorado. Specializing in dogs, cats, horses, goats, peacocks, livestock, and exotic animals.",
      "url": BASE_URL,
      "telephone": "",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": city || "Wellington",
        "addressRegion": "CO",
        "addressCountry": "US"
      },
      "areaServed": [
        { "@type": "City", "name": "Wellington", "containedInPlace": { "@type": "State", "name": "Colorado" } },
        { "@type": "City", "name": "Fort Collins", "containedInPlace": { "@type": "State", "name": "Colorado" } },
        { "@type": "City", "name": "Loveland", "containedInPlace": { "@type": "State", "name": "Colorado" } },
        { "@type": "City", "name": "Evans", "containedInPlace": { "@type": "State", "name": "Colorado" } },
        { "@type": "City", "name": "Timnath", "containedInPlace": { "@type": "State", "name": "Colorado" } },
        { "@type": "City", "name": "Berthoud", "containedInPlace": { "@type": "State", "name": "Colorado" } },
        { "@type": "City", "name": "Greeley", "containedInPlace": { "@type": "State", "name": "Colorado" } },
        { "@type": "City", "name": "Windsor", "containedInPlace": { "@type": "State", "name": "Colorado" } },
      ],
      "priceRange": "$20-$200",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "07:00",
        "closes": "21:00"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Pet & Farm Animal Sitting Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Standard Pet Sitting", "description": "Dogs, cats, and small animals" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Farm & Ranch Animal Care", "description": "Horses, goats, livestock, and exotic animals" }
          }
        ]
      }
    };

    script.textContent = JSON.stringify(structuredData);

    return () => {
      // Cleanup not needed since we're updating in place
    };
  }, [fullTitle, fullDesc, fullUrl, type, image, city]);

  return null;
}
