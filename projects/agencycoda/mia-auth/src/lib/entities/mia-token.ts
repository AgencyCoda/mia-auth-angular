import { MiaUser } from "./mia-user";

export class MiaToken extends MiaUser {
    public token_type: string = 'bearer';
    public access_token: string = '';
}
