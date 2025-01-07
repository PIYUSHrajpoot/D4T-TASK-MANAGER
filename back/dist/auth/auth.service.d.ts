import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    login(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
}
