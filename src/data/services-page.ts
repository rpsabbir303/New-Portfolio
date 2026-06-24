export const servicesPageHero = {
  label: "SERVICES",
  headline: ["Complete Digital Product", "Solutions Under", "One Roof"],
  description:
    "From UI/UX design to full-stack development, deployment, optimization, troubleshooting, and startup consulting — I help businesses build, scale, and improve digital products that deliver results.",
  ctas: [
    { label: "Start a Project", href: "#contact", primary: true },
    { label: "Book a Consultation", href: "mailto:rpsabbir.ahmed@gmail.com?subject=Consultation%20Request", primary: false },
  ],
} as const;

export const servicesPageMetrics = [
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 100, suffix: "%", label: "Client Focused" },
  { value: 0, suffix: "", label: "End-to-End Product Expertise", textValue: "End-to-End" },
] as const;

export const servicesPageOfferings = [
  {
    number: "01",
    title: "UI/UX Design",
    description:
      "Create intuitive, user-centered experiences that improve engagement, usability, and conversions.",
    deliverables: [
      "User Research",
      "UX Audit",
      "Wireframing",
      "Prototyping",
      "Mobile App Design",
      "Dashboard Design",
      "SaaS Design",
      "Design Systems",
      "Landing Pages",
      "Product Design",
    ],
  },
  {
    number: "02",
    title: "Website Development",
    description:
      "Build modern, high-performance websites that look great and perform even better.",
    deliverables: [
      "Business Websites",
      "Portfolio Websites",
      "Landing Pages",
      "SaaS Platforms",
      "Admin Dashboards",
      "Next.js Applications",
      "React Applications",
      "CMS Solutions",
    ],
  },
  {
    number: "03",
    title: "Website Fix & Optimization",
    description:
      "Fix issues, improve performance, and optimize existing websites for better results.",
    deliverables: [
      "Bug Fixing",
      "Responsive Issues",
      "SEO Improvements",
      "Speed Optimization",
      "Code Refactoring",
      "Security Fixes",
      "Accessibility Improvements",
      "UI Improvements",
    ],
  },
  {
    number: "04",
    title: "Mobile App Development",
    description:
      "Build scalable and beautiful cross-platform mobile applications.",
    deliverables: [
      "Flutter Applications",
      "Android Apps",
      "iOS Apps",
      "E-commerce Apps",
      "Booking Apps",
      "Delivery Apps",
      "Business Apps",
      "Custom Mobile Solutions",
    ],
  },
  {
    number: "05",
    title: "Mobile App Troubleshooting & Publishing",
    description:
      "Fix existing apps and help publish them successfully.",
    deliverables: [
      "Flutter Bug Fixes",
      "App Performance Optimization",
      "Firebase Integration",
      "Push Notifications",
      "Crash Fixing",
      "Play Store Publishing",
      "App Store Publishing",
      "Store Review Support",
    ],
  },
  {
    number: "06",
    title: "Backend Development",
    description:
      "Create secure and scalable backend systems that power modern applications.",
    deliverables: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Authentication Systems",
      "Payment Integration",
      "Database Design",
      "Admin APIs",
      "Server Architecture",
    ],
  },
  {
    number: "07",
    title: "Backend Troubleshooting",
    description:
      "Resolve backend issues and improve application stability.",
    deliverables: [
      "API Fixes",
      "Database Problems",
      "Authentication Issues",
      "Performance Bottlenecks",
      "Deployment Errors",
      "Server Optimization",
      "Security Improvements",
    ],
  },
  {
    number: "08",
    title: "Startup Consulting",
    description:
      "Help founders turn ideas into scalable products.",
    deliverables: [
      "MVP Planning",
      "Product Strategy",
      "Feature Prioritization",
      "Technical Architecture",
      "Growth Planning",
      "Technology Selection",
      "Startup Guidance",
    ],
  },
  {
    number: "09",
    title: "Deployment & DevOps",
    description:
      "Deploy and maintain applications with confidence.",
    deliverables: [
      "Vercel Deployment",
      "VPS Deployment",
      "Hostinger Deployment",
      "Docker Setup",
      "Domain Configuration",
      "SSL Installation",
      "CI/CD Setup",
      "Monitoring",
    ],
  },
] as const;

export const servicesPageProcess = [
  {
    step: "01",
    title: "Discovery",
    description:
      "Understanding your goals, users, constraints, and success metrics through research and stakeholder alignment.",
  },
  {
    step: "02",
    title: "Strategy",
    description:
      "Defining scope, architecture, timelines, and a clear roadmap that balances speed with long-term scalability.",
  },
  {
    step: "03",
    title: "Design & Development",
    description:
      "Crafting premium interfaces and robust code with iterative feedback, quality checks, and transparent progress.",
  },
  {
    step: "04",
    title: "Launch & Support",
    description:
      "Deploying with confidence, monitoring performance, and providing ongoing optimization and technical support.",
  },
] as const;

export const servicesPageTech = [
  {
    category: "Frontend",
    items: ["Flutter", "React", "Next.js", "TypeScript"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL"],
  },
  {
    category: "Tools",
    items: ["Figma", "GitHub", "Firebase", "Docker"],
  },
] as const;

export const servicesPageFaq = [
  {
    question: "How much does a project cost?",
    answer:
      "Project costs depend on scope, complexity, and timeline. After a discovery call, I provide a transparent proposal with milestones, deliverables, and fixed or phased pricing tailored to your goals.",
  },
  {
    question: "How long does development take?",
    answer:
      "A focused landing page may take 1–2 weeks. MVPs typically run 4–8 weeks. Larger platforms are scoped in phases. You'll receive a realistic timeline before work begins.",
  },
  {
    question: "Can you fix an existing project?",
    answer:
      "Yes. I regularly audit and repair existing websites, mobile apps, and backends — fixing bugs, improving performance, refactoring code, and resolving deployment issues.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Absolutely. I offer post-launch support, maintenance retainers, performance monitoring, and iterative improvements as your product grows.",
  },
  {
    question: "Can you publish my app?",
    answer:
      "Yes. I handle Play Store and App Store publishing, including build configuration, store assets, compliance checks, and review support.",
  },
  {
    question: "Can you work with startups?",
    answer:
      "Startups are a core focus. I help founders validate ideas, plan MVPs, choose the right tech stack, and ship products that are ready to scale.",
  },
] as const;

export const servicesPageCta = {
  headline: ["Need Design,", "Development,", "or Technical Support?"],
  description:
    "Whether you're launching a startup, improving an existing product, fixing technical issues, or scaling your platform — I can help.",
  ctas: [
    { label: "Start a Project", href: "#contact", primary: true },
    { label: "Contact Me", href: "#contact", primary: false },
  ],
} as const;
