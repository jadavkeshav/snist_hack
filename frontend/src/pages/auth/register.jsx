import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Logo from "../../assets/logo.svg";
import axios from "axios";
import { useState } from "react";

const userType = [
  { key: "student", label: "Student" },
  { key: "inst", label: "Instructor" },
];

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

const RegisterPage = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, register } = useForm();
  const [selectedInterests, setSelectedInterests] = useState(new Set([]));

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        data
      );
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="lg:w-1/3 w-1/2 px-8 py-6">
        <CardHeader className="flex justify-center items-center space-x-2">
          <img src={Logo} alt="Logo" className="w-8 h-8" />
          <h1 className="text-3xl font-bold text-center text-primary-50">
            BrainQuest
          </h1>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col items-center space-y-4 justify-center">
          <h1 className="text-2xl font-bold text-center">Hello there!</h1>
          <p className="text-center">Register to your account to continue</p>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
            <Input
              type="email"
              placeholder="Email"
              label="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            <Input
              type="text"
              placeholder="Username"
              label="Username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 6 characters long",
                },
              })}
            />
            <Input
              type="password"
              placeholder="Password"
              label="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />            
            {/* institute */}
            <Input type="text" placeholder="Institute" label="Institute" {...register("institute")} />
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select 
                  label="Select User Type"
                  onChange={field.onChange}
                  value={field.value}
                >
                  {userType.map((type) => (
                    <SelectItem key={type.key}>{type.label}</SelectItem>
                  ))}
                </Select>
              )}
            />

            <Controller
              name="interest"
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
                Register
              </Button>
            </div>
          </form>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="flex justify-center">
            Already have an account?&nbsp;
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
