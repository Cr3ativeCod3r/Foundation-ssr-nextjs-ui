import React from 'react';

const ComingSoon = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gren-300 to-green-400 ">
      <div className="p-4 max-w-md text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
          Zakładka dostępna wkrótce
        </h1>
        <p className="text-green-700 text-lg md:text-xl">
          Dziękujemy za cierpliwość :)
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;