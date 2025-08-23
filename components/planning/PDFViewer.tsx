"use client";

import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PlanningDocument } from "@/lib/types/planning";
import { cn, formatNumber } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Maximize2,
  Minimize2,
  FileText,
  Search,
  Bookmark,
  Share2,
} from "lucide-react";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export interface PDFViewerProps {
  document: PlanningDocument;
  fileIndex?: number;
  onClose?: () => void;
  locale?: "id" | "en";
  className?: string;
}

export function PDFViewer({
  document,
  fileIndex = 0,
  onClose,
  locale = "id",
  className,
}: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const documentFile = document.files[fileIndex];

  useEffect(() => {
    setPageNumber(1);
    setScale(1.0);
    setRotation(0);
    setError(null);
    setLoading(true);
  }, [document, fileIndex]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const onDocumentLoadError = (error: Error) => {
    setError(error.message);
    setLoading(false);
  };

  const goToPreviousPage = () => {
    setPageNumber((prev) => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(numPages, prev + 1));
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= numPages) {
      setPageNumber(page);
    }
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(3.0, prev + 0.25));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(0.5, prev - 0.25));
  };

  const resetZoom = () => {
    setScale(1.0);
  };

  const rotateDocument = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const toggleFullscreen = () => {
    if (typeof window !== "undefined") {
      if (!window.document.fullscreenElement) {
        containerRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } else {
        window.document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const downloadDocument = () => {
    const link = window.document.createElement("a");
    link.href = documentFile.url;
    link.download = documentFile.filename;
    link.click();
  };

  const shareDocument = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title[locale],
          text: document.summary?.[locale],
          url: documentFile.url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(documentFile.url);
    }
  };

  const toggleBookmark = (page: number) => {
    setBookmarks((prev) => {
      if (prev.includes(page)) {
        return prev.filter((p) => p !== page);
      } else {
        return [...prev, page].sort((a, b) => a - b);
      }
    });
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "flex flex-col h-full bg-background",
        isFullscreen && "fixed inset-0 z-50",
        className
      )}
    >
      {/* Header */}
      <Card className="rounded-none border-b">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg truncate">
                {document.title[locale]}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {documentFile.filename}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {document.metadata.author} • {document.metadata.region}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={shareDocument}
              >
                <Share2 className="w-4 h-4 mr-1" />
                {locale === "id" ? "Bagikan" : "Share"}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={downloadDocument}
              >
                <Download className="w-4 h-4 mr-1" />
                {locale === "id" ? "Unduh" : "Download"}
              </Button>
              
              {onClose && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                >
                  ✕
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Toolbar */}
      <Card className="rounded-none border-b">
        <CardContent className="p-3">
          <div className="flex items-center justify-between gap-4">
            {/* Navigation Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousPage}
                disabled={pageNumber <= 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center gap-2 text-sm">
                <input
                  type="number"
                  min={1}
                  max={numPages}
                  value={pageNumber}
                  onChange={(e) => goToPage(parseInt(e.target.value) || 1)}
                  className="w-16 px-2 py-1 text-center border border-input rounded"
                />
                <span className="text-muted-foreground">
                  / {formatNumber(numPages, locale)}
                </span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={zoomOut}
                disabled={scale <= 0.5}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              
              <span className="text-sm text-muted-foreground min-w-12 text-center">
                {Math.round(scale * 100)}%
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={zoomIn}
                disabled={scale >= 3.0}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={resetZoom}
              >
                1:1
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={rotateDocument}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </Button>
            </div>

            {/* Bookmark */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleBookmark(pageNumber)}
                className={bookmarks.includes(pageNumber) ? "text-primary" : ""}
              >
                <Bookmark 
                  className={cn(
                    "w-4 h-4",
                    bookmarks.includes(pageNumber) && "fill-current"
                  )} 
                />
              </Button>
              
              {bookmarks.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {bookmarks.length}
                </Badge>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-3 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={
                locale === "id"
                  ? "Cari dalam dokumen..."
                  : "Search in document..."
              }
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-input rounded-md bg-background"
            />
          </div>
        </CardContent>
      </Card>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto bg-gray-100 p-4">
        <div className="flex justify-center">
          {loading && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4 animate-pulse" />
              <p className="text-muted-foreground">
                {locale === "id" ? "Memuat dokumen..." : "Loading document..."}
              </p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 mx-auto text-destructive mb-4" />
              <p className="text-destructive mb-2">
                {locale === "id" 
                  ? "Error memuat dokumen" 
                  : "Error loading document"}
              </p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <Document
              file={documentFile.url}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={null}
              error={null}
              className="shadow-lg"
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                rotate={rotation}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="border border-border bg-white"
              />
            </Document>
          )}
        </div>
      </div>

      {/* Bottom Info */}
      <Card className="rounded-none border-t">
        <CardContent className="p-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>
                {locale === "id" ? "Halaman" : "Page"} {formatNumber(pageNumber, locale)} 
                {" "}{locale === "id" ? "dari" : "of"} {formatNumber(numPages, locale)}
              </span>
              
              {bookmarks.length > 0 && (
                <div className="flex items-center gap-1">
                  <Bookmark className="w-3 h-3" />
                  <span>
                    {bookmarks.length} {locale === "id" ? "penanda" : "bookmarks"}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <span>
                {locale === "id" ? "Zoom" : "Zoom"}: {Math.round(scale * 100)}%
              </span>
              
              {rotation > 0 && (
                <span>
                  {locale === "id" ? "Rotasi" : "Rotation"}: {rotation}°
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}