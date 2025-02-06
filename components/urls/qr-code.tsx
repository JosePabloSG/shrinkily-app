"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Urls } from "@prisma/client";
import QRCode from "react-qr-code";
import { DownloadIcon, Loader2 } from "lucide-react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  Dialog,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

interface QRCodeDialogProps {
  children: React.ReactNode;
  urlInfo: Urls;
}

const QRCodeDialog = ({ urlInfo, children }: QRCodeDialogProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const t = useTranslations('qr-code');

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://shrinkily.vercel.app";
  const fullUrl = `${baseUrl}/${urlInfo.shortUrl}`;

  const handleDownloadQR = async () => {
    try {
      setIsDownloading(true);
      const svg = document.getElementById("qr-code");
      if (!svg) throw new Error("QR Code element not found");

      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
      });

      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      ctx?.scale(2, 2);
      ctx?.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `Shrinkily-${urlInfo.shortUrl}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();

      toast.success(t("downloadSuccess"));
    } catch (error) {
      toast.error(t("downloadError"));
      console.error(error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-violet-500">
            {t("qrTitle")}
          </DialogTitle>
          <DialogDescription className="text-blue-violet-500">
            {t("qrDescription")}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-6 p-6">
          <div className="rounded-xl border-2 border-blue-violet-100 bg-white p-6 shadow-md dark:bg-gravel-950">
            <QRCode
              id="qr-code"
              size={240}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={fullUrl}
              viewBox={`0 0 256 256`}
              className="h-auto w-full"
              fgColor="#000000"
              bgColor="transparent"
              level="Q"
            />
          </div>

          <div className="w-full space-y-2 text-center">
            <p className="text-sm text-blue-violet-500">{t("yourShortenedUrl")}</p>
            <p className="select-all rounded-lg bg-blue-violet-50 px-4 py-2 font-mono text-sm text-blue-violet-500 shadow-inner">
              {urlInfo.shortUrl}
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="border-2 border-gravel-200 text-gravel-700 hover:bg-gravel-50"
            >
              {t("close")}
            </Button>
          </DialogClose>
          <Button
            onClick={handleDownloadQR}
            disabled={isDownloading}
            className={cn(
              "bg-blue-violet-600 text-white shadow-md",
              "hover:bg-blue-violet-700",
              "disabled:bg-gravel-400"
            )}
          >
            {isDownloading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <DownloadIcon className="mr-2 h-4 w-4" />
            )}
            {t("downloadPng")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeDialog;
