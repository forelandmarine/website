import { ImageResponse } from "next/og";

export const alt = "Yacht Owner's Representation — Foreland Marine";
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
            "linear-gradient(135deg, #0A1A2A 0%, #122236 50%, #0A1A2A 100%)",
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
            Owner&apos;s Representation
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
            Independent yacht owner&apos;s representation
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
            New build and refit, 24 to 60 metres. SYBAss accredited, YORR registered. No yard commissions, no broker referral fees.
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
            forelandmarine.com/owners-representation
          </span>
          <span
            style={{
              fontSize: "14px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            SYBAss · YORR · British Marine
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
