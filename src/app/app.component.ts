import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Message } from './Message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {


  messages: Message[];
  message: string;
  receiver: string;
  MessageTo: Message;
  id: string;  
  display: string = "";
  messageEdit: Message;
 
  constructor( private api: ApiService ) {  }

  ngOnInit() {
    this.api.getMessages().subscribe(messages => {
      console.log(messages);
      this.messages = messages;
    });
  }

  postMessage(event) {
    event.preventDefault();
    let MessageTo = {
      message: this.message,
      receiver: this.receiver,
      _id: null
    }
    this.api.addMessage(MessageTo).subscribe(data => this.messages.push(data));
    this.message = '';
    this.receiver = '';
  }

  updateMessage() {
    event.preventDefault();
    let place = this.findMessageFromID(this.display);

    if (!this.message||this.message.length < 1) {
      this.message = this.messages[place].message;
    }
    if (!this.receiver||this.receiver.length < 1) {
      this.receiver = this.messages[place].receiver;
    }
    let MessageTo = {
      message: this.message,
      receiver: this.receiver,
      _id: this.display
    }
    
    this.api.updateMessage(MessageTo, this.display).subscribe(data => {
      this.messages[place]=MessageTo;
    })
    this.message = '';
    this.receiver = '';
    this.display = '';    
  }

  deleteMessage(idd) {
    let place = this.findMessageFromID(idd);    
    this.api.deleteMessage(idd).subscribe(data => {
      if (data.n == 1) {
        this.messages.splice(place, 1);
      }
    });
  }

  openForm(idd) {
    console.log(idd);
    this.display = idd;
    let place = this.findMessageFromID(idd);
    this.messageEdit = this.messages[place];
    console.log(place);

  }

  resetEditing() {
    this.display = '';
  }
  
  findMessageFromID(id) {
    let place = -1;
    for (let i = 0; this.messages.length; i++) {
      if (this.messages[i]._id == id) {
        place = i;
        break;
      }      
    }
      return place;
  }
}
