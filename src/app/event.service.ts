import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class EventService {
 
    constructor(private http:HttpClient) {}
 
    // Uses http.get() to load data 
    getevent() {
        
        return this.http.get('http://localhost:8000/event');
    }
}
