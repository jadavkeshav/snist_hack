import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/use-auth';
import axios from 'axios';

const MentorsPage = () => {
  const [mentors, setMentors] = useState([]);
  const { auth } = useAuth()
  const { user } = auth

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        // Include studentId as a query parameter
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/suggest-instructors/${user.id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        });
        setMentors(response.data); // Update mentors state with fetched data
      } catch (error) {
        console.error('Error fetching mentors:', error);
      }
    };

    if (user?.id) {
      fetchMentors(); // Fetch mentors only if user.id is available
    }
  }, [user?.id]); // Add user.id as a dependency

  console.log(mentors);

  return (
    <div>MentorsPage</div>
  )
}

export default MentorsPage