export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  keywords: string[];
};

export const posts: Post[] = [
  {
    slug: "the-role-of-an-owners-representative",
    title: "The Role of an Owner's Representative in a New Build Project",
    description:
      "What does an owner's representative actually do during a new build superyacht project? We break down the responsibilities, from contract negotiation and yard selection through to sea trials and delivery, and explain why independent representation protects your investment.",
    date: "2026-03-15",
    category: "New Build",
    readTime: "8 min read",
    keywords: [
      "owner's representative",
      "new build superyacht",
      "yacht new build project management",
      "superyacht owner's rep",
      "new build oversight",
      "yacht construction management",
    ],
  },
  {
    slug: "ism-compliance-guide-for-yacht-owners",
    title: "A Practical Guide to ISM Compliance for Yacht Owners",
    description:
      "ISM Code compliance is a legal requirement for commercially operated yachts over 500 GT, but the process can be opaque and overwhelming. This guide covers Document of Compliance, Safety Management Systems, designated persons ashore, and how to prepare for flag state audits.",
    date: "2026-02-28",
    category: "Compliance",
    readTime: "10 min read",
    keywords: [
      "ISM compliance",
      "ISM Code yacht",
      "Safety Management System yacht",
      "Document of Compliance",
      "designated person ashore",
      "flag state audit yacht",
      "ISM Code superyacht",
    ],
  },
  {
    slug: "refit-project-management-what-to-expect",
    title: "Refit Project Management: What to Expect from Planning to Sea Trials",
    description:
      "A well-managed refit protects your budget, your timeline and your vessel. We walk through the key phases of a superyacht refit: scope definition, yard tendering, contract negotiation, project oversight, quality assurance and sea trials.",
    date: "2026-02-10",
    category: "Refit",
    readTime: "7 min read",
    keywords: [
      "yacht refit project management",
      "superyacht refit",
      "refit planning",
      "yacht refit process",
      "refit yard selection",
      "refit budget management",
    ],
  },
  {
    slug: "choosing-yacht-management-company",
    title: "How to Choose an Independent Yacht Management Company",
    description:
      "Not all yacht management companies are equal. Learn what to look for when selecting an independent management partner, from technical capability and flag state expertise to transparency, reporting and alignment with your interests as an owner.",
    date: "2026-01-22",
    category: "Yacht Management",
    readTime: "6 min read",
    keywords: [
      "yacht management company",
      "independent yacht management",
      "superyacht management",
      "yacht management services",
      "choosing yacht manager",
      "yacht operations management",
    ],
  },
  {
    slug: "mca-large-yacht-code-requirements",
    title: "Understanding MCA Large Yacht Code Requirements",
    description:
      "The MCA Large Yacht Code (LY3) sets the safety, construction and operational standards for commercially operated yachts of 24 metres and above registered under the Red Ensign. We outline the key requirements, recent amendments and what owners and captains need to know.",
    date: "2026-01-08",
    category: "Compliance",
    readTime: "9 min read",
    keywords: [
      "MCA Large Yacht Code",
      "LY3 requirements",
      "Red Ensign yacht",
      "large yacht code compliance",
      "MCA yacht regulations",
      "commercial yacht code",
      "LY3 superyacht",
    ],
  },
];
