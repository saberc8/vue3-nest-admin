import { UserService } from '@src/api/user/user.service';
export declare class TasksService {
    private readonly userService;
    constructor(userService: UserService);
    private readonly logger;
}
