import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Students } from './students';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private apiUrl = 'http://localhost:80/angular19_php_crud';

  // Define authentication credentials
  private valid_username = "Venkat";   // Change this
  private valid_password = "password1217";  // Change this

  // Create Authorization headers
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.valid_username + ':' + this.valid_password)
    })
  };

  constructor(private http: HttpClient) { }

  // Fetch students with authentication
  getStudents(): Observable<Students[]> {
    return this.http.get<Students[]>(`${this.apiUrl}/list.php`, this.httpOptions);  
  }

  // Delete student with authentication
  deleteStudent(sId: number): Observable<Students[]> {
    return this.http.delete<Students[]>(`${this.apiUrl}/delete.php?sId=${sId}`, this.httpOptions);
  }

  createStudent(student: Students): Observable<any> {
    return this.http.post(`${this.apiUrl}/insert.php`, student, this.httpOptions);
  }

  getById(id:any)
  {
    return this.http.get<Students[]>(`${this.apiUrl}/getById.php?id=${id}`, this.httpOptions);
  }

  updateStudent(student:Students)
  {

    return this.http.put(`${this.apiUrl}/update.php?id=${student.sId}`, student, this.httpOptions);

  }
}
