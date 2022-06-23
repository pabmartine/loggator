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

  sourceColorMap: Map<string, string> = new Map<string, string>();
  priorityColorMap: Map<string, string> = new Map<string, string>();


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
      this.priorityColorMap.set(event.priority, "#ffffff")
    }
    if (!this.sources.includes(event.source)) {
      this.sources.push(event.source);
      this.sourceColorMap.set(event.source, "#ffffff")

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

  changeSourceColor(key: string, value: string) {
    this.sourceColorMap.set(key, value);
  }

  changePriorityColor(key: string, value: string) {
    this.priorityColorMap.set(key, value);
  }

  getSourceColor(source: string) {
    let color = this.sourceColorMap.get(source);
    if (!color)
      color = "#ffffff";

    return { 'background-color': color };
  }

  getPriorityColor(priority: string) {
    let color = this.priorityColorMap.get(priority);
    if (!color)
      color = "#ffffff";

    return { 'background-color': color };
  }
}
