const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-170px)] ">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sec-500"></div>
    </div>
  );
};

export default LoadingSpinner;
