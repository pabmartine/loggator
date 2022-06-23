# LOGGATOR
Client-server web application for centralizing logs

## loggator-frontend
Angular application that communicates with the backend via websockets to receive log records and display them in a table

## loggator-backend
SpringBoot application that receives via webservice logs from different sources and communicates them to the frontend through websockets.

### Log senders
The different clients that send logs do so through a customized appender through logback. The code needed for this is the following:

**Custom Java Appender**

	package com.mypackage
	
	import ch.qos.logback.classic.spi.ILoggingEvent;  
	import ch.qos.logback.core.AppenderBase;  
	import lombok.Data;  
	import org.springframework.web.client.RestTemplate;  
	  
	import java.util.Date;  
	  
	@Data  
	public class CustomAppender extends AppenderBase<ILoggingEvent> {  
	  
	   @Data  
	  class LogEvent {  
	      private Date date;  
	      private String priority;  
	      private String source;  
	      private String message;  
	   }  
  
	  String source;  
  
	  @Override  
	  protected void append(ILoggingEvent event) {  
  
      CustomAppender.LogEvent logEvent = new CustomAppender.LogEvent();  
      logEvent.setDate(new Date());  
      logEvent.setSource(source);  
      logEvent.setPriority(event.getLevel().toString());  
      logEvent.setMessage(event.getFormattedMessage());  
  
      new RestTemplate().postForEntity("http://localhost:9001/rest/event", logEvent, CustomAppender.LogEvent.class);  
	   }  
	}

**Logback Appender**

	<?xml version="1.0" encoding="UTF-8"?>  
	<configuration>  
	    <property name="APPLICATION_NAME" value="Application Name"/>  
	    <appender name="CUSTOM" class="com.mypackage.CustomAppender">  
	        <source>${APPLICATION_NAME}</source>  
	    </appender>  
	    <root level="INFO">  
	        <appender-ref ref="CUSTOM"/>  
	    </root>  
	</configuration>