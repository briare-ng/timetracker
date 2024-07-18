import { createSlice } from "@reduxjs/toolkit";
import Activity from "../components/Activity";

const initialState = {
  value: [],
};
// activity = {name: String, isRunning : bool, timeSpent: String, timestampOrigin: String}

export const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    addActivity: (state, action) => {
      console.log("created");
      let activity = {};
      let nameProperty = "name";
      let timestampOriginProperty = "timestampOrigin";
      let isRunningProperty = "isRunning";
      let timeSpentProperty = "timeSpent";
      activity[nameProperty] = action.payload; //on lit le nom de la nouvelle activité
      activity[isRunningProperty] = false;
      activity[timeSpentProperty] = "0";
      activity[timestampOriginProperty] = Date.now();
      state.value.push(activity); //crée le nouvel élément activité dans le tableau
    },
    removeActivity: (state, action) => {
      // refait le tableau State sans l'objet activité sélectionné avec son nom
      state.value = state.value.filter(
        (activity) => activity.name !== action.payload
      );
      console.log(action.payload + " removed");
    },
    startTimer: (state, action) => {
      const selectedActivity = state.value.find(
        (activity) => activity.name == action.payload
      );
      console.log(action.payload + " start");
      if (selectedActivity) {
        selectedActivity.isRunning = true;
      } // on définit le timer comme actif/en cours
    },
    stopTimer: (state, action) => {
      const selectedActivity = state.value.find(
        (activity) => activity.name == action.payload
      );
      if (selectedActivity) {
        selectedActivity.isRunning = false;
        console.log(action.payload + " stop");
      } //on défini le timer comme à l'arrêt/en pause
    },
    updateTimer: (state, action) => {
      const selectedActivity = state.value.find(
        (activity) => activity.name == action.payload.name
      );
      if (selectedActivity) {
        selectedActivity.timeSpent = parseInt(selectedActivity.timeSpent) + 1;
      } //on met à jour la valeur du temps à afficher
    },
  },
});

export const {
  addActivity,
  removeActivity,
  startTimer,
  stopTimer,
  updateTimer,
} = activitiesSlice.actions;
export default activitiesSlice.reducer;
