import React from 'react';

function Rankings({ rankings }) {
  return (
    <div>
      <h3>Rankings:</h3>
      <ul>
        {rankings.map((ranking, index) => (
          <li key={index}>
            {ranking.category}: {ranking.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rankings;
