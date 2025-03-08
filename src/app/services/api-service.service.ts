import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl =
    'https://n8n.stpromovoprosibot.ru/webhook/da271862-a76f-4257-8c2d-ceacba1c7a53';

  constructor(private http: HttpClient) {}

  postData(data: any): Observable<any> {
    const headers = new HttpHeaders({
      host: 'n8n.stpromovoprosibot.ru',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:135.0) Gecko/20100101 Firefox/135.0',
      accept: 'application/json, text/plain, */*',
      'accept-encoding': 'gzip, deflate, br, zstd',
      'accept-language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
      origin: 'http://localhost:4200',
      priority: 'u=0',
      referer: 'http://localhost:4200/',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      te: 'trailers',
      'x-forwarded-for': '176.215.29.173',
      'x-forwarded-host': 'n8n.stpromovoprosibot.ru',
      'x-forwarded-port': '443',
      'x-forwarded-proto': 'https',
      'x-forwarded-server': 'b4d6bb4076c6',
      'x-real-ip': '176.215.29.173',
    });
    return this.http.post(this.apiUrl, data, { headers });
  }
}
