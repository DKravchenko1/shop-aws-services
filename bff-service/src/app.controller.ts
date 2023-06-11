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
    console.log('Headers', headers);
    console.log('method', method);
    console.log('Query parameters', query);
    console.log('Path parameters', params);
    return await this.appService.callToService({ method, params, url, headers });
  }

}
