import axios from "axios";
import { Input, Textarea, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import useAuth from "../../hooks/use-auth";

const CreateAssignment = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, register, watch, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
      topic: "",
      maxMarks: 0,
      badge: "",
      questions: [
        { questionText: "", options: [""], correctOption: 0 },
      ],
    },
  });
  const { auth } = useAuth();
  const { user } = auth;

  const onSubmit = async (data) => {
    try {
      const formData = {
        title: data.title,
        description: data.description,
        topic: data.topic,
        maxMarks: parseInt(data.maxMarks),
        badge: data.badge,
        createdBy: user.id,
        quiz: {
          questions: data.questions.map((q) => ({
            questionText: q.questionText,
            options: q.options,
            correctOption: parseInt(q.correctOption),
          })),
        },
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/assignment/create`, formData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating assignment:", error);
      alert("Failed to create assignment. Please try again.");
    }
  };

  const addQuestion = () => {
    const questions = watch("questions");
    setValue("questions", [
      ...questions,
      { questionText: "", options: [""], correctOption: 0 },
    ]);
  };

  const addOption = (questionIndex) => {
    const questions = watch("questions");
    questions[questionIndex].options.push("");
    setValue("questions", [...questions]);
  };

  return (
    <div className="flex flex-col min-h-screen w-full items-start overflow-y-auto p-4">
      <h1 className="text-center font-semibold text-xl mb-4">Create Assignment</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-4 border rounded-md p-4"
      >
        <Input
          label="Title"
          placeholder="Enter the title"
          {...register("title", { required: "Title is required" })}
        />
        <Textarea
          label="Description"
          placeholder="Enter the description"
          {...register("description", { required: "Description is required" })}
        />
        <Input
          label="Topic"
          placeholder="Enter the topic"
          {...register("topic", { required: "Topic is required" })}
        />
        <Input
          label="Maximum Marks"
          type="number"
          placeholder="Enter maximum marks"
          {...register("maxMarks", { required: true, min: 0 })}
        />
        <Input
          label="Badge Name"
          placeholder="Enter badge name"
          {...register("badge")}
        />

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Quiz Questions</h2>
          {watch("questions").map((question, questionIndex) => (
            <div key={questionIndex} className="border p-4 rounded-md">
              <Input
                label={`Question ${questionIndex + 1}`}
                placeholder="Enter question text"
                {...register(`questions.${questionIndex}.questionText`, {
                  required: "Question text is required",
                })}
              />
              {question.options.map((option, optionIndex) => (
                <Input
                  key={optionIndex}
                  label={`Option ${optionIndex + 1}`}
                  placeholder={`Option ${optionIndex + 1}`}
                  {...register(
                    `questions.${questionIndex}.options.${optionIndex}`,
                    { required: "Option text is required" }
                  )}
                />
              ))}
              <Input
                label="Correct Option Number"
                type="number"
                placeholder="Enter the correct option number"
                {...register(`questions.${questionIndex}.correctOption`, {
                  required: true,
                  min: 1,
                  max: question.options.length,
                })}
              />
              <Button onClick={() => addOption(questionIndex)} type="button">
                Add Option
              </Button>
            </div>
          ))}
          <Button onClick={addQuestion} type="button">
            Add Question
          </Button>
        </div>

        <Button type="submit" color="primary">
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreateAssignment;
