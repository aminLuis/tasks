import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { list, pricetags } from 'ionicons/icons';
import { RemoteConfigService } from 'src/app/core/services/remote-config.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [CommonModule, IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon]
})
export class TabsPage {

  remoteConfig = inject(RemoteConfigService);

  constructor() {
    console.log('Remote config:', this.remoteConfig.showCategories());
    addIcons({ list, pricetags });
  }
}
