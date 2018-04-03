const perMission = {
  state: {
    activeIndex: '',
    activeMenu: '',
    sideMenus:[]
  },
  mutations: {
    TOP_NAV: (state, view) => {
      state.activeIndex=view
    },
    SIDE_NAV: (state, view) => {
      state.activeMenu=view
    },
    GET_MENU: (state, view) => {      
      state.sideMenus=view
    }
  },
  actions: {
    top_nav({ commit }, view) {
      commit('TOP_NAV', view)
    },
    side_nav({ commit }, view) {
      commit('SIDE_NAV', view)
    },
    get_menu({ commit }, view) {
      commit('GET_MENU', view)
    }
  }
}
export default perMission