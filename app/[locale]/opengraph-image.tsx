import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "4 Your Nails — Award-winning nail salon in Ilioupoli, Athens";

const OgImage = async () => {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FAF7F4 0%, #F5EDE8 50%, #EDE0D8 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Decorative top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #DBA49A, #c99389, #DBA49A)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "40px 60px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#3D2C29",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            4 Your Nails
          </div>

          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#DBA49A",
              letterSpacing: "0.05em",
              marginBottom: 32,
            }}
          >
            Your Nails, Our Passion
          </div>

          <div
            style={{
              display: "flex",
              gap: 24,
              alignItems: "center",
              marginBottom: 32,
            }}
          >
            {["Manicure", "Pedicure", "Gel Extensions", "Nail Art"].map(
              (service) => (
                <div
                  key={service}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#DBA49A",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 18,
                      color: "#6B5750",
                      fontWeight: 500,
                    }}
                  >
                    {service}
                  </span>
                </div>
              ),
            )}
          </div>

          <div
            style={{
              display: "flex",
              gap: 32,
              alignItems: "center",
              fontSize: 16,
              color: "#8B7B74",
            }}
          >
            <span>4.8/5 on Treatwell</span>
            <span>|</span>
            <span>Award-Winning</span>
            <span>|</span>
            <span>Ilioupoli, Athens</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 16,
            color: "#A89690",
          }}
        >
          <span>4yournails.vercel.app</span>
          <span style={{ margin: "0 8px" }}>•</span>
          <span>210 991 8915</span>
        </div>
      </div>
    ),
    { ...size },
  );
};

export default OgImage;
