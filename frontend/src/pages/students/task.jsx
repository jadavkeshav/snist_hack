import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Card, 
  Button, 
  Radio, 
  RadioGroup, 
  Divider 
} from "@nextui-org/react";
import useAuth from "../../hooks/use-auth";

const TaskPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { user } = auth;

  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/assignment/${taskId}`
        );
        setAssignment(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching assignment:", error);
        setLoading(false);
        setError("Failed to load assignment");
      }
    };

    fetchAssignment();
  }, [taskId]);

  const calculateGrade = () => {
    if (!assignment?.quiz?.questions) return 0;

    const correctAnswers = assignment.quiz.questions.filter(
      (question) => answers[question._id] === question.correctAnswer
    );

    return Math.round(
      (correctAnswers.length / assignment.quiz.questions.length) * assignment.maxMarks
    );
  };

  const handleSubmit = async () => {
    // Validate all questions are answered
    if (Object.keys(answers).length !== assignment.quiz.questions.length) {
      setError("Please answer all questions before submitting");
      return;
    }

    try {
      const grade = calculateGrade();

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/assignment/submit`,
        {
          assignmentId: taskId,
          studentId: user.id,
          grade: grade
        }
      );

      if (response.data.success) {
        navigate("/dashboard", {
          state: {
            message: `Assignment submitted successfully! Earned ${grade} coins.`,
            updatedCoins: response.data.data.updatedCoins
          }
        });
      } else {
        setError(response.data.message || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting assignment:", error);
      setError(error.response?.data?.message || "An unexpected error occurred");
    }
  };

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-xl text-gray-500">
          Loading Assignment...
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
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            {assignment.title}
          </h1>

          <Divider className="my-4" />

          <p className="text-gray-600 mb-6 text-lg text-center">
            {assignment.description}
          </p>

          <div className="space-y-6">
            {assignment.quiz?.questions.map((question, index) => (
              <div 
                key={question._id} 
                className="bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <h2 className="text-lg font-semibold mb-4">
                  Q{index + 1}: {question.questionText}
                </h2>

                <RadioGroup
                  value={answers[question._id] || ''}
                  onValueChange={(value) => 
                    handleAnswerChange(question._id, value)
                  }
                >
                  {question.options.map((option, optionIndex) => (
                    <Radio 
                      key={`${question._id}-${optionIndex}`}
                      value={option}
                      className="mb-2"
                    >
                      {option}
                    </Radio>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </div>

          <Button 
            color="primary" 
            variant="solid" 
            className="mt-8 w-full"
            onClick={handleSubmit}
            isDisabled={
              Object.keys(answers).length !== assignment.quiz.questions.length
            }
          >
            Submit Assignment
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default TaskPage;