export interface FormData {
  name: string;
  message: string;
  youtubeUrl: string;
  photos: File[];
  photoCount: 1 | 3;
}

export interface PreviewProps {
  data: FormData;
  previewUrls: string[];
}