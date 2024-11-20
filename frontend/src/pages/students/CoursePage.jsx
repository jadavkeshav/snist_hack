import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Markdown from "markdown-to-jsx";
import { Badge, Chip } from "@nextui-org/react";
import { FaEye, FaUserAlt } from "react-icons/fa";
import { CgCalendar } from "react-icons/cg";

const CoursePage = () => {
  const { id } = useParams(); // Fetching the article ID from the route
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/article/${id}`
        );
        setCourse(response.data.data); // Assuming the endpoint returns one article
      } catch (error) {
        console.error("Failed to fetch course:", error);
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) {
    return <p>Loading...</p>; // Loading state
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <FaUserAlt className="text-blue-500 w-5 h-5" />
            <span className="text-gray-600 font-medium">{course.author}</span>
          </div>
          <div className="flex items-center gap-4">
            <CgCalendar className="text-green-500 w-5 h-5" />
            <span className="text-gray-500">
              {new Date(course.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <FaEye className="text-yellow-500 w-5 h-5" />
            <span className="text-gray-600">{course.views} Views</span>
          </div>
        </div>

        <div className="mb-4 space-x-2">
          {course.tags.map((tag, index) => (
            <Chip key={index} size="sm" variant="flat" color="primary">
              {tag}
            </Chip>
          ))}
        </div>

        <div className="prose max-w-none mb-6">
          <Markdown
            options={{
              overrides: {
                h1: {
                  component: "h1",
                  props: { className: "text-3xl font-bold mb-4" },
                },
                h2: {
                  component: "h2",
                  props: { className: "text-2xl font-semibold mb-3" },
                },
                p: {
                  component: "p",
                  props: { className: "text-gray-700 mb-2" },
                },
                ul: {
                  component: "ul",
                  props: { className: "list-disc ml-5 mb-2" },
                },
                ol: {
                  component: "ol",
                  props: { className: "list-decimal ml-5 mb-2" },
                },
                code: {
                  component: "code",
                  props: {
                    className:
                      "bg-gray-100 text-red-500 p-1 rounded-md font-mono",
                  },
                },
              },
            }}
          >
            {course.content}
          </Markdown>
        </div>

        <Badge
          color={course.published ? "success" : "warning"}
          variant="flat"
        >
          {course.published ? "Published" : "Draft"}
        </Badge>
      </div>
    </div>
  );
};

export default CoursePage;
