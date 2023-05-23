import { AuthRepository } from "./AuthRepository";
import { CustomError, ErrorType } from "./CustomError";
import { HttpError } from "./HttpError";
import { LoginUseCase } from "./LoginUseCase";
import { codes } from "./sheets/keys/codes";

export class LoginUseCaseImpl implements LoginUseCase {
    constructor(private repository: AuthRepository) { }

    async execute(username: string, password: string): Promise<void> {
        if (username.trim() === '') throw new CustomError(ErrorType.UsernameInput, codes.invalid_username)
        if (username.trim().length > 8) throw new CustomError(ErrorType.UsernameInput, codes.username_greater_than_8)
        if (password.trim() === '') throw new CustomError(ErrorType.PasswordInput, codes.invalid_password)
        if (password.trim().length > 8) throw new CustomError(ErrorType.PasswordInput, codes.password_greater_than_8)
        
        try {
            await this.repository.login(username, password)
        } catch (error) {
            throw new CustomError(ErrorType.Http, (error as HttpError).message)
        }
    }
}