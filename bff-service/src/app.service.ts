import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosHeaders, AxiosRequestConfig } from 'axios';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async callToService({ method, params, url, headers }: Partial<AxiosRequestConfig>) {
    const serviceUrl = this.getServiceUrl(params.service);
    // const urlWithoutPrefix = this.getUrlWithoutPrefix(url);
    const config = {
      method: method,
      url: serviceUrl,
      headers: headers,
    }
    console.log('config', config);
    return this.httpService.request(config)
  }

  getServiceUrl(service) {
    return service === 'product' ? process.env.PRODUCT_HOST : service === 'cart' ? process.env.PRODUCT_HOST : '';
  }

  getUrlWithoutPrefix(url: string): string {
    console.log('getUrlWithout', url.split('/'));
    return `/${url.split('/')[2]}`;
  }
}
