"use client";

import { FileText, Eye, Download } from "lucide-react";
import type { FileLink } from "@/lib/types";
import { motion } from "framer-motion";

interface PdfCardProps {
  file: FileLink;
}

function getDownloadUrl(url: string): string {
  if (url.includes("drive.google.com")) {
    return url.includes("?")
      ? `${url}&export=download`
      : `${url}?export=download`;
  }
  return url;
}

export function PdfCard({ file }: PdfCardProps) {
  const downloadUrl = getDownloadUrl(file.url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group relative rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/40 transition-shadow duration-300"
    >
      {/* Animated gradient top bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-primary to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Subtle background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative p-5 flex items-center gap-4">
        {/* Icon block */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 12 }}
          className="shrink-0 rounded-xl bg-primary/10 p-3 text-primary"
        >
          <FileText className="h-5 w-5" />
        </motion.div>

        {/* Title + actions */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2 mb-3 group-hover:text-primary transition-colors duration-200">
            {file.title}
          </p>

          <div className="flex items-center gap-2">
            {/* View button */}
            <motion.a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-primary px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:shadow-md hover:from-cyan-400 hover:to-primary transition-all duration-200"
            >
              <Eye className="h-3.5 w-3.5" />
              View
            </motion.a>

            {/* Download button */}
            <motion.a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/60 px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground hover:border-primary/40 transition-all duration-200"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </motion.a>
          </div>
        </div>
      </div>

      {/* Floating particles on hover */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/40 pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            left: `${15 + i * 20}%`,
            bottom: "10%",
          }}
          animate={{
            y: [-0, -20, -0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}