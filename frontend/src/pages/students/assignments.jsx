import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Badge, Button, Chip } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { IoDocumentAttach } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { CgCalendar, CgCap, CgLock } from "react-icons/cg";

const AssignmentPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/assignment/all`
        );
        setAssignments(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching assignments:", error);
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-xl text-gray-500">
          Loading Assignments...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 flex items-center justify-center">
          <IoDocumentAttach className="w-8 h-8 mr-3 text-blue-600" />
          Assignments
        </h1>
        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {assignments.map((assignment) => (
            <AssignmentCard key={assignment._id} assignment={assignment} />
          ))}
        </div>
      </div>
    </div>
  );
};

const AssignmentCard = ({ assignment }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/dashboard/assignments/${assignment._id}`);
  };

  return (
    <Card 
      className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white"
      shadow="md"
    >
      <div className="flex justify-between items-center mb-4">
        <Badge 
          color={assignment.status === "Pending" ? "warning" : "success"}
          variant="flat"
        >
          {assignment.status}
        </Badge>
        <div className="flex items-center text-gray-500 text-sm">
          <CgCalendar className="w-4 h-4 mr-2" />
          {new Date(assignment.createdAt).toLocaleDateString()}
        </div>
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">{assignment.title}</h2>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{assignment.description}</p>
      
      <div className="mb-4 space-y-2">
        <div className="flex items-center">
          <FaStar className="w-5 h-5 mr-2 text-yellow-500" />
          <span className="font-medium">Topic:</span>
          <Chip size="sm" variant="flat" color="primary" className="ml-2">
            {assignment.topic}
          </Chip>
        </div>
        <div className="flex items-center">
          <CgLock className="w-5 h-5 mr-2 text-green-500" />
          <span className="font-medium">Max Marks:</span>
          <span className="ml-2 text-gray-700">{assignment.maxMarks}</span>
        </div>
      </div>
      
      <Button
        variant="solid"
        color="primary"
        className="w-full"
        onClick={handleNavigate}
      >
        View Assignment
      </Button>
    </Card>
  );
};

export default AssignmentPage;