import axios from "axios";
import { 
    Input,
    Textarea,
    Button,
    Select,
    SelectItem,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import useAuth from "../../hooks/use-auth";


const interests = [
    { key: "react", label: "React" },
    { key: "node.js", label: "Node.js" },
    { key: "python", label: "Python" },
    { key: "java", label: "Java" },
    { key: "c++", label: "C++" },
    { key: "c#", label: "C#" },
    { key: "html", label: "HTML" },
    { key: "css", label: "CSS" },
    { key: "javascript", label: "JavaScript" },
    { key: "typescript", label: "TypeScript" },
    { key: "django", label: "Django" },
    { key: "flask", label: "Flask" },
    { key: "express", label: "Express" },
    { key: "angular", label: "Angular" },
    { key: "vue", label: "Vue" },
    { key: "mongodb", label: "MongoDB" },
    { key: "sql", label: "SQL" },
    { key: "postgresql", label: "PostgreSQL" },
    { key: "mysql", label: "MySQL" },
    { key: "firebase", label: "Firebase" },
    { key: "aws", label: "AWS" },
    { key: "azure", label: "Azure" },
    { key: "gcp", label: "GCP" },
    { key: "docker", label: "Docker" },
    { key: "kubernetes", label: "Kubernetes" },
    { key: "jenkins", label: "Jenkins" },
    { key: "git", label: "Git" },
    { key: "github", label: "GitHub" },
    { key: "gitlab", label: "GitLab" },
    { key: "bitbucket", label: "Bitbucket" },
    { key: "jira", label: "Jira" },
    { key: "confluence", label: "Confluence" },
    { key: "slack", label: "Slack" },
    { key: "trello", label: "Trello" },
    { key: "asana", label: "Asana" },
    { key: "notion", label: "Notion" },
    { key: "figma", label: "Figma" },
    { key: "sketch", label: "Sketch" }
  ];

const CreateCourse = () => {
    const navigate = useNavigate();
    const { control, handleSubmit, register } = useForm();
    const { auth } = useAuth();
    const { user } = auth;

    const [selectedInterests, setSelectedInterests] = useState(new Set([]));

    const onSubmit = async (data) => {
        try {
          data.author = user.id;
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/article`,
            data
          );
          navigate("/dashboard");
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <div className="flex flex-col min-h-screen w-full items-start m-4">
            <h1 className="text-center font-semibold text-xl">
                Create a course/Article
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full space-y-4 p-4 border-1 rounded-md">
            <Input
              type="text"
              placeholder="Title of the Article"
              label="Title"
              {...register("title", {
                required: "Title is required"
              })}
              className="border-[2px]"
            />
            <Textarea
                label="Course content"
                placeholder="Enter your content or what you want to teach in this article..."
                className="w-full border-[2px]"
                {...register("content", {
                    required: "Content is required"
                })}
            />
            <Controller
              name="tags"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <Select
                  label="Select Interests"
                  selectionMode="multiple"
                  selectedKeys={selectedInterests}
                  onSelectionChange={(keys) => {
                    setSelectedInterests(keys);
                    field.onChange(Array.from(keys));
                  }}
                  className="border-[2px]"
                >
                  {interests.map((interest) => (
                    <SelectItem key={interest.key} value={interest.key}>
                      {interest.label}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
            <div className="flex justify-center">
              <Button color="primary" type="submit" className="w-full">
                Publish Article/Course
              </Button>
            </div>
            </form>
        </div>
    )
}

export default CreateCourse