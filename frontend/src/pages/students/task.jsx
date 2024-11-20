import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, Chip, Button } from "@nextui-org/react";
import { IoDocumentAttach } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { CgCap, CgLock } from "react-icons/cg";

const TaskPage = () => {
  const { taskId } = useParams(); // Changed from assignmentId to taskId
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  
  console.log(taskId) // Updated console log

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/assignment/${taskId}`
        );
        console.log(response.data)
        setAssignment(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching assignment:", error);
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [taskId]); // Updated dependency to taskId

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-xl text-gray-500">
          Loading Assignment Details...
        </div>
      </div>
    );
  }

  if (!assignment) {
    return <p className="text-center mt-8">No assignment found</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 bg-white shadow-xl">
          <div className="flex items-center mb-6">
            <IoDocumentAttach className="w-10 h-10 mr-4 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">{assignment.title}</h1>
          </div>
          
          <p className="text-gray-600 mb-6 text-lg">{assignment.description}</p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <FaStar className="w-6 h-6 mr-2 text-yellow-500" />
              <div>
                <span className="font-semibold">Topic</span>
                <Chip size="sm" variant="flat" color="primary" className="ml-2">
                  {assignment.topic}
                </Chip>
              </div>
            </div>
            
            <div className="flex items-center">
              <CgCap className="w-6 h-6 mr-2 text-green-500" />
              <div>
                <span className="font-semibold">Max Marks</span>
                <span className="ml-2 text-gray-700">{assignment.maxMarks}</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <CgLock className="w-6 h-6 mr-2 text-red-500" />
              <div>
                <span className="font-semibold">Status</span>
                <Chip 
                  size="sm" 
                  variant="flat" 
                  color={assignment.status === "Pending" ? "warning" : "success"}
                  className="ml-2"
                >
                  {assignment.status}
                </Chip>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Quiz Questions</h2>
          
          {assignment.quiz?.questions.map((question, index) => (
            <div 
              key={question._id} 
              className="bg-gray-50 p-4 rounded-lg mb-4 hover:bg-gray-100 transition"
            >
              <div className="flex items-center mb-2">
                <span className="font-bold mr-2">Q{index + 1}:</span>
                <span className="text-gray-700">{question.questionText}</span>
              </div>
              <ul className="pl-6 space-y-1">
                {question.options.map((option, idx) => (
                  <li 
                    key={idx} 
                    className="text-gray-600 before:content-['•'] before:mr-2 before:text-blue-500"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <Button color="primary" variant="solid" className="mt-6 w-full">
            Start Assignment
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default TaskPage;