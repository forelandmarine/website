import { ImageResponse } from "next/og";

export const alt = "Technical Support for Yachts Over 24m — Foreland Marine";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
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
            "linear-gradient(135deg, #040D1A 0%, #081630 50%, #040D1A 100%)",
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
            Technical Support
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
              fontSize: "78px",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: "#FFFFFF",
            }}
          >
            The team behind your engineering team.
          </span>
          <span
            style={{
              fontSize: "26px",
              fontWeight: 300,
              lineHeight: 1.4,
              color: "#8FBAD4",
              maxWidth: "900px",
            }}
          >
            An annual programme for sailing and motor yachts over 24 metres. Senior engineers on call day and night. From GBP 250 per month.
          </span>
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
            forelandmarine.com/technical-support
          </span>
          <span
            style={{
              fontSize: "14px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Audit · On Call · Parts Anywhere
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
