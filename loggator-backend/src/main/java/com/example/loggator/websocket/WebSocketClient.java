package com.example.loggator.websocket;

import com.example.loggator.model.Event;

public interface WebSocketClient {

	public void send(Event event);
}
