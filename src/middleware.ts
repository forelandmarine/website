import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Refreshes the Supabase session cookie and guards the /admin area.
export async function middleware(request: NextRequest) {
  // Before 9 Sep 2026 every article's og:image pointed at another post's id.
  // Crawlers still request those URLs, so send them to the article's own image.
  const og = request.nextUrl.pathname.match(
    /^\/insights\/([^/]+)\/opengraph-image\/([^/]+)$/,
  );
  if (og) {
    if (og[1] === og[2]) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = `/insights/${og[1]}/opengraph-image/${og[1]}`;
    return NextResponse.redirect(url, 301);
  }

  const response = NextResponse.next({ request });

  // If Supabase isn't configured, let the app render its setup notice.
  if (!URL || !ANON) return response;

  const supabase = createServerClient(URL, ANON, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isAdmin = path.startsWith("/admin");
  const isLogin = path === "/login";

  if (isAdmin && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }
  if (isLogin && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/insights/:slug/opengraph-image/:id"],
};
