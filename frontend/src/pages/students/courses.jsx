import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Button, Badge, Chip } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { FaTags, FaUserAlt } from "react-icons/fa";
import { CgCalendar } from "react-icons/cg";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/dashboard/courses/${course._id}`);
  };

  return (
    <Card
      className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white"
      shadow="md"
    >
      <div className="flex justify-between items-center mb-4">
        <Badge
          color={course.published ? "success" : "warning"}
          variant="flat"
        >
          {course.published ? "Published" : "Draft"}
        </Badge>
        <div className="flex items-center text-gray-500 text-sm">
          <CgCalendar className="w-4 h-4 mr-2" />
          {new Date(course.createdAt).toLocaleDateString()}
        </div>
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        {course.title}
      </h2>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {course.description}
      </p>

      <div className="mb-4 space-y-2">
        <div className="flex items-center">
          <FaUserAlt className="w-5 h-5 mr-2 text-blue-500" />
          <span className="font-medium">Author:</span>
          <span className="ml-2 text-gray-700">{course.author}</span>
        </div>
        <div className="flex items-center">
          <FaTags className="w-5 h-5 mr-2 text-yellow-500" />
          <span className="font-medium">Tags:</span>
          <div className="flex gap-2 ml-2">
            {course.tags.map((tag, index) => (
              <Chip key={index} size="sm" variant="flat" color="primary">
                {tag}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <Button
        variant="solid"
        color="primary"
        className="w-full"
        onClick={handleNavigate}
      >
        Read More 
      </Button>
    </Card>
  );
};



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
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">📚 Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  )
}

export default CoursesPage