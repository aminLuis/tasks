/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RemoteConfigService } from './remote-config.service';

describe('Service: RemoteConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoteConfigService]
    });
  });

  it('should ...', inject([RemoteConfigService], (service: RemoteConfigService) => {
    expect(service).toBeTruthy();
  }));
});
