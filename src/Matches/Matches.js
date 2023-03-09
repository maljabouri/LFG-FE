import React, { useState, useEffect } from 'react';
import Bio from './Bio';
import Rankings from './Rankings';
import DisplayPicture from './DisplayPicture';

function Matches() {
  const [currentMatch, setCurrentMatch] = useState({});
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true);

      try {
        // Make API call to fetch matches
        const response = await fetch('https://example.com/api/matches');
        const data = await response.json();
        setMatches(data);
        setCurrentMatch(data[0]);
      } catch (error) {
        setError(error);
      }

      setIsLoading(false);
    };

    fetchMatches();
  }, []);

  const handleDislike = () => {
    // Handle dislike logic here, e.g. update database, fetch next match
    const index = matches.findIndex((match) => match.id === currentMatch.id);
    if (index < matches.length - 1) {
      setCurrentMatch(matches[index + 1]);
    } else {
      // Handle end of matches
    }
  };

  const handleLike = () => {
    // Handle like logic here, e.g. update database, fetch next match
    const index = matches.findIndex((match) => match.id === currentMatch.id);
    if (index < matches.length - 1) {
      setCurrentMatch(matches[index + 1]);
    } else {
      // Handle end of matches
    }
  };

  return (
    <div>
      {isLoading && <p>Loading matches...</p>}
      {error && <p>Error loading matches: {error.message}</p>}
      {!isLoading && !error && (
        <>
          <DisplayPicture imageUrl={currentMatch.imageUrl} />
          <Bio bio={currentMatch.bio} />
          <Rankings rankings={currentMatch.rankings} />
          <button onClick={handleDislike}>Dislike</button>
          <button onClick={handleLike}>Like</button>
        </>
      )}
    </div>
  );
}

export default Matches;
