import { getTelemetryEvents } from "@workspace/utils/Helper";
import React, { useRef, useEffect } from "react";

interface PlayerProps {
  playerConfig: any;
}

const V1Player = ({ playerConfig }: PlayerProps) => {
  const previewRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const preview: any = previewRef.current;

    if (preview) {
      const originalSrc = preview.src;
      preview.src = "";
      preview.src = originalSrc;

      const handleLoad = () => {
        setTimeout(() => {
          if (
            preview.contentWindow &&
            preview.contentWindow.initializePreview
          ) {
            preview.contentWindow.initializePreview(playerConfig);
          }
          preview.contentWindow.addEventListener("message", (event: any) => {
            console.log("V1 player event", event);
          });

          preview.addEventListener("renderer:telemetry:event", (event: any) => {
            console.log("V1 player telemetry event ===>", event);
            if (event.detail.telemetryData.eid === "START") {
              console.log("V1 player telemetry START event ===>", event);
            }
            if (event.detail.telemetryData.eid === "END") {
              console.log("V1 player telemetry END event ===>", event);
            }
            getTelemetryEvents(event.detail.telemetryData, "v1");
          });
        }, 100);
      };

      preview.addEventListener("load", handleLoad);

      return () => {
        preview.removeEventListener("load", handleLoad);

        // Reset iframe to prevent residual styles or memory leaks
        // Commenting below code - Content Preview is only work due to below code
        // if (preview) {
        //   preview.src = "";
        // }
      };
    }
  }, [playerConfig]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <iframe
        ref={previewRef}
        id="contentPlayer"
        title="Content Player"
        src="/content/preview/preview.html?webview=true"
        aria-label="Content Player"
        style={{ width: "100%", height: "600px", border: "none" }}
      ></iframe>
    </div>
  );
};

export default V1Player;
