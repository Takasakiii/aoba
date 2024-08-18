import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import 'bulma/css/bulma.min.css';
import 'primeflex/primeflex.min.css';
import {NostrService} from "./services/nostr.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [],
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
