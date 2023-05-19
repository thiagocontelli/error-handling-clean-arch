import { AuthRepository } from "./AuthRepository";

export class AuthRepositoryImpl implements AuthRepository {
    async login(): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 2000))
        if (Math.random() < 0.5) {
            throw new Error('invalid-credentials')
        }
    }
}