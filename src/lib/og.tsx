import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const DEFAULT_GRADIENT =
  "linear-gradient(135deg, #0A1A2A 0%, #122236 50%, #0A1A2A 100%)";

export type OgCard = {
  /** Small uppercase label top right, e.g. "Refit". */
  eyebrow: string;
  /** The headline. Sized down automatically as it gets longer. */
  title: string;
  /** One or two lines of supporting copy. */
  subtitle?: string;
  /** Bottom left, without the scheme. */
  url: string;
  /** Bottom right, e.g. credentials. */
  footnote?: string;
  gradient?: string;
};

/**
 * Single renderer behind every opengraph-image route. The service cards were
 * two 149-line copies of the same markup, so any change to the brand had to be
 * made in both and was made in neither.
 */
export function renderOgCard({
  eyebrow,
  title,
  subtitle,
  url,
  footnote,
  gradient = DEFAULT_GRADIENT,
}: OgCard) {
  const titleSize =
    title.length > 90 ? 56 : title.length > 60 ? 64 : title.length > 40 ? 72 : 78;

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
          background: gradient,
          color: "#FFFFFF",
          fontFamily: "system-ui, -apple-system, Helvetica, Arial, sans-serif",
        }}
      >
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "8px", height: "32px", background: "#5386B6" }} />
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
            {eyebrow}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "1040px",
          }}
        >
          <span
            style={{
              fontSize: `${titleSize}px`,
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: "#FFFFFF",
            }}
          >
            {title}
          </span>
          {subtitle ? (
            <span
              style={{
                fontSize: "26px",
                fontWeight: 300,
                lineHeight: 1.4,
                color: "#8FBAD4",
                maxWidth: "900px",
              }}
            >
              {subtitle}
            </span>
          ) : null}
        </div>

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
          <span
            style={{
              fontSize: "18px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: "#8FBAD4",
            }}
          >
            {url}
          </span>
          {footnote ? (
            <span
              style={{
                fontSize: "14px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {footnote}
            </span>
          ) : null}
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
