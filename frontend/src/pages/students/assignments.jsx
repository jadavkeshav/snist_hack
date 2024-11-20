import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AssignmentPage = () => {
    const [assignments, setAssignments] = useState([]);
  
    useEffect(() => {
      const fetchAssignments = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/assignment/all`)
          setAssignments(response.data.data)
        } catch (error) {
          console.error('Error fetching assignments:', error);
        }
      };
  
      fetchAssignments(); // Call the async function
    }, []); // Add user.id as a dependency
  
    console.log(assignments)
  
  return (
    <div>AssignmentPage</div>
  )
}

export default AssignmentPage