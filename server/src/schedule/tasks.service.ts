import { Injectable, Logger, Inject } from '@nestjs/common'
// import { Cron, Interval, Timeout } from '@nestjs/schedule'
import { UserService } from '@src/api/user/user.service'
@Injectable()
export class TasksService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}
  private readonly logger = new Logger(TasksService.name)

  // @Cron('45 * * * * *')
  // handleCron() {
  //   this.logger.debug('Called when the second is 45')
  // }

  // @Interval(10000)
  // handleInterval() {
  //   this.logger.debug('Called every 10 seconds')
  // }

  // @Interval(5000)
  // handleTimeout() {
  //   console.log(UserService)
  //   const res = this.userService.findUserInfo({ id: 1 })
  //   this.logger.debug(res)
  // }
}
