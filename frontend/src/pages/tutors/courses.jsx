import { useEffect, useState } from 'react'
import axios from 'axios';
import useAuth from '../../hooks/use-auth';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const { auth } = useAuth();
  const { user } = auth;

  const instId = user.id;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/article/get-inst`, 
          { instId }
        );
        setCourses(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourses();
  }, [instId]);

  console.log(courses);

  return (
    <div>Courses</div>
  )
}

export default Courses