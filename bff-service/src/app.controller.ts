import { Controller, Get, All, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @All([':service/*'])
  async fetchData(
    @Request() request,
  ) {
    const {  method, url, params, headers, body } = request;
    return this.appService.callToService({ method, params, url, headers, body });
  }

}
