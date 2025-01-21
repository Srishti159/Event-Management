package com.example.eventmanagement.repository;

import com.example.eventmanagement.model.Attendee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendeeRepository extends JpaRepository<Attendee, Long> {}
