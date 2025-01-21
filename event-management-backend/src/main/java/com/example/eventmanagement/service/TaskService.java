package com.example.eventmanagement.service;

import com.example.eventmanagement.dto.TaskDTO;
import com.example.eventmanagement.model.Event;
import com.example.eventmanagement.model.Task;
import com.example.eventmanagement.repository.EventRepository;
import com.example.eventmanagement.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
//import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private EventRepository eventRepository;

    // Get all tasks
    public List<TaskDTO> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        return tasks.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get task by ID
    public TaskDTO getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        return convertToDTO(task);
    }

    // Create a new task
    public TaskDTO createTask(TaskDTO taskDTO) {
        Task task = convertToEntity(taskDTO);

        if (taskDTO.getEventId() != null) {
            Event event = eventRepository.findById(taskDTO.getEventId())
                    .orElseThrow(() -> new RuntimeException("Event not found with id: " + taskDTO.getEventId()));
            task.setEvent(event);
        }

        Task savedTask = taskRepository.save(task);
        return convertToDTO(savedTask);
    }

    // Update a task
    public TaskDTO updateTask(Long id, TaskDTO taskDTO) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    
        // Update status only if the status is provided
        if (taskDTO.getStatus() != null) {
            existingTask.setStatus(taskDTO.getStatus());
        }
    
        // Update name only if it is provided (not null or empty string)
        if (taskDTO.getName() != null && !taskDTO.getName().isEmpty()) {
            existingTask.setName(taskDTO.getName());
        }
    
        // Update deadline only if it is provided (not null)
        if (taskDTO.getDeadline() != null) {
            existingTask.setDeadline(taskDTO.getDeadline());
        }
    
        // If eventId is provided, update the event
        if (taskDTO.getEventId() != null) {
            Event event = eventRepository.findById(taskDTO.getEventId())
                    .orElseThrow(() -> new RuntimeException("Event not found with id: " + taskDTO.getEventId()));
            existingTask.setEvent(event);
        }
    
        Task updatedTask = taskRepository.save(existingTask);
        return convertToDTO(updatedTask);
    }
    

    // Delete a task
    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Task not found with id: " + id);
        }
        taskRepository.deleteById(id);
    }

    // Get tasks by event ID
    public List<TaskDTO> getTasksByEvent(Long eventId) {
        List<Task> tasks = taskRepository.findByEventId(eventId); // Assuming findByEventId is defined in TaskRepository
        return tasks.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }


    // Convert Task to TaskDTO
    private TaskDTO convertToDTO(Task task) {
        TaskDTO taskDTO = new TaskDTO();
        taskDTO.setId(task.getId());
        taskDTO.setName(task.getName());
        taskDTO.setDeadline(task.getDeadline());
        taskDTO.setStatus(task.getStatus());
        if (task.getEvent() != null) {
            taskDTO.setEventId(task.getEvent().getId());
        }
        return taskDTO;
    }

    // Convert TaskDTO to Task
    private Task convertToEntity(TaskDTO taskDTO) {
        Task task = new Task();
        task.setId(taskDTO.getId());
        task.setName(taskDTO.getName());
        task.setDeadline(taskDTO.getDeadline());
        task.setStatus(taskDTO.getStatus());
        return task;
    }
}
