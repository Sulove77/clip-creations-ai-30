import type { PortfolioConfig } from "./portfolio.schema";

export const portfolioExample: PortfolioConfig = {
  site: {
    name: "Your Name",
    role: "Your Role",
  },
  person: {
    fullName: "Your Name",
    location: "Your City, Country",
    email: "you@example.com",
    linkedin: "linkedin.com/in/your-handle",
  },
  nav: {
    brand: {
      text: "YourName",
      accentText: ".",
      href: "#",
    },
    links: [
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Services", href: "#services" },
      { label: "Experience", href: "#experience" },
      { label: "Contact", href: "#contact" },
    ],
    cta: {
      label: "Contact Me",
      href: "#contact",
    },
  },
  seo: {
    title: "Your Name | Portfolio",
    description: "Short SEO description for your portfolio.",
    author: "Your Name",
  },
  theme: {
    mode: "light",
    colors: {
      background: "oklch(0.97 0.005 260)",
      foreground: "oklch(0.18 0.04 260)",
      primary: "oklch(0.18 0.04 260)",
      "primary-foreground": "oklch(0.97 0.005 260)",
      accent: "oklch(0.63 0.22 30)",
      "accent-foreground": "oklch(1 0 0)",
      coral: "oklch(0.63 0.22 30)",
      "coral-foreground": "oklch(1 0 0)",
      navy: "oklch(0.18 0.04 260)",
      "navy-foreground": "oklch(0.97 0.005 260)",
    },
  },
  blocks: [
    {
      id: "hero-main",
      type: "hero",
      badge: "Your Tagline",
      headingPrefix: "Hi, I'm",
      headingHighlight: "Your Name",
      description: "One or two lines introducing your value.",
      primaryCta: { label: "Let's Talk", href: "#contact" },
      secondaryCta: { label: "View Work", href: "#services" },
      image: {
        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900",
        alt: "Hero image",
      },
    },
    {
      id: "about-main",
      type: "about",
      title: "About",
      titleHighlight: "Me",
      paragraphs: ["First paragraph.", "Second paragraph."],
      image: {
        src: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=900",
        alt: "Profile image",
      },
      nameTag: "Your Name",
      stats: [
        { value: "3+", label: "Years Experience" },
        { value: "25+", label: "Projects" },
      ],
    },
    {
      id: "skills-main",
      type: "skills",
      title: "My",
      titleHighlight: "Skills",
      subtitle: "A short line about your skills.",
      items: [
        { name: "Skill One", level: 85 },
        { name: "Skill Two", level: 75 },
      ],
      image: {
        src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900",
        alt: "Skills image",
      },
    },
    {
      id: "services-main",
      type: "services",
      title: "What I",
      titleHighlight: "Do",
      subtitle: "How you help people or businesses.",
      items: [
        { icon: "⚡", title: "Service One", desc: "Service description." },
        { icon: "📌", title: "Service Two", desc: "Service description." },
      ],
    },
    {
      id: "experience-main",
      type: "experience",
      title: "My",
      titleHighlight: "Journey",
      subtitle: "Your experience summary.",
      items: [
        {
          year: "2024 - Present",
          role: "Role",
          company: "Company",
          desc: "What you did here.",
        },
      ],
    },
    {
      id: "contact-main",
      type: "contact",
      title: "Let's",
      titleHighlight: "Talk",
      subtitle: "Invite people to reach out.",
      cardTitle: "Send a Message",
      submitLabel: "Send Message",
      successMessage: "Thanks for reaching out.",
      errorMessage: "Something went wrong. Please try again.",
      contactItems: [
        { icon: "✉️", label: "Email", value: "you@example.com", href: "mailto:you@example.com" },
      ],
      image: {
        src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900",
        alt: "Contact image",
      },
    },
    {
      id: "footer-main",
      type: "footer",
      socialLinks: [
        { label: "LinkedIn", href: "https://linkedin.com" },
        { label: "GitHub", href: "https://github.com" },
      ],
    },
  ],
};
