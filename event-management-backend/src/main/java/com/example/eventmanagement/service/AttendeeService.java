package com.example.eventmanagement.service;

import com.example.eventmanagement.dto.AttendeeDTO;
import com.example.eventmanagement.model.Attendee;
import com.example.eventmanagement.model.Event;
import com.example.eventmanagement.repository.AttendeeRepository;
import com.example.eventmanagement.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
//import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AttendeeService {

    @Autowired
    private AttendeeRepository attendeeRepository;

    @Autowired
    private EventRepository eventRepository;

    // Get all attendees
    public List<AttendeeDTO> getAllAttendees() {
        List<Attendee> attendees = attendeeRepository.findAll();
        return attendees.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get attendee by ID
    public AttendeeDTO getAttendeeById(Long id) {
        Attendee attendee = attendeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendee not found with id: " + id));
        return convertToDTO(attendee);
    }

   // Create a new attendee
   public AttendeeDTO createAttendee(AttendeeDTO attendeeDTO) {
    Event event = eventRepository.findById(attendeeDTO.getEventId())
            .orElseThrow(() -> new RuntimeException("Event not found"));

    Attendee attendee = new Attendee();
    attendee.setName(attendeeDTO.getName());
    attendee.setEmail(attendeeDTO.getEmail());
    attendee.setEvent(event);

    Attendee savedAttendee = attendeeRepository.save(attendee);

    // Convert to DTO to avoid circular reference
    AttendeeDTO responseDTO = new AttendeeDTO();
    responseDTO.setId(savedAttendee.getId());
    responseDTO.setName(savedAttendee.getName());
    responseDTO.setEmail(savedAttendee.getEmail());
    responseDTO.setEventId(savedAttendee.getEvent().getId());
    responseDTO.setEventName(savedAttendee.getEvent().getName());
    return responseDTO;
}


    // Update an attendee
    public AttendeeDTO updateAttendee(Long id, AttendeeDTO attendeeDTO) {
        Attendee existingAttendee = attendeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendee not found with id: " + id));

        existingAttendee.setName(attendeeDTO.getName());
        existingAttendee.setEmail(attendeeDTO.getEmail());

        if (attendeeDTO.getEventId() != null) {
            Event event = eventRepository.findById(attendeeDTO.getEventId())
                    .orElseThrow(() -> new RuntimeException("Event not found with id: " + attendeeDTO.getEventId()));
            existingAttendee.setEvent(event);
        }

        Attendee updatedAttendee = attendeeRepository.save(existingAttendee);
        return convertToDTO(updatedAttendee);
    }

    // Delete an attendee
    public void deleteAttendee(Long id) {
        if (!attendeeRepository.existsById(id)) {
            throw new RuntimeException("Attendee not found with id: " + id);
        }
        attendeeRepository.deleteById(id);
    }

    // Convert Attendee to AttendeeDTO
    private AttendeeDTO convertToDTO(Attendee attendee) {
        AttendeeDTO attendeeDTO = new AttendeeDTO();
        attendeeDTO.setId(attendee.getId());
        attendeeDTO.setName(attendee.getName());
        attendeeDTO.setEmail(attendee.getEmail());
    
        // Include the event name in the DTO
        if (attendee.getEvent() != null) {
            attendeeDTO.setEventName(attendee.getEvent().getName());  // Add the event name
        }
        return attendeeDTO;
    }

    // Convert AttendeeDTO to Attendee
    /*private Attendee convertToEntity(AttendeeDTO attendeeDTO) {
        Attendee attendee = new Attendee();
        attendee.setId(attendeeDTO.getId());
        attendee.setName(attendeeDTO.getName());
        attendee.setEmail(attendeeDTO.getEmail());
        return attendee;
    }*/
}
