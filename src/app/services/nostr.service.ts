import { Injectable } from '@angular/core';
import {ConfigService} from "./config.service";
import {SimplePool, getPublicKey} from "nostr-tools";
import {NostrExtensionService} from "./nostr-extension.service";
import {hexStringToUint8Array} from "../utils/hex-utils";
import {EncryptService} from "./encrypt.service";
import FileDto from "../types/file-dto";
import FileBlob from "../database/tables/file-blob";
import {Buffer} from "buffer/";
import * as Chunks from '../utils/chunk';

const MAX_MESSAGE_SIZE = 65535;

@Injectable({
  providedIn: 'root'
})
export class NostrService {
  private readonly _pool: SimplePool = new SimplePool();
  private readonly _relays: string[];
  private _pubKey?: string;
  private _privateKey?: string;

  constructor(
    configService: ConfigService,
    private readonly _nostrExtension: NostrExtensionService,
    private readonly _encryptService: EncryptService) {
    this._relays = configService.config.relays;
  }

  public get isInitialized(): boolean {
    return Boolean(this._pubKey);
  }

  public async login(privateKey?: string): Promise<void> {
    if(privateKey) {
      this._privateKey = privateKey;
      this._pubKey = getPublicKey(hexStringToUint8Array(privateKey));
      return;
    }

    this._pubKey = await this._nostrExtension.getPublicKey();
  }

  public async send(file: FileDto<FileBlob>): Promise<void> {
    if(!this._pubKey)
      throw new Error('Nostr not initialized');

    const bytes = new Uint8Array(file.fileData.blob);
    const bytesString = Buffer.from(bytes).toString('base64');

    const fileToEnc: FileDto<string> = {
      fileInfo: file.fileInfo,
      fileData: bytesString
    };

    const fileDtoJson = JSON.stringify(fileToEnc);
    const chunksFile = Chunks.chunkString(fileDtoJson, MAX_MESSAGE_SIZE);

    const encData = chunksFile.map(cFile => this._encryptService.encrypt(this._pubKey!, cFile, this._privateKey));

    const allEncData = await Promise.all(encData)

    console.log('raw', fileDtoJson);
    console.log('enc', allEncData.join(', '));
  }

  public async connect(): Promise<void> {
  }


}
