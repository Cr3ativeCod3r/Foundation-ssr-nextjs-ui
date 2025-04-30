
export default  function PostError({ 
    message 
  }: { 
    message: string 
  }) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Ups! Coś poszło nie tak</h2>
        <p className="text-gray-600">{message}</p>
      </div>
    );
  }