import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/use-auth';
import axios from 'axios';

const TutorAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const { auth } = useAuth();
  const { user } = auth;

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/assignment/get-inst-assign`, {
          instId: user.id,
        });
        setAssignments(response.data.data)
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchAssignments(); // Call the async function
  }, [user.id]); // Add user.id as a dependency

  console.log(assignments)

  return (
    <div>
      <h1>Tutor Assignments</h1>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment._id}>{assignment.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TutorAssignments;
