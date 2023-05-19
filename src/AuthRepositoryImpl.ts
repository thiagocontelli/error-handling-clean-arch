import axios from 'axios';
import { AuthRepository } from "./AuthRepository";
import { HttpError } from './HttpError';

export class AuthRepositoryImpl implements AuthRepository {
    async login(username: string, password: string): Promise<void> {
        try {
            await axios.post('https://dummyjson.com/auth/login', { username, password })
        } catch (error) {
            throw new HttpError(error.response.data.message, error.status)
        }
    }
}