import { ImageResponse } from "next/og";

// Image metadata
export const alt =
  "Plan ForPublic.id - Indonesian Planning Transparency Platform";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          backgroundImage: `
            radial-gradient(circle at 25px 25px, #525252 2%, transparent 2%),
            radial-gradient(circle at 75px 75px, #404040 2%, transparent 2%)
          `,
          backgroundSize: "100px 100px",
          backgroundPosition: "0 0, 50px 50px",
          opacity: 0.1,
        }}
      >
        {/* Main Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 80px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "24px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            maxWidth: "1000px",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                backgroundColor: "#525252",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                marginRight: "20px",
              }}
            >
              📍
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  fontSize: "48px",
                  fontWeight: "bold",
                  color: "#111827",
                  lineHeight: "1",
                  display: "flex",
                }}
              >
                Plan <span style={{ color: "#525252" }}>ForPublic</span>
                <span style={{ color: "#dc2626" }}>.id</span>
              </div>
              <div
                style={{
                  fontSize: "18px",
                  color: "#6b7280",
                  fontWeight: "medium",
                  marginTop: "4px",
                  display: "flex",
                }}
              >
                Platform Transparansi Perencanaan Indonesia
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <div
            style={{
              fontSize: "42px",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "24px",
              lineHeight: "1.2",
              maxWidth: "800px",
              display: "flex",
            }}
          >
            Akses Data Perencanaan Pembangunan Indonesia
          </div>

          {/* Feature Pills */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginBottom: "32px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                padding: "12px 24px",
                backgroundColor: "#fef3c7",
                color: "#92400e",
                borderRadius: "999px",
                fontSize: "16px",
                fontWeight: "medium",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              🗺️ Peta Interaktif
            </div>
            <div
              style={{
                padding: "12px 24px",
                backgroundColor: "#dbeafe",
                color: "#1e40af",
                borderRadius: "999px",
                fontSize: "16px",
                fontWeight: "medium",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              📋 Dokumen Lengkap
            </div>
            <div
              style={{
                padding: "12px 24px",
                backgroundColor: "#dcfce7",
                color: "#166534",
                borderRadius: "999px",
                fontSize: "16px",
                fontWeight: "medium",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              👥 Partisipasi Publik
            </div>
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "20px",
              color: "#4b5563",
              lineHeight: "1.5",
              maxWidth: "700px",
              textAlign: "center",
              display: "flex",
            }}
          >
            Transparansi data tata ruang, zonasi, dan dokumen perencanaan untuk
            partisipasi publik yang lebih baik
          </div>

          {/* Website URL */}
          <div
            style={{
              marginTop: "32px",
              fontSize: "16px",
              color: "#525252",
              fontWeight: "medium",
              display: "flex",
            }}
          >
            plan.forpublic.id
          </div>
        </div>

        {/* Bottom Brand */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            right: "40px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              color: "#9ca3af",
              display: "flex",
            }}
          >
            Powered by
          </div>
          <div
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#525252",
              display: "flex",
            }}
          >
            ForPublic.id
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
