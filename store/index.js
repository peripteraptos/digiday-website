const statusTypes = {
  INIT: 'init',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}

const { INIT, SUCCESS } = statusTypes

function shuffle(arr) {
  return arr.reduce(
    (newArr, _, i) => {
      const rand = i + Math.floor(Math.random() * (newArr.length - i))
      ;[newArr[rand], newArr[i]] = [newArr[i], newArr[rand]]
      return newArr
    },
    [...arr]
  )
}

const state = () => ({
  clicked: false,
  active: 'INTRO',
  shuffling: false,
  menu: false,
  time: 0,
  duration: 0,
  works: {
    status: INIT,
    error: null,
    data: [],
  },
})

const mutations = {
  SET_DURATION(state, duration) {
    state.duration = duration
  },
  SET_CURRENT_TIME(state, time) {
    state.time = time
  },
  SET_CLICKED(state) {
    state.clicked = true
  },
  SHUFFLE_WORKS(state) {
    state.works.data = shuffle(state.works.data)
  },
  SET_WORKS(state, payload) {
    state.works.data = payload
    state.works.status = SUCCESS
  },
  SET_ACTIVE(state, path) {
    state.active = path
  },
  SET_SHUFFLING(state, shuffling) {
    state.shuffling = shuffling
  },
  SET_MENU(state, menu) {
    state.menu = menu
  },
  SET_INTERSECT(state, { work, intersect }) {
    const w = state.works.data.find((w) => w.path === work)
    if (!w) return
    w.intersect = intersect
  },
}

const getters = {
  getPlaybackPercent: (state) =>
    state.duration === 0 ? 0 : state.time / state.duration,
  getWorks: (state) => state.works.data,
  // state.works.data.map((w) => ({ ...w, isActive: state.active === w.path })),
  getAuthors: (state, { getActiveAuthor }) =>
    [...new Set(state.works.data.map(({ author }) => author))]
      .sort((a, b) => a.localeCompare(b))
      .map((author) => ({
        author,
        isActive: getActiveAuthor === author,
      })),
  getActiveAuthor: (state, { getActiveWork }) =>
    getActiveWork ? getActiveWork.author : null,
  getActiveWork: (state) =>
    state.clicked
      ? state.works.data.find((w) => w.path === state.active)
      : null,
}

const actions = {
  async getWorks({ commit }, params, callback) {
    const storeWorks = await this.$content('works')
      // .where({ ...params, status: 'publish' })
      .sortBy('createdAt', 'desc')
      // .limit(12)
      .fetch()
    commit('SET_WORKS', storeWorks)
    commit('SHUFFLE_WORKS')
    if (storeWorks.length > 0) commit('SET_ACTIVE', storeWorks[0].path)
  },
  shuffleWorks({ commit }) {
    commit('SHUFFLE_WORKS')
    commit('SET_ACTIVE')
    commit('SET_SHUFFLING', 1)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' })
      commit('SET_SHUFFLING', 0)
    }, 2000)
  },
}

export default {
  state,
  mutations,
  getters,
  actions,
  statusTypes,
}
