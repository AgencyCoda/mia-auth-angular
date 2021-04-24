import { MiaBaseCrudHttpService } from '@agencycoda/mia-core';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MiaUser } from '../entities/mia-user';
import { MiaAuthConfig, MIA_AUTH_PROVIDER } from '../mia-auth.module';

@Injectable({
  providedIn: 'root'
})
export class MiaUserService extends MiaBaseCrudHttpService<MiaUser> {

  constructor(
    protected http: HttpClient,
    @Inject(MIA_AUTH_PROVIDER) protected config: MiaAuthConfig,
  ) {
    super(http);
    this.basePathUrl = config.baseUrl + 'user';
  }

  block(userId: number): Promise<boolean> {
      return this.post(this.basePathUrl + '/block', { id: userId, block: 1 });
  }
  
  unblock(userId: number): Promise<boolean> {
      return this.post(this.basePathUrl + '/block', { id: userId, block: 0 }); 
    }
}