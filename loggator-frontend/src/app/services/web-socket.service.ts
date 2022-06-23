import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { MainComponent } from '../pages/main/main.component';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

    webSocketEndPoint: string = 'http://localhost:9001/ws';
    topic: string = "/topic/events";
    stompClient: any;
    mainComponent: MainComponent;

    constructor(mainComponent: MainComponent){
        this.mainComponent = mainComponent;
    }

    _connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function () {
            _this.stompClient.subscribe(_this.topic, function (event: any) {
                _this.onEventMessageReceived(event);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error: string) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

 /**
  * Send message to sever via web socket
  * @param {*} message 
  */
    _send(message: any) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/hello", {}, JSON.stringify(message));
    }

    onEventMessageReceived(message: any) {
        console.log("Event Message Recieved from Server :: " + message);
        this.mainComponent.handleMessage(JSON.parse(message.body));
    }

}
