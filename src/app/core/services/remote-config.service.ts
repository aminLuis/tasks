import { Injectable, signal } from '@angular/core';
import { getRemoteConfig, fetchAndActivate, getValue } from 'firebase/remote-config';

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {

  private remoteConfig = getRemoteConfig();
  showCategories = signal(true);

  async init() {
    this.remoteConfig.settings = {
      minimumFetchIntervalMillis: 0,
      fetchTimeoutMillis: 10000
    };

    this.remoteConfig.defaultConfig = {
      show_categories: true
    };

    await fetchAndActivate(this.remoteConfig);
    
    const value = getValue(this.remoteConfig, 'show_categories');
    
    this.showCategories.set(value.asBoolean());
  }

}
