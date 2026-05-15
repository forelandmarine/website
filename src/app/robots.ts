import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/blog/",
    },
    sitemap: "https://www.forelandmarine.com/sitemap.xml",
    host: "https://www.forelandmarine.com",
  };
}
