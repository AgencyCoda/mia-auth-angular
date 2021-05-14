import { MiaBaseCrudHttpService, MiaBaseHttpService, MiaPagination, MiaQuery, MiaResponse } from '@agencycoda/mia-core';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MiaAuthConfig, MIA_AUTH_PROVIDER } from '../entities/mia-auth-config';
import { MiaRole } from '../entities/mia-role';

export const MIA_AUTH_KEY_STORAGE_ROLES = 'mia_auth.storage.roles';

@Injectable({
  providedIn: 'root'
})
export class MiaRoleService extends MiaBaseCrudHttpService<MiaRole> {

  constructor(
    @Inject(MIA_AUTH_PROVIDER) protected config: MiaAuthConfig,
    protected http: HttpClient,
    protected storage: StorageMap
  ) {
    super(http);
    this.basePathUrl = config.baseUrl + 'mia-auth/role';
    
  }

  list(query: MiaQuery): Promise<MiaPagination<MiaRole>> {
    return new Promise<any>((resolve, reject) => {

      this.listOb(query).subscribe(result => {
        resolve(result);
      }, error => {
        reject(error);
      });

    });
  }

  listOb(query: MiaQuery): Observable<MiaPagination<MiaRole>> {

    return this.storage.get<string>(MIA_AUTH_KEY_STORAGE_ROLES, { type: 'string' })
    .pipe(switchMap(data => {
      if(data == undefined || data == ''){
        return this.listOb(query).pipe(map(result => {

          this.storage.set(MIA_AUTH_KEY_STORAGE_ROLES, JSON.stringify(result)).subscribe();

          return result;
        }));
      }

      return of(JSON.parse(data));
    }));

  }

  listRoles(): Promise<Array<MiaRole>> {
    return this.get(this.config.baseUrl + 'mia-auth/role/all');
  }
}
