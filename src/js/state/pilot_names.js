import axios from 'axios';
import localforage from 'localforage';

const events = {
  CACHE_HIT: 'PILOT_NAMES_CACHE_HIT',
  LOAD_SUCCESS: 'PILOT_NAMES_LOAD_SUCCESS',
  LOAD_FAIL: 'PILOT_NAMES_LOAD_FAIL',
  REQUEST: 'PILOT_NAMES_REQUEST',
};

export default {
  state: {
    data: {},
    isLoaded: false,
  },
  getters: {
    getPilotName: (state) => (id) => state.data[id]?.name || null,
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
    async loadPilotNamesFast({ commit, dispatch }) {
      try {
        const data = await localforage.getItem('pilot_names');
        if (data) {
          commit(events.CACHE_HIT, data);
        }
        dispatch('loadPilotNames');
      } catch (error) {
        console.log(error);
      }
    },
    async loadPilotNames({ commit }) {
      commit(events.REQUEST);
      try {
        const response = await axios.get('/api/pilot/names/');
        const data = response.data.reduce((acc, pilot) => {
          acc[pilot._id] = pilot;
          return acc;
        }, {});
        await localforage.setItem('pilot_names', data);
        commit(events.LOAD_SUCCESS, data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
