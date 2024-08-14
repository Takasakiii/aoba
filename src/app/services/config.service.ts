import { Injectable } from '@angular/core';
import AobaConfig from "../types/aoba-config";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly _configKey = 'appConfig';
  private _config: AobaConfig;

  constructor() {
    const jsonConfig = localStorage.getItem(this._configKey);
    const initialValue: AobaConfig = {
      relays: [
        'wss://nos.lol/',
        'wss://nostr.bitcoiner.social/',
        'wss://nostr.fmt.wiz.biz/',
        'wss://nostr.mom/',
        'wss://nostr.oxtr.dev/',
        'wss://nostr.wine/',
        'wss://relay.damus.io/',
        'wss://relay.nostr.band/',
        'wss://relay.nostr.bg/',
        'wss://relay.noswhere.com/'
      ]
    };

    if(jsonConfig) {
      this._config = JSON.parse(jsonConfig);
      return;
    }

    this._config = initialValue;
  }

  public get config(): AobaConfig {
    return {...this._config};
  }

  public updateConfig(config: AobaConfig) {
    this._config = config;
    localStorage.setItem(this._configKey, JSON.stringify(this._config));
  }
}
