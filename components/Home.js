import { useState, useEffect, useRef } from "react";
import { addActivity } from "../reducers/activities";
import Activity from "./Activity";
import styles from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const [activityName, setActivityName] = useState("");
  const [info, setInfo] = useState({});
  let timer= useRef(null);

  const activities = useSelector((state) => state.activities.value);
  const dispatch = useDispatch();

  const createActivity = () => {
    if (activityName == "") {
      setInfo({ msg: "Veuillez entrer un nom d'activité", color: "red" });
      return;
    }
    if (!activities.some((activity) => activity.name === activityName)) {
      dispatch(addActivity(activityName));
      setActivityName("");
      setInfo({ msg: "Activité ajoutée !", color: "green" });
    } else {
      setInfo({ msg: "Le nom de cette activité existe déjà", color: "red" });
    }
  };
  useEffect(() => {
    if (info.msg) {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setInfo({}), 3000);
    }
  }, [info]);

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
      <div className={styles.main}>
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
              <p className={styles.infoMsg} style={{ color: info.color }}>
                {info.msg}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.bottomSection}>{activitiesComponents}</div>
      </div>
    </div>
  );
}

export default Home;
