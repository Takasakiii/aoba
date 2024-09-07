import { Injectable } from '@angular/core';
import * as NostrTools from 'nostr-tools';
import {NostrExtensionService} from "./nostr-extension.service";

@Injectable({
  providedIn: 'root'
})
export class EncryptService {
  constructor(private readonly _nostrExtensionService: NostrExtensionService) {
  }


  public async encrypt(recv: string, message: string, privateKey: string | null = null): Promise<string> {
    if(privateKey) {
      const privKey = NostrTools.nip19.decode(privateKey).data as Uint8Array;
      return this.encryptMessageUsingPrivKey(privKey, recv, message);
    }

    return this._nostrExtensionService.encrypt(recv, message);
  }

  private encryptMessageUsingPrivKey(privateKey: Uint8Array, recvPubKey: string, message: string): string {
    const conversation = NostrTools.nip44.v2.utils.getConversationKey(privateKey, recvPubKey);
    return NostrTools.nip44.v2.encrypt(message, conversation);
  }

}
