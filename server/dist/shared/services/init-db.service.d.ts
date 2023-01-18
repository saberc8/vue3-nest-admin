import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { UserEntity } from '@src/api/user/entities/user.entity';
import { UserService } from '@src/api/user/user.service';
export declare class InitDbService {
    private readonly userEntity;
    private readonly configService;
    private readonly userService;
    constructor(userEntity: Repository<UserEntity>, configService: ConfigService, userService: UserService);
    onModuleInit(): void;
    initData(): Promise<void>;
}
