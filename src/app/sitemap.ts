import { MetadataRoute } from "next";
import { posts } from "./insights/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.forelandmarine.com";

  // Fixed date for content-stable pages. Bump this only when the static
  // pages (home, services, tools) are meaningfully revised, so lastmod
  // stays a real freshness signal instead of tracking every build date.
  const lastUpdated = new Date("2026-08-04");

  // The insights index genuinely changes when a new article is published,
  // so date it from the most recent post rather than the static constant.
  const latestPostDate = posts.reduce(
    (latest, post) => (post.date > latest ? post.date : latest),
    posts[0]?.date ?? "2026-08-04",
  );

  const insightEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: lastUpdated,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/owners-representation`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/refit`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/technical-consultancy`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/technical-consultancy/surveys`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/yacht-management`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/technical-support`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tools/lightship-ism`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tools/seatime-tracker`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tools/pms-database`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tools/debrief`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tools/weather-routing`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tools/running-cost-calculator`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(latestPostDate),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...insightEntries,
    {
      url: `${baseUrl}/newsletters`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/newsletters/may-2026`,
      lastModified: new Date("2026-05-27"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: lastUpdated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
