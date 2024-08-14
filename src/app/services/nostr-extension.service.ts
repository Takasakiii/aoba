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
}
