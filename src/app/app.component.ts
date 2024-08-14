import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import 'bulma/css/bulma.min.css';
import 'primeflex/primeflex.min.css';
import {NostrExtensionService} from "./services/nostr-extension.service";
import {NostrService} from "./services/nostr.service";
import {ConfigService} from "./services/config.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [NostrExtensionService, NostrService, ConfigService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private readonly nostr: NostrService) {
  }

  async ngOnInit(): Promise<void> {
    await this.nostr.connect()
  }
}
