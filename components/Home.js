import { useState } from "react";
import { addActivity } from "../reducers/activities";
import Activity from "./Activity";
import styles from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const [activityName, setActivityName] = useState("");

  const activities = useSelector((state) => state.activities.value);
  const dispatch = useDispatch();

  const createActivity = () => {
    if (activityName !== "") {
      dispatch(addActivity(activityName));
      setActivityName("");
    }
  };

  // console.log("activities", activities);

  const activitiesComponents = activities.map((data, i) => {
    return (
      <Activity
        key={i}
        name={data.name}
        isRunning={data.isRunning}
        timestampOrigin={data.timestampOrigin}
        timeSpent={data.timeSpent}
      />
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.trackerWindow}>
          <div className={styles.trackerHeader}>Time tracker</div>
          <div className={styles.addSection}>
            <input
              type="text"
              placeholder="Activity name"
              id="activityName"
              onChange={(e) => setActivityName(e.target.value)}
              value={activityName}
            />
            <button id="add" onClick={createActivity}>
              Add activity
            </button>
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>{activitiesComponents}</div>
    </div>
  );
}

export default Home;
