import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://forelandmarine.com/sitemap.xml",
    host: "https://forelandmarine.com",
  };
}
