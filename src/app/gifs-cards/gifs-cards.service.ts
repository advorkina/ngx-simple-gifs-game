import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GifsCardsService {
  private key = 'MaGTQKdkQcAnHj3yrH2FieHJGlhZ4gju';

  constructor(private http: HttpClient) {}

  getGifUrl(): Observable<any> {
    const options = { params: new HttpParams().set('api_key', this.key) };
    return this.http.get('https://api.giphy.com/v1/gifs/random', options);
  }
}
