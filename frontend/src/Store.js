import Api from './Api'

const Store = {
  state: {
    user: JSON.parse(window.localStorage.getItem('user'))
  },
  initState () {
    this.state = {
    //   attributes: null,
    //   roles: null,
    //   targetAreas: null,
    //   microAreas: null,
    //   cadastralZones: null,
    //   staticvalues: null
    }
  },

  setUser (user) {
    this.initState()
    this.state.user = user
    window.localStorage.setItem('user', JSON.stringify(user))
  },

  getUser () {
    return this.state.user
  }
}

export default Store