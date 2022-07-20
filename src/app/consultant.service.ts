import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consultant } from './consultant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {

      private apiServerUrl = environment.apiBaseUrl;
      constructor(private http: HttpClient) { }

      public getConsultants(): Observable<Consultant[]> {
        return this.http.get<any>(`${this.apiServerUrl}/consultant/all`);
      }

      public addConsultant(consultant: Consultant): Observable<Consultant> {
        return this.http.post<any>(`${this.apiServerUrl}/consultant/add`, consultant);
      }

      public updateConsultant(consultant: Consultant): Observable<Consultant> {
        return this.http.put<any>(`${this.apiServerUrl}/consultant/update`, consultant);
      }

      public deleteConsultant(consultantId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/consultant/delete/${consultantId}`);
      }
}
