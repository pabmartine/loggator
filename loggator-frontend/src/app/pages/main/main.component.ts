import { Component, OnDestroy, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { Event } from 'src/app/model/Event';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  webSocketAPI: WebSocketService;

  events: Event[] = [];

  priorities: string[] = [];
  sources: string[] = [];

  constructor() {
    this.webSocketAPI = new WebSocketService(this);
  }


  ngOnInit(): void {
    this.webSocketAPI._connect();
  }

  ngOnDestroy(): void {
    this.webSocketAPI._disconnect();
  }

  handleMessage(event: Event) {
    if (!this.priorities.includes(event.priority)) {
      this.priorities.push(event.priority);
    }
    if (!this.sources.includes(event.source)) {
      this.sources.push(event.source);
    }
    this.events.unshift(event);
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  clear() {
    this.events.length = 0;
  }

  sort(sort: SortEvent) {
    console.log(sort);

    if (sort.field == 'date') {
      if (sort.order == 1) {
        this.events.sort((a, b) => a.date.localeCompare(b.date))
      } else if (sort.order == -1) {
        this.events.sort((a, b) => b.date.localeCompare(a.date))
      }
    }
    if (sort.field == 'source') {
      if (sort.order == 1) {
        this.events.sort((a, b) => a.source.toString().localeCompare(b.source.toString()))
      } else if (sort.order == -1) {
        this.events.sort((a, b) => b.source.toString().localeCompare(a.source.toString()))
      }
    }

    if (sort.field == 'message') {
      if (sort.order == 1) {
        this.events.sort((a, b) => a.message.localeCompare(b.message))
      } else if (sort.order == -1) {

        this.events.sort((a, b) => b.message.localeCompare(a.message))
      }
    }
  }
}
