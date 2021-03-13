export class MiaRole {
    id: number = 0;
    title: string = '';
    parent_id: number = 0;
}

export class MiaPermission {
    id: number = 0;
    title: string = '';
}

export class MiaRoleAccess {
    id: number = 0;
    role_id: number = 0;
    permission_id: number = 0;
    type: number = 0;
}

export class MiaRoleStatic {
    id: string = '';
    parent: string = '';
    roleId: number = 0;
}

export class MiaPermissionStatic {
    id: string = '';
    path: string = '';
}