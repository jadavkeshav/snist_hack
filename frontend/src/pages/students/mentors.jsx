import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/use-auth";
import axios from "axios";
import { Card, Badge, Button } from "@nextui-org/react";

const MentorsPage = () => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null); // State to track selected mentor
  const { auth } = useAuth();
  const { user } = auth;

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/suggest-instructors/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setMentors(response.data.data); // Update mentors state with fetched data
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    if (user?.id) {
      fetchMentors(); // Fetch mentors only if user.id is available
    }
  }, [user?.id]);

  // Render mentor list or mentor details based on selectedMentor state
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {selectedMentor ? (
        <MentorDetail mentor={selectedMentor} onBack={() => setSelectedMentor(null)} />
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-6 text-center">Suggested Mentors</h1>
          {mentors.length === 0 ? (
            <p className="text-center">No mentors found</p>
          ) : (
            <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {mentors.map((mentor) => (
                <MentorCard
                  key={mentor.instructorId}
                  mentor={mentor}
                  onSelect={() => setSelectedMentor(mentor)} // Set selected mentor on card click
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MentorsPage;

// MentorCard Component
const MentorCard = ({ mentor, onSelect }) => (
  <Card className="p-4">
    <h2 className="text-lg font-bold">{mentor.name}</h2>
    <p className="text-sm text-gray-600">{mentor.email}</p>
    <div className="mt-2">
      <strong>Matched Interests:</strong>
      <div className="flex flex-wrap gap-2 mt-2">
        {mentor.matchedInterests.map((interest, index) => (
          <Badge key={index} color="primary">
            {interest}
          </Badge>
        ))}
      </div>
    </div>
    <Button
      variant="flat"
      color="primary"
      size="sm"
      className="mt-4"
      onClick={onSelect} // Call the onSelect callback to set selected mentor
    >
      View Details
    </Button>
  </Card>
);

// MentorDetail Component
const MentorDetail = ({ mentor, onBack }) => (
  <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
    <Button
      size="sm"
      color="secondary"
      variant="flat"
      className="mb-4"
      onClick={onBack} // Call the onBack callback to return to mentor list
    >
      Back to List
    </Button>
    <h1 className="text-2xl font-bold mb-4">{mentor.name}</h1>
    <p className="text-gray-600 mb-6">{mentor.email}</p>
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Matched Interests:</h2>
      <ul className="list-disc pl-6">
        {mentor.matchedInterests.map((interest, index) => (
          <li key={index}>{interest}</li>
        ))}
      </ul>
    </div>
  </div>
);
