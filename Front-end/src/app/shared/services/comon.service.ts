import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { ItemDetail } from './items/items-details.models';
import { TicketDetail } from './ticket/ticket-details.models';
@Injectable({
  providedIn: 'root'
})
export class ComonService {

  constructor(private http :HttpClient) { }

  fromData : ItemDetail = new ItemDetail();
  approveData :TicketDetail = new TicketDetail();

  getInventory(): Observable<any[]>{
    return this.http.get<any>(environment.apiBaseUrl+`/Inventory`)
   }

   saveInventory(data:any){
    return this.http.post<any>(environment.apiBaseUrl+`/Item`,data)
   }

   updateInventory(data) {
    return this.http.put<any>(environment.apiBaseUrl+`/Item`, {params:{id:data.id}})
}



//ticket
saveTicket(data) {
  return this.http.post<any>(environment.apiBaseUrl+`/Ticket`,data);
}

geTask(){
  return this.http.get<any>(environment.apiBaseUrl+`/Ticket`);

}

updateTicket(id,data){
  return this.http.put<any>(environment.apiBaseUrl+`/Ticket/${id}`,data);
}

// getTicket(){
//   return this.http.get<any>(environment.apiBaseDelete)
// }



}
