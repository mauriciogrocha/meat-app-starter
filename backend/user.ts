export class User {
    constructor(
        public email: string,
        public name: string,
        private password: string){}

        matches(another: User): boolean {
            return another !== undefined
                   && another.email === this.email
                   && another.password === this.password
        }
}

export const users: {[key: string]: User} = {
    "gabriel@gmail.com": new User('gabriel@gmail.com', 'Gabriel', '123'),
    "rafael@gmail.com": new User('rafael@gmail.com', 'Rafael', '456')
}