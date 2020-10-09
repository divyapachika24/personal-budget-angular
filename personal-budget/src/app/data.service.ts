import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { D3 } from './d3.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataUrl: string = 'http://localhost:3000/budget';

  constructor(private http: HttpClient) { }

    // getting the data of D3
    getChartData(): Observable<D3[]> {
      return this.http.get<D3[]>(this.dataUrl);
  }
}
