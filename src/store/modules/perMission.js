const perMission = {
  state: {
    activeIndex: ''
  },
  mutations: {
    TOP_NAV: (state, view) => {
      state.activeIndex=view
    },
  },
  actions: {
    top_nav({ commit }, view) {
      commit('TOP_NAV', view)
    }
  }
}
export default perMission