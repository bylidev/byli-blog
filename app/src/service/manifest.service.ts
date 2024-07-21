import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { List, OrderedMap } from 'immutable';

export interface Manifest {
  title: string;
  author: string;
  thumb: string;
  year: number;
  tags: Array<string>;
  time: number;
  md: string;
}

@Injectable({
  providedIn: 'root',
})
export class ManifestService {
  private menUrl = '/assets/blog/menu.json';

  constructor(private http: HttpClient) {}

  getManifest(): Subject<OrderedMap<string, Manifest>> {
    return this.getManifestData('all');
  }

  getManifestByTag(tag: string): Observable<OrderedMap<string, Manifest>> {
    return this.getManifestData(tag);
  }

  getManifestValue(key: string): Observable<Manifest> {
    return this.getManifestData('all').pipe(
      map((manifestData: any) => {
        const value = manifestData.get(key);
        if (!value) {
          throw new Error(`Manifest key '${key}' not found.`);
        }
        return value;
      }),
      catchError((error: any) => {
        console.error('Error fetching manifest data:', error);
        return throwError(error);
      })
    );
  }
  private getManifestData(key: string): Subject<OrderedMap<string, Manifest>> {
    const response = new Subject<OrderedMap<string, Manifest>>();
    const headers = new HttpHeaders().set('Cache-Control', 'max-age=3600'); // Configurar tiempo de caché en segundos (1 hora)

    this.http
      .get(this.menUrl, { headers, responseType: 'json' })
      .subscribe((data: any) => {
        let tagsMenu: List<any> = data;
        this.http
          .get<any>(
            tagsMenu
              .filter((o) => o.tag === key)
              .map((o) => o.route)
              .toString(),
            { headers, responseType: 'json' }
          )
          .subscribe((manifestData: any) => {
            const orderedMap = OrderedMap<string, Manifest>(manifestData);
            response.next(orderedMap);
            response.complete();
          });
      });

    return response;
  }
}
