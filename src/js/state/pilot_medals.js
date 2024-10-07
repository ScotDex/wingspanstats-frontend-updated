import axios from 'axios';
import localforage from 'localforage';

const events = {
  CACHE_HIT: 'PILOT_MEDALS_CACHE_HIT',
  LOAD_SUCCESS: 'PILOT_MEDALS_LOAD_SUCCESS',
  LOAD_FAIL: 'PILOT_MEDALS_LOAD_FAIL',
  REQUEST: 'PILOT_MEDALS_REQUEST',
};

export default {
  state: {
    data: {},
    isLoaded: false,
  },
  getters: {
    getPilotMedals: (state) => (id) => state.data[id]?.medals || null,
    getPilotCategoryMedals: (state, getters) => (id, category) => {
      return getters.getPilotMedals(id)?.[category] || null;
    },
  },
  mutations: {
    [events.CACHE_HIT](state, data) {
      state.data = data;
      state.isLoaded = true;
    },
    [events.LOAD_SUCCESS](state, data) {
      state.data = data;
      state.isLoaded = true;
    },
  },
  actions: {
    async loadPilotMedalsFast({ commit, dispatch }) {
      try {
        const data = await localforage.getItem('pilot_medals');
        if (data) {
          commit(events.CACHE_HIT, data);
        }
        dispatch('loadPilotMedals');
      } catch (error) {
        console.log(error);
      }
    },
    async loadPilotMedals({ commit }) {
      commit(events.REQUEST);
      try {
        const response = await axios.get('/api/pilot/medals/');
        const data = response.data.reduce((acc, pilot) => {
          acc[pilot._id] = pilot;
          return acc;
        }, {});
        await localforage.setItem('pilot_medals', data);
        commit(events.LOAD_SUCCESS, data);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
