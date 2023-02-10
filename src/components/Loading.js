import { ReactComponent as LoadIcon } from "../Assets/images/icon-load.svg";

const Loading = () => {
  return (
    <div className="load-container">
      <LoadIcon className="load-icon" />
      <p>Loading request...</p>
    </div>
  );
};

export default Loading;
