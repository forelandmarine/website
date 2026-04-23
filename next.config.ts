import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/owners-representation',
        destination: '/new-build',
        permanent: true,
      },
      // Old /blog/ to /insights/ redirects (301)
      {
        source: '/blog/navigating-london-s-top-yachting-shipyards--a-local-s-guide',
        destination: '/insights/choosing-shipyard-yacht-refit',
        permanent: true,
      },
      {
        source: '/blog/top-yacht-refit-tips--enhancing-your-vessel-s-value-and-aesthetics',
        destination: '/insights/choosing-shipyard-yacht-refit',
        permanent: true,
      },
      {
        source: '/blog/the-role-of-a-yacht-owner-s-representative--essential-for-successful-yacht-management',
        destination: '/insights/what-is-a-yacht-owners-representative',
        permanent: true,
      },
      {
        source: '/blog/the-complete-guide-to-super-yacht-project-management',
        destination: '/insights/refit-project-management-what-to-expect',
        permanent: true,
      },
      {
        source: '/blog/top-considerations-for-a-successful-yacht-refit--expert-advice-from-foreland',
        destination: '/insights/refit-project-management-what-to-expect',
        permanent: true,
      },
      {
        source: '/blog/understanding-the-role-of-a-yacht-owner-s-representative--ensuring-peace-of-mind',
        destination: '/insights/what-is-a-yacht-owners-representative',
        permanent: true,
      },
      {
        source: '/blog/the-role-of-a-superyacht-owner-s-representative--why-you-need-one',
        destination: '/insights/the-role-of-an-owners-representative',
        permanent: true,
      },
      {
        source: '/blog/top-tips-for-effective-yacht-project-management--from-planning-to-execution',
        destination: '/insights/refit-project-management-what-to-expect',
        permanent: true,
      },
      {
        source: '/blog/the-ultimate-guide-to-super-yacht-refit--what-owners-need-to-know',
        destination: '/insights/refit-project-management-what-to-expect',
        permanent: true,
      },
      {
        source: '/blog/case-study--successful-yacht-refit-projects-managed-by-foreland-4',
        destination: '/insights/performance-sailing-yacht-refit',
        permanent: true,
      },
      {
        source: '/blog/common-misconceptions-about-yacht-refits-and-how-to-avoid-them',
        destination: '/insights/how-much-does-a-superyacht-refit-cost',
        permanent: true,
      },
      {
        source: '/blog/comprehensive-guide-to-superyacht-owner-s-representation',
        destination: '/insights/the-role-of-an-owners-representative',
        permanent: true,
      },
      {
        source: '/blog/preventive-maintenance-for-super-yachts--a-comprehensive-guide',
        destination: '/insights/understanding-yacht-management-costs-10-percent-rule',
        permanent: true,
      },
      // Catch-all: any unmatched /blog/ URL goes to /insights
      {
        source: '/blog/:path*',
        destination: '/insights',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          "**/node_modules/**",
          "**/.next/**",
          "**/public/images/**",
          "**/.git/**",
        ],
        aggregateTimeout: 300,
        poll: false,
      };
    }
    return config;
  },
};

export default nextConfig;
