import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import 'bulma/css/bulma.min.css';
import 'primeflex/primeflex.min.css';
import {NostrExtensionService} from "./services/nostr-extension.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [NostrExtensionService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
