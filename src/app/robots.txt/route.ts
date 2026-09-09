// Hand-rolled rather than MetadataRoute.Robots because the generated shape has
// no field for the llms.txt pointer, and the file was otherwise undiscoverable.
export const dynamic = "force-static";

const DISALLOW = [
  "/api/",
  "/admin",
  "/login",
  "/q/",
  "/i/",
  "/link",
  "/technical-support/success",
  "/technical-support/invoice-requested",
];

export function GET() {
  const body = [
    "User-Agent: *",
    "Allow: /",
    ...DISALLOW.map((path) => `Disallow: ${path}`),
    "",
    "Host: https://www.forelandmarine.com",
    "Sitemap: https://www.forelandmarine.com/sitemap.xml",
    "Llms: https://www.forelandmarine.com/llms.txt",
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
