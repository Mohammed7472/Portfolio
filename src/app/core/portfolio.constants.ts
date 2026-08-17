import { NavLink, SkillCategory, Project, Experience, SocialLink } from './types';

export const PORTFOLIO = {
  name: 'Mohammed Ashraf',
  title: 'Backend .NET Developer',
  tagline: 'Building scalable APIs and enterprise-grade systems with .NET, Clean Architecture, and AI integration.',
  email: 'muhamiidashraf22@gmail.com',
  location: 'Cairo, Egypt',
  availability: 'Available for opportunities',
  rolePreference: 'Open to backend roles',
  cvUrl: 'https://drive.google.com/drive/folders/16LMnRDpTkj3qIytv0hcZ4zU2ZFQTQIIh?usp=drive_link',

  navLinks: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' },
  ] as NavLink[],

  about: {
    summary: `I'm a Backend .NET Developer who spent 7 months in ITI's intensive engineering program mastering enterprise-grade systems. I build APIs that handle real concurrency challenges - from preventing overbooking race conditions to integrating AI retrieval pipelines.`,
    philosophy: `I care about clean architecture, maintainable code, and shipping things that actually work in production.`,
    highlights: [
      `ITI Intensive Training - 7 months enterprise .NET engineering`,
      '2 live freelance projects in production',
      'AI integration with RAG & OpenAI API',
    ],
    stats: [
      { label: 'Projects', value: '3+' },
      { label: 'Training', value: '7 mo' },
      { label: 'Technologies', value: '5+' }
    ]
  },

  skills: [
    {
      category: 'Backend Development',
      icon: 'heroCommandLine',
      items: [
        'C#', 'ASP.NET Core', 'ASP.NET Core MVC', 'EF Core', 'ADO.NET',
        'Dapper', 'REST APIs', 'JWT Authentication', 'Hangfire', 'Redis'
      ]
    },
    {
      category: 'Database & Caching',
      icon: 'heroCircleStack',
      items: [
        'SQL Server', 'Redis', 'Entity Framework Core'
      ]
    },
    {
      category: 'Architecture & Patterns',
      icon: 'heroCube',
      items: [
        'Clean Architecture', 'CQRS', 'MediatR', 'SOLID Principles',
        'Repository Pattern', 'Unit of Work', 'OOP', 'LINQ'
      ]
    },
    {
      category: 'AI & Integration',
      icon: 'heroSparkles',
      items: [
        'OpenAI API', 'RAG Architecture', 'Prompt Engineering',
        'Generative AI Integration'
      ]
    },
    {
      category: 'Tools & DevOps',
      icon: 'heroWrenchScrewdriver',
      items: [
        'Git', 'GitHub', 'Docker', 'Postman', 'Stripe API'
      ]
    },
    {
      category: 'Frontend (Basic)',
      icon: 'heroCodeBracket',
      items: [
        'Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: 1,
      name: 'EventHub - Event Booking System',
      description: 'Enterprise-grade event booking API handling high concurrency with overbooking prevention.',
      longDescription: 'EventHub is an enterprise-grade booking system engineered for high-throughput concurrency. It implements Optimistic Concurrency Control via EF Core to eliminate race conditions, uses Redis for response caching, executes async jobs via Hangfire, and handles payment processing through Stripe Webhooks.',
      tech: [
        'ASP.NET Core', 'Clean Architecture', 'CQRS', 'MediatR',
        'Redis', 'Hangfire', 'Stripe', 'Docker', 'EF Core', 'SQL Server'
      ],
      highlights: [
        'Optimistic Concurrency Control to prevent data race conditions',
        'Redis distributed caching for response throughput',
        'Hangfire for async background task processing',
        'Stripe Webhooks for automated checkout workflows',
        'Fully containerized with Docker'
      ]
    },
    {
      id: 2,
      name: 'Giftify - Gift E-Commerce Platform',
      description: 'Full e-commerce backend for a gift platform with secure payments and product management.',
      longDescription: 'Giftify is a secure, modern e-commerce backend designed to support dynamic gift catalogs and user transactions. It uses ASP.NET Core Identity for user management and authentication, Stripe API for transactions, and Repository plus Unit of Work patterns for clean database interaction.',
      tech: [
        'ASP.NET Core', 'EF Core', 'Stripe API', 'ASP.NET Identity',
        'Repository Pattern', 'Unit of Work', 'SQL Server'
      ],
      highlights: [
        'End-to-end backend infrastructure',
        'Stripe payment processing integration',
        'ASP.NET Core Identity for robust authentication',
        'Repository and Unit of Work patterns for clean data access'
      ]
    },
    {
      id: 3,
      name: 'Femora - AI Women Entrepreneurship Platform',
      description: 'Multi-role platform combining LMS, marketplace, and AI capabilities for women entrepreneurs.',
      longDescription: 'Femora bridges business, learning, and artificial intelligence into a single hub. It features a custom AI assistant using RAG for context-aware Q&A, an LMS training platform, a product marketplace backend, and role-based authorization security with JWT.',
      tech: [
        'ASP.NET Core', 'Angular', 'EF Core', 'SQL Server', 'OpenAI',
        'RAG', 'JWT', 'Role-Based Access Control'
      ],
      github: 'https://github.com/Mohammed7472/Femora-Backend.git',
      highlights: [
        'AI assistant using RAG for context-aware Q&A',
        'Intelligent course and product recommendation engine',
        'Learning Management System module',
        'Handmade product marketplace backend',
        'JWT and RBAC multi-role security'
      ]
    }
  ] as Project[],

  experience: [
    {
      role: 'Freelance Backend Developer',
      company: 'EventHub Platform',
      period: 'Aug 2026 - Present',
      type: 'Remote',
      points: [
        'Clean Architecture and CQRS for high-concurrency booking',
        'Optimistic Concurrency Control via EF Core',
        'Redis caching and Hangfire async jobs',
        'Stripe Webhooks and Docker containerization'
      ]
    },
    {
      role: 'Freelance Backend Developer',
      company: 'Giftify E-Commerce',
      period: 'May 2026 - Present',
      type: 'Remote',
      points: [
        'Full backend for gift e-commerce platform',
        'Stripe API and ASP.NET Identity',
        'Repository and Unit of Work patterns'
      ]
    },
    {
      role: 'Full-Stack & Generative AI Training',
      company: 'ITI Intensive Training Program',
      period: 'Jan 2026 - Jul 2026',
      type: 'Egypt',
      points: [
        'C#, ASP.NET Core, and SQL Server enterprise training',
        'SOLID, Clean Architecture, and design patterns',
        'Generative AI and automated workflow integration'
      ]
    }
  ] as Experience[],

  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/Mohammed7472', icon: 'heroGlobeAltSolid' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/m0hammed-ashraf74', icon: 'heroBriefcase' },
    { label: 'Email', href: 'mailto:muhamiidashraf22@gmail.com', icon: 'heroEnvelopeSolid' },
  ] as SocialLink[],
};
