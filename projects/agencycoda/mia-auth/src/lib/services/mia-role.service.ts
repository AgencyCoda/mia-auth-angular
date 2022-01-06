import { MiaBaseCrudHttpService, MiaBaseHttpService, MiaCoreConfig, MiaPagination, MiaQuery, MiaResponse, MIA_CORE_PROVIDER } from '@agencycoda/mia-core';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MiaPermission, MiaRole } from '../entities/mia-role';

export const MIA_AUTH_KEY_STORAGE_ROLES = 'mia_auth.storage.roles';
export const MIA_AUTH_KEY_STORAGE_PERMISSIONS_BY_USER = 'mia_auth.storage.permissions_by_user';

@Injectable({
  providedIn: 'root'
})
export class MiaRoleService extends MiaBaseCrudHttpService<MiaRole> {

  constructor(
    @Inject(MIA_CORE_PROVIDER) protected config: MiaCoreConfig,
    protected http: HttpClient,
    protected storage: StorageMap
  ) {
    super(config, http);
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
        return super.listOb(query).pipe(map(result => {

          this.storage.set(MIA_AUTH_KEY_STORAGE_ROLES, JSON.stringify(result)).subscribe();

          return result;
        }));
      }

      return of(JSON.parse(data));
    }));

  }

  allPermissionByUser(): Observable<Array<MiaPermission>> {
    
    return this.storage.get<string>(MIA_AUTH_KEY_STORAGE_PERMISSIONS_BY_USER, { type: 'string' })
    .pipe(switchMap(data => {
      if(data == undefined || data == ''){
        return this.getOb(this.config.baseUrl + 'mia-auth/role/access').pipe(map(result => {

          this.storage.set(MIA_AUTH_KEY_STORAGE_PERMISSIONS_BY_USER, JSON.stringify(result)).subscribe();

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
