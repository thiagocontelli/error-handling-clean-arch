import { AuthRepository } from "./AuthRepository";
import { CustomError, ErrorMessageCode, ErrorType } from "./CustomError";
import { HttpError } from "./HttpError";
import { LoginUseCase } from "./LoginUseCase";

export class LoginUseCaseImpl implements LoginUseCase {
    constructor(private repository: AuthRepository) { }

    async execute(username: string, password: string): Promise<void> {
        if (username.trim() === '') throw new CustomError(ErrorType.Username, ErrorMessageCode.InvalidUsername)
        if (username.trim().length > 9) throw new CustomError(ErrorType.Username, ErrorMessageCode.UsernameGreaterThan8)
        if (password.trim() === '') throw new CustomError(ErrorType.Password, ErrorMessageCode.InvalidPassword)
        if (password.trim().length > 8) throw new CustomError(ErrorType.Password, ErrorMessageCode.PasswordGreaterThan8)

        try {
            await this.repository.login(username, password)
        } catch (error) {
            throw new CustomError(ErrorType.Http, (error as HttpError).message)
        }
    }
}