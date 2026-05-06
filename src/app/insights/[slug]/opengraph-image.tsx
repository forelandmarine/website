import { ImageResponse } from "next/og";
import { posts } from "../posts";

export const alt = "Foreland Marine — Insights";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateImageMetadata() {
  return posts.map((post) => ({
    id: post.slug,
    alt: post.title,
    contentType: "image/png",
    size,
  }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  const title = post?.title ?? "Foreland Marine Insights";
  const category = post?.category ?? "Insights";
  const date = post
    ? new Date(post.date).toLocaleDateString("en-GB", { month: "long", year: "numeric" })
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #0A1A2A 0%, #122236 50%, #0A1A2A 100%)",
          color: "#FFFFFF",
          fontFamily: "system-ui, -apple-system, Helvetica, Arial, sans-serif",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "8px",
            background: "#5386B6",
          }}
        />

        {/* Header: brand + category */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "32px",
                background: "#5386B6",
              }}
            />
            <span
              style={{
                fontSize: "22px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#FFFFFF",
              }}
            >
              Foreland Marine
            </span>
          </div>
          <span
            style={{
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#5386B6",
            }}
          >
            {category}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "1040px",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#5386B6",
            }}
          >
            Insights
          </span>
          <span
            style={{
              fontSize: title.length > 90 ? "56px" : title.length > 60 ? "64px" : "72px",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "#FFFFFF",
            }}
          >
            {title}
          </span>
        </div>

        {/* Footer: byline + URL */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#FFFFFF",
              }}
            >
              Jack MacNally
            </span>
            <span
              style={{
                fontSize: "16px",
                color: "#8FBAD4",
              }}
            >
              Director, Foreland Marine{date ? ` · ${date}` : ""}
            </span>
          </div>
          <span
            style={{
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: "#8FBAD4",
            }}
          >
            forelandmarine.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
