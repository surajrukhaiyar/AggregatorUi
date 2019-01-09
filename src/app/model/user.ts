export class User {

    password: string;
    name: string;
    role: {};
  
    constructor(password: string, name: string, role: {}) { 
        this.name = name;
        this.password = password;
        this.role = role;
    }
}