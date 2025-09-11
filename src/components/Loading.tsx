import Loader from "@/assets/loader.svg";

const Loading = () => {
  return (
    <div className="flex-1 flex justify-center items-center">
      <img src={Loader} width={130} />
    </div>
  );
};

export default Loading