import { MiaBaseCrudHttpService, MiaCoreConfig, MIA_CORE_PROVIDER } from '@agencycoda/mia-core';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MiaAuthConfig, MIA_AUTH_PROVIDER } from '../entities/mia-auth-config';
import { MiaUser } from '../entities/mia-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiaUserService extends MiaBaseCrudHttpService<MiaUser> {

  constructor(
    @Inject(MIA_CORE_PROVIDER) protected config: MiaCoreConfig,
    protected http: HttpClient
  ) {
    super(config, http);
    this.basePathUrl = config.baseUrl + 'user';
  }

  block(userId: number): Observable<boolean> {
      return this.post(this.basePathUrl + '/block', { id: userId, block: 1 });
  }

  unblock(userId: number): Observable<boolean> {
      return this.post(this.basePathUrl + '/block', { id: userId, block: 0 });
    }
}
