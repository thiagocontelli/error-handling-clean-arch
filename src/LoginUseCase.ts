export interface LoginUseCase {
    execute(username: String, password: string): Promise<void>
}