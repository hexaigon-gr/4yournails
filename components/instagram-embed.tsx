"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds: { process: () => void };
    };
  }
}

interface InstagramFeedProps {
  urls: string[];
  captioned?: boolean;
}

const restoreHashScroll = () => {
  if (typeof window === "undefined") return;
  const hash = window.location.hash.slice(1);
  if (!hash) return;
  // IG iframes resize asynchronously via postMessage, so we re-scroll a few
  // times to keep the anchor target aligned as the page height settles.
  [200, 800, 1600, 2800].forEach((delay) =>
    setTimeout(() => {
      document
        .getElementById(hash)
        ?.scrollIntoView({ behavior: "auto", block: "start" });
    }, delay)
  );
};

const processEmbeds = () => {
  window.instgrm?.Embeds.process();
  restoreHashScroll();
};

export const InstagramFeed = ({ urls, captioned = true }: InstagramFeedProps) => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.instgrm) {
      processEmbeds();
    }
  }, [urls]);

  return (
    <>
      <div className="flex flex-col items-center gap-6">
        {urls.map((url) => (
          <div
            key={url}
            className="flex w-full justify-center"
            style={{ minHeight: "920px" }}
          >
            <blockquote
              className="instagram-media"
              data-instgrm-captioned={captioned ? "" : undefined}
              data-instgrm-permalink={url}
              data-instgrm-version="14"
              style={{
                background: "#FFF",
                border: 0,
                borderRadius: "16px",
                boxShadow:
                  "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
                margin: 0,
                maxWidth: "540px",
                minWidth: "260px",
                padding: 0,
                width: "100%",
              }}
            />
          </div>
        ))}
      </div>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={processEmbeds}
      />
    </>
  );
};
