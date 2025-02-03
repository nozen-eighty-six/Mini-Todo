import CurrentQueueList from "./CurrentQueueList";

const CurrentQueue = ({ data, setUpdate }) => {
  return (
    <div className="current__queue__component xs:w-full xs:order-3 lg:order-2 lg:w-[45%] h-full p-5">
      <h3 className="text-white text-base mb-1 text-[clamp(1rem,2vw,1.12rem)]">
        Current Queue
      </h3>
      <div className="sepator bg-gray-50/10 h-[1px] w-full mb-2"></div>
      <div className="current__queue__container xs:h-[312px] lg:h-[412px] overflow-y-auto">
        <CurrentQueueList data={data} setUpdate={setUpdate} />
      </div>
    </div>
  );
};

export default CurrentQueue;
