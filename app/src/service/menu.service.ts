import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from 'immutable';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private httpClient: HttpClient) {}

  getMenu(): Observable<List<any>> {
    return this.httpClient.get<List<any>>('/assets/blog/menu.json').pipe(
      map((response) => {
        // Realizar la ordenación
        return response.sort((a, b) => b.size - a.size);
      })
    );
  }
}
