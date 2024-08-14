import { Injectable } from '@angular/core';
import {ConfigService} from "./config.service";
import {SimplePool, getPublicKey} from "nostr-tools";
import {NostrExtensionService} from "./nostr-extension.service";
import {hexStringToUint8Array} from "../utils/hex-utils";

@Injectable({
  providedIn: 'root'
})
export class NostrService {
  private readonly _pool: SimplePool = new SimplePool();
  private readonly _relays: string[];
  private _pubKey?: string;
  private _privateKey?: string;

  constructor(configService: ConfigService, private readonly _nostrExtension: NostrExtensionService) {
    this._relays = configService.config.relays;
  }

  public async login(privateKey?: string): Promise<void> {
    if(privateKey) {
      this._privateKey = privateKey;
      this._pubKey = getPublicKey(hexStringToUint8Array(privateKey));
      return;
    }

    this._pubKey = await this._nostrExtension.getPublicKey();
  }

  public async connect(): Promise<void> {
  }


}
