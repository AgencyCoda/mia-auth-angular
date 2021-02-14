import { MiaBaseHttpService, MiaResponse } from '@agencycoda/mia-core';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MiaRole } from '../entities/mia-role';
import { MiaAuthConfig, MIA_AUTH_PROVIDER } from '../mia-auth.module';

@Injectable({
  providedIn: 'root'
})
export class MiaRoleService extends MiaBaseHttpService {

  constructor(
    @Inject(MIA_AUTH_PROVIDER) protected config: MiaAuthConfig,
    protected http: HttpClient
  ) {
    super(http);
  }

  listRoles(): Promise<Array<MiaRole>> {
    return this.get(this.config.baseUrl + 'mia-auth/role/list');
  }
}
