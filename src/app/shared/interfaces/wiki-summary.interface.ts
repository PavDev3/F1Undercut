export interface WikiSummaryThumbnail {
  source: string;
  width?: number;
  height?: number;
}

export interface WikiSummaryContentUrls {
  desktop?: {
    page?: string;
  };
  mobile?: {
    page?: string;
  };
}

export interface WikiSummary {
  title?: string;
  description?: string;
  extract?: string;
  thumbnail?: WikiSummaryThumbnail;
  content_urls?: WikiSummaryContentUrls;
}
