const Error = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className="flex-1 flex justify-center items-center">
      <p className="text-red-500 text-center font-light">
        <span className="text-xl font-semibold">Error while fetching data</span>
        <br />
        {errorMessage}
      </p>
    </div>
  );
};

export default Error;
