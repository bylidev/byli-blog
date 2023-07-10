import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private httpClient: HttpClient) {}

  getMenu(): Observable<Map<string, string>> {
    return this.httpClient.get<Map<string, string>>('/assets/blog/menu.json');
  }
}
