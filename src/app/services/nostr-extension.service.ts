import { Injectable } from '@angular/core';
import AppWindow from "../types/app-window";


@Injectable({
  providedIn: 'root'
})
export class NostrExtensionService {
  private readonly _appWindow: AppWindow = window;

  constructor() {}

  public async getPublicKey(): Promise<string | undefined> {
    return this._appWindow.nostr?.getPublicKey();
  }

  public encrypt(recv: string, message: string): Promise<string> {
    if(!this._appWindow.nostr)
      throw new Error('Failed to encrypt message, extension not found');
    return this._appWindow.nostr.nip44.encrypt(recv, message);
  }
}
