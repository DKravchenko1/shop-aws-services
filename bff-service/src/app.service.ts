import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async callToService({ method, params, url, headers, body }) {
    const serviceUrl = this.getServiceUrl(params.service);

    console.log('serviceUrl', serviceUrl+url);
    const { data } = await firstValueFrom(this.httpService.request({
      method: method,
      url: serviceUrl+url,
      headers: {
        Authorization: headers.authorization,
      },
      data: body,
    }));

    console.log('response ->', data);

    return data;
  }

  getServiceUrl(service) {
    return service === 'products' ? process.env.PRODUCT_HOST : service === 'cart' ? process.env.CART_HOST : '';
  }

  getUrlWithoutPrefix(url: string): string {
    console.log('getUrlWithout', url.split('/'));
    return `/${url.split('/')[2]}`;
  }
}
