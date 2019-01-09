export class JWTtoken {

    authorities : [];
    details: {};
    authenticated: boolean;
    principal: {};
    credentials: {};
    token: string;
    name: string;

    constructor( authorities : [],
        details: {},
        authenticated: boolean,
        principal: {},
        credentials: {},
        token: string,
        name: string){}

    // public setToken(token:String){
    //     this.token = token;
    // }

    // public getToken(){
    //     return this.token;
    // }

}