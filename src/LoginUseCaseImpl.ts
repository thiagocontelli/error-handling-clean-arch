import { LoginUseCase } from "./LoginUseCase";

export class LoginUseCaseImpl implements LoginUseCase {
    async execute(username: String, password: string): Promise<void> {
        if (username.trim() === '') throw new Error('1')
        if (password.trim() === '') throw new Error('2')

        console.log(username, password)
    }
}