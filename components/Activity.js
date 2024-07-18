import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  removeActivity,
  startTimer,
  stopTimer,
  updateTimer,
} from "../reducers/activities";
import styles from "../styles/Activity.module.css";

function Activity(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    let interval;

    if (props.isRunning) {
      interval = setInterval(() => dispatch(updateTimer(props)), 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
    console.log("activity initialized or updated");
  }, [props.isRunning]);
  const createdAt = new Date(props.timestampOrigin);
  let createdDay;
  switch (createdAt.getDay()) {
    case 1:
      createdDay = "Monday";
      break;
    case 2:
      createdDay = "Tuesday";
      break;
    case 3:
      createdDay = "Wednesday";
      break;
    case 4:
      createdDay = "Thursday";
      break;
    case 5:
      createdDay = "Friday";
      break;
    case 6:
      createdDay = "Saturday";
      break;
    case 0:
      createdDay = "Sunday";
      break;

    default:
      createdDay = "unknown";
      break;
  }
  let jours = createdAt.getDate();
  jours = jours < 10 ? "0" + jours : jours;
  let mois = createdAt.getMonth();
  mois = mois < 10 ? "0" + mois : mois;
  let initHours = createdAt.getHours();
  initHours = initHours < 10 ? "0" + initHours : initHours;
  let initMinutes = createdAt.getMinutes();
  initMinutes = initMinutes < 10 ? "0" + initMinutes : initMinutes;
  const createdDate = `initialized on ${createdDay} ${jours}/${mois}/${createdAt.getFullYear()} at ${initHours}:${initMinutes}`;

  const time = new Date(props.timeSpent * 1000);
  let hours = time.getUTCHours();
  let minutes = time.getUTCMinutes();
  let seconds = time.getUTCSeconds(); // Ajoute un zéro devant les heures, minutes et secondes si elles sont inférieures à 10
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  const timer = hours + ":" + minutes + ":" + seconds;

  const handleRemove = (ActivityName) => {
    dispatch(removeActivity(ActivityName));
  };
  const handleStart = (ActivityName) => {
    dispatch(startTimer(ActivityName));
  };
  const handleStop = (ActivityName) => {
    dispatch(stopTimer(ActivityName));
  };

  return (
    <>
      <div className={styles.activityWindow}>
        <div className={styles.activityHeader}>
          {props.name}
          <div
            className={styles.delete}
            onClick={() => {
              handleRemove(props.name);
            }}
          >
            X
          </div>
        </div>
        <div className={styles.createdAt}>{createdDate}</div>

        {timer}

        <div className={styles.buttonSection}>
          <button
            onClick={() => {
              handleStart(props.name);
            }}
          >
            Start
          </button>
          <button
            onClick={() => {
              handleStop(props.name);
            }}
          >
            Stop
          </button>
        </div>
      </div>
    </>
  );
}

export default Activity;
