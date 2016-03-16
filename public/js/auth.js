module.exports = {

login(email, password, cb) {
  cb = arguments[arguments.length - 1]
  if (localStorage.token) {
    if (cb) cb(true)
    this.onChange(true)
    return
  }

  loginRequest(email, password, (res) => {
    if (res.authenticated) {
      localStorage.token = res.token
      if (cb) cb(true)
      this.onChange(true)
    } else {
      if (cb) cb(false)
      this.onChange(false)
    }
  })
},

signup(email, password, cb) {
  cb = arguments[arguments.length - 1]
  signupRequest(email, password, (res)=> {
    cb()
  })
},

getToken() {
  return localStorage.token
},

logout(cb) {
  delete localStorage.token
  if (cb) cb()
  this.onChange(false)
},

loggedIn() {
  return !!localStorage.token
},

onChange() {}
} 

function signupRequest(email, password, cb){
$.post('/users', {email: email, password: password})
  .done((data) => {
    cb({
      status: 201,
      success: true
    })
  })
  .fail((data) => {
    cb({
      status: 202,
      data: data
    })
  })
}

function loginRequest(email, password, cb){
$.post('/users/login', {email: email, password: password})
  .done((data) => {
    cb({
      authentication: true,
      token: data.token
    })
  })
  .fail((data) => {
    cb({
      status: 202,
      data: data
    })
  })
}
