import FileInfo from "../database/tables/file-info";

interface FileDto<T> {
  fileInfo: FileInfo,
  fileData: T
}

export default FileDto;
