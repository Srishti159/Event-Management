import axios from "axios";

const API_URL = "http://localhost:8080/api"; // Update the URL as needed

// Event API calls
export const getAllEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/events`);
      console.log('Fetched events:', response.data); // Add this line to check the data
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${API_URL}/events`, eventData);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
  }
};

// Task API calls
export const getAllTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, taskData);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
  }
};

// Attendee API calls
export const getAllAttendees = async () => {
  try {
    const response = await axios.get(`${API_URL}/attendees`);
    return response.data;
  } catch (error) {
    console.error("Error fetching attendees:", error);
  }
};

export const createAttendee = async (attendeeData) => {
  try {
    const response = await axios.post(`${API_URL}/attendees`, attendeeData);
    return response.data;
  } catch (error) {
    console.error("Error creating attendee:", error);
  }
};
