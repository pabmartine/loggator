package com.example.loggator.websocket;

import com.example.loggator.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class WebSocketClientImpl implements WebSocketClient {

	@Autowired
	private SimpMessagingTemplate webSocket;

	@Override
	public void send(Event event) {
		event.setSource(event.getSource().replace("-", "_"));
		webSocket.convertAndSend("/topic/events", event);
	}

}