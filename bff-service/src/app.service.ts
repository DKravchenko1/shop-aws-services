import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async callToService({ method, params, url, headers }) {
    // const serviceUrl = this.getServiceUrl(params.service);
    // // const urlWithoutPrefix = this.getUrlWithoutPrefix(url);
    console.log('config', headers);
    console.log(process.env.PRODUCT_HOST);
    return this.httpService.get(process.env.PRODUCT_HOST + url, { headers });
  }

  getServiceUrl(service) {
    return service === 'product' ? process.env.PRODUCT_HOST : service === 'cart' ? process.env.PRODUCT_HOST : '';
  }

  getUrlWithoutPrefix(url: string): string {
    console.log('getUrlWithout', url.split('/'));
    return `/${url.split('/')[2]}`;
  }
}
