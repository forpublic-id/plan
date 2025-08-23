"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PlanningDocument } from "@/lib/types/planning";
import { formatDate, formatNumber, cn } from "@/lib/utils";
import {
  FileText,
  Download,
  Eye,
  Search,
  Filter,
  Calendar,
  FileType,
  Languages,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export interface DocumentLibraryProps {
  documents: PlanningDocument[];
  onDocumentView?: (document: PlanningDocument) => void;
  onDocumentDownload?: (document: PlanningDocument, fileIndex: number) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  filters?: DocumentFilters;
  onFiltersChange?: (filters: DocumentFilters) => void;
  locale?: "id" | "en";
  className?: string;
}

export interface DocumentFilters {
  type?: string[];
  category?: string[];
  language?: string[];
  region?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
}

export function DocumentLibrary({
  documents,
  onDocumentView,
  onDocumentDownload,
  searchQuery = "",
  onSearchChange,
  filters = {},
  onFiltersChange,
  locale = "id",
  className,
}: DocumentLibraryProps) {
  const [expandedDocuments, setExpandedDocuments] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  // Filter and search documents
  const filteredDocuments = useMemo(() => {
    let result = documents;

    // Apply text search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (doc) =>
          doc.title[locale].toLowerCase().includes(query) ||
          doc.metadata.keywords.some((keyword) =>
            keyword.toLowerCase().includes(query)
          ) ||
          doc.summary?.[locale]?.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.type && filters.type.length > 0) {
      result = result.filter((doc) => filters.type!.includes(doc.type));
    }

    if (filters.category && filters.category.length > 0) {
      result = result.filter((doc) => filters.category!.includes(doc.category));
    }

    if (filters.language && filters.language.length > 0) {
      result = result.filter((doc) => filters.language!.includes(doc.language));
    }

    if (filters.region && filters.region.length > 0) {
      result = result.filter((doc) =>
        filters.region!.some((region) =>
          doc.metadata.region.toLowerCase().includes(region.toLowerCase())
        )
      );
    }

    if (filters.dateRange) {
      const { start, end } = filters.dateRange;
      result = result.filter((doc) => {
        const publishDate = new Date(doc.metadata.publishDate);
        return (
          publishDate >= new Date(start) && publishDate <= new Date(end)
        );
      });
    }

    return result;
  }, [documents, searchQuery, filters, locale]);

  const toggleDocumentExpansion = (documentId: string) => {
    const newExpanded = new Set(expandedDocuments);
    if (newExpanded.has(documentId)) {
      newExpanded.delete(documentId);
    } else {
      newExpanded.add(documentId);
    }
    setExpandedDocuments(newExpanded);
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      regulation: <FileText className="w-4 h-4" />,
      map: <FileType className="w-4 h-4" />,
      report: <FileText className="w-4 h-4" />,
      study: <FileText className="w-4 h-4" />,
      guideline: <FileText className="w-4 h-4" />,
      presentation: <FileType className="w-4 h-4" />,
    };
    return icons[type] || <FileText className="w-4 h-4" />;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      regulation: "text-red-600 bg-red-50 border-red-200",
      map: "text-green-600 bg-green-50 border-green-200",
      report: "text-blue-600 bg-blue-50 border-blue-200",
      study: "text-purple-600 bg-purple-50 border-purple-200",
      guideline: "text-orange-600 bg-orange-50 border-orange-200",
      presentation: "text-gray-600 bg-gray-50 border-gray-200",
    };
    return colors[type] || "text-gray-600 bg-gray-50 border-gray-200";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Search and Filter Header */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {locale === "id" ? "Perpustakaan Dokumen" : "Document Library"}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {formatNumber(filteredDocuments.length, locale)}
                {" "}
                {locale === "id" ? "dokumen" : "documents"}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-1" />
                {locale === "id" ? "Filter" : "Filter"}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={
                locale === "id"
                  ? "Cari dokumen, kata kunci, atau topik..."
                  : "Search documents, keywords, or topics..."
              }
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="border rounded-md p-4 bg-muted/30 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Document Type Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {locale === "id" ? "Jenis Dokumen" : "Document Type"}
                  </label>
                  <select
                    multiple
                    value={filters.type || []}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions, option => option.value);
                      onFiltersChange?.({ ...filters, type: selected });
                    }}
                    className="w-full p-2 border border-input rounded-md bg-background text-sm"
                  >
                    <option value="regulation">
                      {locale === "id" ? "Peraturan" : "Regulation"}
                    </option>
                    <option value="map">
                      {locale === "id" ? "Peta" : "Map"}
                    </option>
                    <option value="report">
                      {locale === "id" ? "Laporan" : "Report"}
                    </option>
                    <option value="study">
                      {locale === "id" ? "Kajian" : "Study"}
                    </option>
                    <option value="guideline">
                      {locale === "id" ? "Panduan" : "Guideline"}
                    </option>
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {locale === "id" ? "Kategori" : "Category"}
                  </label>
                  <select
                    multiple
                    value={filters.category || []}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions, option => option.value);
                      onFiltersChange?.({ ...filters, category: selected });
                    }}
                    className="w-full p-2 border border-input rounded-md bg-background text-sm"
                  >
                    <option value="spatial-plan">
                      {locale === "id" ? "Tata Ruang" : "Spatial Plan"}
                    </option>
                    <option value="master-plan">
                      {locale === "id" ? "Rencana Induk" : "Master Plan"}
                    </option>
                    <option value="environmental">
                      {locale === "id" ? "Lingkungan" : "Environmental"}
                    </option>
                    <option value="transportation">
                      {locale === "id" ? "Transportasi" : "Transportation"}
                    </option>
                    <option value="housing">
                      {locale === "id" ? "Perumahan" : "Housing"}
                    </option>
                  </select>
                </div>

                {/* Language Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {locale === "id" ? "Bahasa" : "Language"}
                  </label>
                  <select
                    multiple
                    value={filters.language || []}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions, option => option.value);
                      onFiltersChange?.({ ...filters, language: selected });
                    }}
                    className="w-full p-2 border border-input rounded-md bg-background text-sm"
                  >
                    <option value="id">Indonesia</option>
                    <option value="en">English</option>
                    <option value="both">
                      {locale === "id" ? "Keduanya" : "Both"}
                    </option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onFiltersChange?.({})}
                    className="w-full"
                  >
                    {locale === "id" ? "Reset Filter" : "Clear Filters"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document List */}
      <div className="space-y-3">
        {filteredDocuments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {locale === "id"
                  ? "Tidak ada dokumen yang ditemukan"
                  : "No documents found"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredDocuments.map((document) => {
            const isExpanded = expandedDocuments.has(document.id);
            
            return (
              <Card key={document.id} className="transition-all hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Document Type Icon */}
                    <div className={cn(
                      "p-2 rounded-md border",
                      getTypeColor(document.type)
                    )}>
                      {getTypeIcon(document.type)}
                    </div>

                    {/* Document Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                            {document.title[locale]}
                          </h3>
                          
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Badge variant="outline" className="capitalize">
                              {document.type}
                            </Badge>
                            <Badge variant="secondary" className="capitalize">
                              {document.category}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Languages className="w-3 h-3" />
                              {document.language === "both" 
                                ? "ID/EN" 
                                : document.language.toUpperCase()}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              {formatDate(document.metadata.publishDate, locale)}
                            </div>
                          </div>

                          {document.summary && (
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {document.summary[locale]}
                            </p>
                          )}

                          <div className="text-xs text-muted-foreground">
                            {locale === "id" ? "Oleh" : "By"} {document.metadata.author} • 
                            {document.metadata.region}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onDocumentView?.(document)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            {locale === "id" ? "Lihat" : "View"}
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleDocumentExpansion(document.id)}
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t space-y-3">
                          {/* Keywords */}
                          {document.metadata.keywords.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium mb-2">
                                {locale === "id" ? "Kata Kunci" : "Keywords"}
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {document.metadata.keywords.slice(0, 8).map((keyword) => (
                                  <Badge key={keyword} variant="outline" className="text-xs">
                                    {keyword}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Files */}
                          <div>
                            <h4 className="text-sm font-medium mb-2">
                              {locale === "id" ? "File" : "Files"}
                            </h4>
                            <div className="space-y-2">
                              {document.files.map((file, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-2 border rounded-md bg-muted/30"
                                >
                                  <div className="flex items-center gap-2">
                                    <FileType className="w-4 h-4 text-muted-foreground" />
                                    <div>
                                      <div className="text-sm font-medium">
                                        {file.filename}
                                      </div>
                                      {file.description && (
                                        <div className="text-xs text-muted-foreground">
                                          {file.description[locale]}
                                        </div>
                                      )}
                                      <div className="text-xs text-muted-foreground">
                                        {formatFileSize(document.fileSize)} • {document.format.toUpperCase()}
                                        {document.pages && ` • ${document.pages} ${locale === "id" ? "halaman" : "pages"}`}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => onDocumentDownload?.(document, index)}
                                    >
                                      <Download className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => window.open(file.url, "_blank")}
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}