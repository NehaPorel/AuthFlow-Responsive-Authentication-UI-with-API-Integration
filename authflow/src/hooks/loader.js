const Loader = ({ isLoading }) => {
  return (
    isLoading && (
      <div className="w-4 h-4 mt-1 inline-block border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
    )
  );
};

export default Loader;
