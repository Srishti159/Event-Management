package com.example.eventmanagement.controller;

import com.example.eventmanagement.dto.AttendeeDTO;
//import com.example.eventmanagement.model.Attendee;
import com.example.eventmanagement.service.AttendeeService;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendees")
public class AttendeeController {

    @Autowired
    private AttendeeService attendeeService;

    @GetMapping
    public List<AttendeeDTO> getAllAttendees() {
        return attendeeService.getAllAttendees();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttendeeDTO> getAttendeeById(@PathVariable Long id) {
        AttendeeDTO attendee = attendeeService.getAttendeeById(id);
        return ResponseEntity.ok(attendee);
    }

    @PostMapping
    public ResponseEntity<AttendeeDTO> createAttendee(@RequestBody AttendeeDTO attendeeDTO) {
        AttendeeDTO createdAttendee = attendeeService.createAttendee(attendeeDTO);
        return ResponseEntity.ok(createdAttendee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AttendeeDTO> updateAttendee(@PathVariable Long id, @RequestBody AttendeeDTO attendeeDTO) {
        AttendeeDTO updatedAttendee = attendeeService.updateAttendee(id, attendeeDTO);
        return ResponseEntity.ok(updatedAttendee);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAttendee(@PathVariable Long id) {
        attendeeService.deleteAttendee(id);
        return ResponseEntity.ok("Attendee deleted successfully");
    }
}
