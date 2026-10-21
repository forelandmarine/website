import { MetadataRoute } from "next";
import { posts } from "./insights/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.forelandmarine.com";

  // Last meaningful revision of each static page. Update the date when a
  // page's copy or structure changes, so lastmod stays a real freshness
  // signal rather than tracking every build.
  const revised: Record<string, string> = {
    "": "2026-10-21",
    "/about": "2026-09-21",
    "/owners-representation": "2026-10-21",
    "/refit": "2026-10-21",
    "/technical-consultancy": "2026-09-09",
    "/technical-consultancy/surveys": "2026-09-09",
    "/yacht-management": "2026-09-09",
    "/technical-support": "2026-10-21",
    "/tools": "2026-09-09",
    "/tools/lightship-ism": "2026-10-21",
    "/tools/seatime-tracker": "2026-10-21",
    "/tools/pms-database": "2026-09-09",
    "/tools/debrief": "2026-09-09",
    "/tools/weather-routing": "2026-09-09",
    "/tools/running-cost-calculator": "2026-10-08",
    "/contact": "2026-10-21",
    "/newsletters": "2026-10-16",
    "/privacy-policy": "2026-08-18",
  };
  const lastUpdated = (path: string) => new Date(revised[path]);

  // The insights index genuinely changes when a new article is published,
  // so date it from the most recent post rather than the static constant.
  const latestPostDate = posts.reduce(
    (latest, post) => {
      const d = post.updated ?? post.date;
      return d > latest ? d : latest;
    },
    posts[0]?.date ?? "2026-08-04",
  );

  const insightEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: lastUpdated(""),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: lastUpdated("/about"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/owners-representation`,
      lastModified: lastUpdated("/owners-representation"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/refit`,
      lastModified: lastUpdated("/refit"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/technical-consultancy`,
      lastModified: lastUpdated("/technical-consultancy"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/technical-consultancy/surveys`,
      lastModified: lastUpdated("/technical-consultancy/surveys"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/yacht-management`,
      lastModified: lastUpdated("/yacht-management"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/technical-support`,
      lastModified: lastUpdated("/technical-support"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: lastUpdated("/tools"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tools/lightship-ism`,
      lastModified: lastUpdated("/tools/lightship-ism"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tools/seatime-tracker`,
      lastModified: lastUpdated("/tools/seatime-tracker"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tools/pms-database`,
      lastModified: lastUpdated("/tools/pms-database"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tools/debrief`,
      lastModified: lastUpdated("/tools/debrief"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tools/weather-routing`,
      lastModified: lastUpdated("/tools/weather-routing"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tools/running-cost-calculator`,
      lastModified: lastUpdated("/tools/running-cost-calculator"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: lastUpdated("/contact"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(latestPostDate),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/insights/press`,
      lastModified: new Date("2026-09-21"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...insightEntries,
    {
      url: `${baseUrl}/newsletters`,
      lastModified: lastUpdated("/newsletters"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/newsletters/october-2026`,
      lastModified: new Date("2026-10-21"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/newsletters/may-2026`,
      lastModified: new Date("2026-05-27"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: lastUpdated("/privacy-policy"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
