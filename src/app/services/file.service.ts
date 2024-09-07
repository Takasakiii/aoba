import {Injectable} from '@angular/core';
import FileInfo from "../database/tables/file-info";
import FileBlob from "../database/tables/file-blob";
import * as Hash from 'js-sha512';
import database from "../database";
import {NostrService} from "./nostr.service";
import FileDto from "../types/file-dto";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private readonly _nostrService: NostrService) {
  }

  public async addFile(file: File): Promise<void> {
    const blob = file.slice();
    const data = await blob.arrayBuffer();
    const hash = this.hashFile(data);
    const fileInfo: FileInfo = {
      name: file.name,
      categories: [],
      fileHash: hash,
      mimeType: blob.type,
      size: blob.size,
      createdAt: new Date().toISOString()
    };

    const fileBlob: FileBlob = {
      blob: data,
      fileHash: hash
    };

    database.files.add(fileInfo);
    database.filesBlob.add(fileBlob);

    await this.sendNostr(fileInfo, fileBlob);
  }

  public async sendNostr(info: FileInfo, file: FileBlob): Promise<void> {
    const fileDto: FileDto<FileBlob> = {
      fileInfo: info,
      fileData: file
    };

    await this._nostrService.send(fileDto);
  }

  public async getFiles(): Promise<File[]> {
    const files = await database.files.toArray();
    const filesRet: File[] = [];
    for (const file of files) {
      const fileBlob = await database.filesBlob.where({
        fileHash: file.fileHash
      }).first();
      if (!fileBlob) continue;
      const fileData = new Blob([fileBlob.blob], {type: file.mimeType});
      const fileObj = new File([fileData], file.name, {
        type: file.mimeType,
        lastModified: new Date(file.createdAt).getDate()
      });

      filesRet.push(fileObj);
    }

    return filesRet;
  }

  private hashFile(bytes: ArrayBuffer): string {
    return Hash.sha512(bytes);
  }
}
