import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
  private manifestUrl = '/assets/blog/manifest.json';

  constructor(private http: HttpClient) {}

  getManifest(): Observable<Map<string, Manifest>> {
    return this.http.get<any>(this.manifestUrl);
  }

  getManifestValue(key: string): Observable<Manifest> {
    return this.http.get<any>(this.manifestUrl).pipe(
      map((manifestData: any) => {
        const value = manifestData[key];
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
}
