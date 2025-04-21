export class Validate {
    static email(email) {
        if (/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(email)) {
            return true;
        }
        return false;
    }

    static password(password) {
        return password.length >= 8 && password.length <= 16;
    }
}