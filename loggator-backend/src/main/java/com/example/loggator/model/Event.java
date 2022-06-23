package com.example.loggator.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@Data
public class Event {

	private Date date;
	private String source;
	private String priority;
	private String message;

}
