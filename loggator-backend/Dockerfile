FROM openjdk:11
EXPOSE 9091
COPY ./target/loggator-backend-0.0.1-SNAPSHOT.jar /app.jar
ENTRYPOINT ["java", "-Dspring.profiles.active=prod","-jar","/app.jar"]
