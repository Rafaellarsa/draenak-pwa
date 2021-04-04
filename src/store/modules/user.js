export default {
  state: {
    user: {
      email: "",
      username: "",
      id: ""
    },
    isLogged: false
  },
  mutations: {
    setIsLogged(state, isLogged) {
      state.isLogged = isLogged;
    },
    setUser(state, user) {
      state.user = user;
    }
  }
};
