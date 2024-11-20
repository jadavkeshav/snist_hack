import React, { useEffect, useState } from "react";
import useAuth from "../hooks/use-auth";
import axios from "axios";
import { Card, Avatar, Badge } from "@nextui-org/react";

const LeaderboardCard = ({ mentor, rank }) => {
  // Check if mentor exists and has required properties
  if (!mentor) return null;

  return (
    <Card className="mb-4 p-4">
      {/* Rank */}
      <div className="text-sm text-gray-500">#{rank}</div>
      
      {/* Avatar */}
      <Avatar src={mentor.avatar} className="w-20 h-20 mx-auto my-2" />
      
      {/* Mentor Details */}
      <div className="text-center">
        <h3 className="font-bold">{mentor.name || 'Unknown'}</h3>
        <p className="text-sm text-gray-600">{mentor.email || 'No email'}</p>
        
        <p className="mt-2">
          <strong>Institute:</strong> {mentor.institute || 'N/A'}
        </p>
        
        <div className="mt-2">
          <strong>Interests:</strong>
          {mentor.interest && mentor.interest.length > 0 ? (
            mentor.interest.map((interest, index) => (
              <Badge key={index} variant="flat" className="mr-1">
                {interest}
              </Badge>
            ))
          ) : (
            <span>No interests</span>
          )}
        </div>
        
        {/* Coins and Actions */}
        <div className="mt-2 font-semibold">
          Coins: {mentor.coins || 0}
        </div>
      </div>
    </Card>
  );
};

const MentorsLeaderboard = () => {
  const [mentors, setMentors] = useState([]);
  const { auth } = useAuth();
  const { user } = auth;

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        if (!user?.id) return;

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/suggest-instructors/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        
        // Ensure data is an array before setting state
        const fetchedMentors = Array.isArray(response.data.data) 
          ? response.data.data 
          : [];
        
        setMentors(fetchedMentors);
      } catch (error) {
        console.error("Error fetching mentors:", error);
        setMentors([]); // Reset to empty array on error
      }
    };

    fetchMentors();
  }, [user?.id, auth.token]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Mentors Leaderboard</h2>
      
      {mentors.length === 0 ? (
        <p className="text-center text-gray-500">No mentors found</p>
      ) : (
        <div>
          {mentors.map((mentor, index) => (
            <LeaderboardCard 
              key={mentor._id || index} 
              mentor={mentor} 
              rank={index + 1} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MentorsLeaderboard;