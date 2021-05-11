import { Injectable, InjectionToken } from "@angular/core";
import { MiaPermissionStatic, MiaRoleStatic } from "./mia-role";

export const MIA_AUTH_PROVIDER = new InjectionToken<MiaAuthConfig>('agencycoda.auth');
export const MIA_PERMISSION_PROVIDER = new InjectionToken<MiaPermissionConfig>('agencycoda.permission');

@Injectable()
export class MiaAuthConfig {
  baseUrl: string = '';
}

@Injectable()
export class MiaPermissionConfig {
  roles: Array<MiaRoleStatic> = [];
  permissions: Array<MiaPermissionStatic> = [];
  allow: Array<{ role: string, permissions: [string]}> = [];
  deny: Array<{ role: string, permissions: [string]}> = [];
}