import type React from "react"
import QRCode from "react-qr-code"
import type { QRStylesType } from "./constants"

interface QRPreviewProps {
  qrStyles: QRStylesType
  url: string
  containerRef: React.RefObject<HTMLDivElement>
}

export const QRPreview = ({ qrStyles, url, containerRef }: QRPreviewProps) => {
  return (
    <div
      ref={containerRef}
      className="rounded-xl border-2 border-primary/10 shadow-md transition-all duration-300 hover:shadow-lg flex items-center justify-center"
      style={{
        backgroundColor: qrStyles.bgColor,
        padding: qrStyles.borderSize,
        borderRadius: qrStyles.borderRadius,
        position: "relative",
        width: qrStyles.size + qrStyles.borderSize * 2,
        height: qrStyles.size + qrStyles.borderSize * 2,
      }}
    >
      <QRCode
        id="qr-code"
        size={qrStyles.size}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={url}
        viewBox={`0 0 256 256`}
        fgColor={qrStyles.fgColor}
        bgColor="transparent"
        level={qrStyles.level as "L" | "M" | "Q" | "H"}
      />

      {qrStyles.logoEnabled && qrStyles.logoUrl && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: qrStyles.logoSize,
            height: qrStyles.logoSize,
            backgroundColor: qrStyles.logoBackgroundColor,
            borderRadius: qrStyles.logoRadius,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={qrStyles.logoUrl || "/placeholder.svg"}
            alt="Logo"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              display: "block",
            }}
          />
        </div>
      )}
    </div>
  )
}

