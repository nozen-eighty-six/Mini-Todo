import CurrentQueueItem from "./CurrentQueueItem";

const CurrentQueueList = ({ data, setUpdate }) => {
  return (
    <ul>
      {data?.length > 0 ? (
        data.map(
          (item, index) =>
            item.completed == false && (
              <CurrentQueueItem key={index} el={item} setUpdate={setUpdate} />
            )
        )
      ) : (
        <div className="text-white text-[clamp(1rem,2vw,1.12rem)]">
          {"No data"}
        </div>
      )}
    </ul>
  );
};

export default CurrentQueueList;
