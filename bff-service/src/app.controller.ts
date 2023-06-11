import { Controller, Get, All, Param, Query, Request } from '@nestjs/common';
import { AppService } from './app.service';

enum RecipientServices {
  product = 'product',
  cart = 'cart',
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @All(':service')
  async fetchData(
    @Request() request,
  ) {
    const { query, method, url, rawHeaders, params } = request;
    const headers = request.headers;
    console.log('Headers', typeof headers);
    console.log('method', typeof method);
    console.log('Query parameters', typeof query);
    console.log('Path parameters', typeof params);
    return await this.appService.callToService({ method, params, url, headers });
  }

}
