import axios from "axios";
import React from "react";
import useAuth from "../../hooks/use-auth";
import Markdown from "markdown-to-jsx";

const LearningPath = () => {
  const [learningPath, setLearningPath] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { auth } = useAuth();
  const { user } = auth;

  React.useEffect(() => {
    const fetchLearningPath = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/user/path-generate/${user.id}`
        );
        setLoading(false);
        setLearningPath(response.data.data);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchLearningPath();
    }
  }, [user.id]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-pulse text-2xl text-gray-500">
        Generating your personalized learning path...
      </div>
    </div>
  );

  return (
    // wrap the markdown content inside the div only
    <div className="px-4 py-8 my-4">
      <Markdown 
        className="prose prose-lg prose-blue max-w-none" 
        options={{ 
          forceBlock: true,
          overrides: {
            h1: {
              component: 'h1',
              props: {
                className: 'text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500'
              }
            },
            h2: {
              component: 'h2',
              props: {
                className: 'text-2xl font-semibold text-gray-700 mt-6 mb-4 pl-2 border-l-4 border-blue-500'
              }
            },
            h3: {
              component: 'h3',
              props: {
                className: 'text-xl font-medium text-gray-600 mt-4 mb-2'
              }
            },
            p: {
              component: 'p',
              props: {
                className: 'text-gray-700 leading-relaxed mb-4'
              }
            },
            ul: {
              component: 'ul',
              props: {
                className: 'list-disc list-outside pl-6 mb-4 text-gray-700'
              }
            },
            ol: {
              component: 'ol',
              props: {
                className: 'list-decimal list-outside pl-6 mb-4 text-gray-700'
              }
            },
            li: {
              component: 'li',
              props: {
                className: 'mb-2'
              }
            }
          }
        }}
      >
        {learningPath}
      </Markdown>
    </div>
  );
};

export default LearningPath;