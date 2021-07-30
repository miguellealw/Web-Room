import Button from "../../components/Button";

export const YouTubeMessagePage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <h1 className="text-5xl font-bold">Connect to YouTube</h1>
      <p className="text-gray-500 py-3">
        Connect to your YouTube account to get started
      </p>
      <Button tw_className="text-sm flex justify-center items-center">
          Connect Now
      </Button>
    </div>
  );
};
