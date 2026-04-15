/*
  STUDENTS: Edit this file only.
  - Change text, links, and section order in `blocks`.
  - Keep every block `id` and `type` stable.

  CHANGE CHECKLIST (non-technical):
  1) Update name/role/email in `profile`.
  2) Update LinkedIn/GitHub/Twitter in `socialLinks`.
  3) Change colors in `themeColors` (optional).
  4) Update section text inside `blocks` (optional).
  5) Do not change any `id` or `type` values.
*/

import type { PortfolioConfig } from "./portfolio.schema";

const withBase = (path: string) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path}`;
};

// Quick-edit section: update these values first for most profile/theme changes.
const profile = {
  name: "Sagun",
  role: "Full Stack Developer",
  location: "Nepal",
  email: "hello@sagun.dev",
  linkedin: "linkedin.com/in/sagun",
  twitterHandle: "@sagun",
};

const socialLinks = {
  linkedin: "https://linkedin.com/in/sagun",
  github: "https://github.com/sagun",
  twitter: "https://twitter.com/sagun",
};

const themeColors = {
  background: "oklch(0.97 0.008 250)",
  foreground: "oklch(0.22 0.05 255)",
  primary: "oklch(0.28 0.1 255)",
  "primary-foreground": "oklch(0.98 0.005 250)",
  accent: "oklch(0.62 0.19 245)",
  "accent-foreground": "oklch(1 0 0)",
  coral: "oklch(0.62 0.19 245)",
  "coral-foreground": "oklch(1 0 0)",
  navy: "oklch(0.28 0.1 255)",
  "navy-foreground": "oklch(0.98 0.005 250)",
} as const;

export const portfolioConfig: PortfolioConfig = {
  site: {
    name: profile.name,
    role: profile.role,
  },
  person: {
    fullName: profile.name,
    location: profile.location,
    email: profile.email,
    linkedin: profile.linkedin,
  },
  nav: {
    brand: {
      text: profile.name,
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
      label: "Hire Me",
      href: "#contact",
    },
  },
  seo: {
    title: `${profile.name} | Developer Portfolio`,
    description:
      "Full Stack Developer building clean, performant web applications and digital products.",
    author: profile.name,
    twitterSite: profile.twitterHandle,
    ogImage:
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8a26296c-4b36-46bf-829e-0469bb62ecf2/id-preview-6db04203--557eecb1-1f64-4c35-842e-6bd4d1e84a18.lovable.app-1775816077576.png",
  },
  theme: {
    mode: "light",
    colors: themeColors,
  },
  blocks: [
    {
      id: "hero-main",
      type: "hero",
      badge: profile.role,
      headingPrefix: "Hi, I'm",
      headingHighlight: profile.name,
      description:
        "I build fast, scalable web applications with modern frontend and backend technologies.",
      primaryCta: {
        label: "Let's Connect",
        href: "#contact",
      },
      secondaryCta: {
        label: "View Projects",
        href: "#experience",
      },
      image: {
        src: withBase("/images/hero-clipart.png"),
        alt: "Developer illustration with modern software tooling icons",
        width: 1024,
        height: 1024,
      },
    },
    {
      id: "about-main",
      type: "about",
      title: "About",
      titleHighlight: "Me",
      paragraphs: [
        "I'm a developer focused on creating reliable, user-friendly applications with clean architecture and strong performance.",
        "I enjoy turning ideas into products, from UI development to backend APIs, while keeping code maintainable and scalable.",
      ],
      image: {
        src: withBase("/images/sulove-profile.jpeg"),
        alt: `${profile.name} - ${profile.role}`,
        width: 500,
        height: 600,
      },
      nameTag: profile.name,
      stats: [
        { value: "4+", label: "Years Experience" },
        { value: "30+", label: "Projects Built" },
        { value: "15+", label: "Happy Clients" },
        { value: "99%", label: "Delivery Rate" },
      ],
    },
    {
      id: "skills-main",
      type: "skills",
      title: "My",
      titleHighlight: "Skills",
      subtitle:
        "A modern engineering toolkit for shipping high-quality products.",
      items: [
        { name: "JavaScript / TypeScript", level: 92 },
        { name: "React & Next.js", level: 90 },
        { name: "Node.js & APIs", level: 88 },
        { name: "SQL & Databases", level: 84 },
        { name: "UI/UX Implementation", level: 86 },
        { name: "Testing & QA", level: 80 },
        { name: "Cloud & Deployment", level: 78 },
        { name: "System Design", level: 82 },
      ],
      image: {
        src: withBase("/images/skills-clipart.png"),
        alt: "Achievement and skills illustration",
        width: 800,
        height: 800,
      },
    },
    {
      id: "services-main",
      type: "services",
      title: "What I",
      titleHighlight: "Do",
      subtitle:
        "End-to-end development services to take products from concept to launch.",
      items: [
        {
          icon: "💻",
          title: "Frontend Development",
          desc: "Responsive, accessible interfaces with React, TypeScript, and modern UI tooling.",
        },
        {
          icon: "⚙️",
          title: "Backend APIs",
          desc: "Robust API design, authentication, and business logic implementation.",
        },
        {
          icon: "🗄️",
          title: "Database Design",
          desc: "Efficient schemas, query optimization, and reliable data flows.",
        },
        {
          icon: "🚀",
          title: "Performance Optimization",
          desc: "Speed, scalability, and code quality improvements for production systems.",
        },
        {
          icon: "🔌",
          title: "Integrations",
          desc: "Third-party services, payment systems, and automation workflows.",
        },
        {
          icon: "🧪",
          title: "Maintenance & Support",
          desc: "Ongoing improvements, bug fixing, and long-term product stability.",
        },
      ],
      image: {
        src: withBase("/images/services-clipart.png"),
        alt: "Digital marketing tools",
        width: 800,
        height: 800,
      },
    },
    {
      id: "experience-main",
      type: "experience",
      title: "My",
      titleHighlight: "Journey",
      subtitle: "Building software products with impact and reliability.",
      items: [
        {
          year: "2024 - Present",
          role: "Full Stack Developer",
          company: "Freelance",
          desc: "Delivering full-stack web solutions for startups and small businesses.",
        },
        {
          year: "2022 - 2024",
          role: "Frontend Developer",
          company: "Product Studio",
          desc: "Built reusable UI systems and improved application performance and accessibility.",
        },
        {
          year: "2021 - 2022",
          role: "Web Developer",
          company: "Tech Agency",
          desc: "Implemented business websites and API integrations with clean deployment pipelines.",
        },
        {
          year: "2020 - 2021",
          role: "Junior Developer",
          company: "Startup Team",
          desc: "Contributed to feature development, debugging, and production support.",
        },
      ],
    },
    {
      id: "contact-main",
      type: "contact",
      title: "Let's",
      titleHighlight: "Talk",
      subtitle:
        "Need a developer for your next product or feature? Let's build something great together.",
      cardTitle: "Send a Message",
      submitLabel: "Send Message",
      successMessage: "Thanks for your message. I will get back to you soon.",
      errorMessage: "Unable to send your message right now. Please try again shortly.",
      contactItems: [
        { icon: "✉️", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
        { icon: "📍", label: "Location", value: profile.location },
        { icon: "🔗", label: "LinkedIn", value: profile.linkedin, href: socialLinks.linkedin },
      ],
      image: {
        src: withBase("/images/contact-clipart.png"),
        alt: "Contact and communication illustration",
        width: 800,
        height: 800,
      },
    },
    {
      id: "footer-main",
      type: "footer",
      socialLinks: [
        { label: "LinkedIn", href: socialLinks.linkedin },
        { label: "GitHub", href: socialLinks.github },
        { label: "Twitter", href: socialLinks.twitter },
      ],
      copyrightText: "All rights reserved.",
    },
  ],
};
