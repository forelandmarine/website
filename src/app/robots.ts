import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/link", "/technical-support/success", "/technical-support/invoice-requested"],
    },
    sitemap: "https://www.forelandmarine.com/sitemap.xml",
    host: "https://www.forelandmarine.com",
  };
}
