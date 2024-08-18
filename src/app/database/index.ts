import Dexie, {Table} from "dexie";
import Category from "./tables/category";
import FileInfo from "./tables/file-info";
import FileBlob from "./tables/file-blob";

class Database extends Dexie {
  public categories!: Table<Category, number>;
  public files!: Table<FileInfo, number>;
  public filesBlob!: Table<FileBlob, string>

  constructor() {
    super('aobaMeta');
    this.version(1).stores({
      categories: '++id, name, color',
      files: '++id, name, categories, fileHash, mimeType, size, createdAt',
      filesBlob: 'fileHash, blob'
    });
  }
}


const database = new Database();
export default database;
