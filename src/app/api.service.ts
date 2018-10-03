import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Message } from './Message';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
    console.log('initializes service');
  }

  getMessages() {
    return this.http.get<Message[]>('http://localhost:3000/api/messages', httpOptions);
  }

  addMessage(MessageTo): Observable<Message> {
   return this.http.post<Message>('http://localhost:3000/api/message', MessageTo, httpOptions);
  }

  deleteMessage(id): Observable<any> {
    return this.http.delete<any>('http://localhost:3000/api/message/' + id, httpOptions);
  }

  updateMessage(MessageTo, id): Observable<Message> {
    return this.http.put<Message>('http://localhost:3000/api/message/'+id, MessageTo, httpOptions);
  }
   

  

}
