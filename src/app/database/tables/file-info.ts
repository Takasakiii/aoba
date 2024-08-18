interface FileInfo {
  id?: number;
  name: string;
  categories: string[];
  fileHash: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

export default FileInfo;
