import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
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
  private menUrl = '/assets/blog/menu.json';

  constructor(private http: HttpClient) {}

  getManifest(): Subject<Map<string, Manifest>> {
    return this.getManifestData('all');
  }

  getManifestByTag(tag: string): Observable<Map<string, Manifest>> {
    return this.getManifestData(tag);
  }

  getManifestValue(key: string): Observable<Manifest> {
    return this.getManifestData('all').pipe(
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
  private getManifestData(key: string): Subject<Map<string, Manifest>> {
    const response = new Subject<Map<string, Manifest>>();
    this.http.get(this.menUrl).subscribe((data: any) => {
      this.http
        .get<any>(data[key])
        .subscribe((manifestData: Map<string, Manifest>) => {
          response.next(manifestData);
          response.complete();
        });
    });
    return response;
  }
}
