package com.example.loggator.rest;

import com.example.loggator.model.Event;
import com.example.loggator.websocket.WebSocketClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest")
public class EventRestController {

	@Autowired
	WebSocketClient webSocketClient;

	@PostMapping(value = "/event", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> send(@RequestBody Event event) {
		webSocketClient.send(event);
		return new ResponseEntity<>(HttpStatus.OK);
	}



}
