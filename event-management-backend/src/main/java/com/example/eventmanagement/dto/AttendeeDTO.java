package com.example.eventmanagement.dto;

public class AttendeeDTO {
    private Long id;
    private String name;
    private String email;
    private Long eventId; // Add this field
    private String eventName;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getEventId() { // Getter for eventId
        return eventId;
    }

    public void setEventId(Long eventId) { // Setter for eventId
        this.eventId = eventId;
    }
    
    public String getEventName() {  // Getter for event name
        return eventName;
    }

    public void setEventName(String eventName) {  // Setter for event name
        this.eventName = eventName;
    }
}
