import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/article`)
            setCourses(response.data.data);
        } catch (error) {
            console.log(error)
        }
    }
    fetchCourses();
  }, []);

  return (
    <div>CoursesPage</div>
  )
}

export default CoursesPage