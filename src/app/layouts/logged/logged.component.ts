import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {SidebarButtonComponent} from "../../components/sidebar-button/sidebar-button.component";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {IconDefinition} from "@fortawesome/angular-fontawesome";
import {NostrService} from "../../services/nostr.service";

@Component({
  selector: 'app-logged',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarButtonComponent
  ],
  templateUrl: './logged.component.html',
  styleUrl: './logged.component.css'
})
export class LoggedComponent implements OnChanges, OnInit {
  protected readonly testIcon: IconDefinition = faUser;

  constructor(private readonly _nostrService: NostrService, private readonly _router: Router) {
  }

  async ngOnInit(): Promise<void> {
    await this.checkPermissions();
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    await this.checkPermissions();
  }

  private async checkPermissions(): Promise<void> {
    if (!this._nostrService.isInitialized) {
      await this._router.navigate(['/']);
    }
  }
}
