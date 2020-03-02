const bcript = require('bcrypt');

class PasswordHasher {
    static async encrypt(pass: string, saltRounds: number = 10): Promise<string> {
        return bcript.hash(pass, saltRounds);
    }

    static async check(pass: string, hash: string): Promise<boolean> {
        return bcript.compare(pass, hash);
    }
}

export default PasswordHasher;