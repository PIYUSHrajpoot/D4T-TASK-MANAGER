import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    login(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
}
