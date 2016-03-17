'use strict'
const $ = require('jquery');

module.exports = {
  login(email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }

    loginRequest(email, pass, (res) => {
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

  signup(email, pass, cb) {
    cb = arguments[arguments.length - 1]
    signupRequest(email, pass, (res) => {
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

// new request to sign up
function signupRequest (email, pass, cb) {
  $.post('/users', {email: email, password: pass})
    .done( (data) => {
      cb({
        status: 201,
        success: true
      })
    })
    .fail( (data) => {
      cb({
        status: 202,
        data: data
      })
    })
}


function loginRequest(email, pass, cb) {

 let loginCreds = {
   email: email,
   password: pass
 }

 $.post('/users/login', loginCreds)
   .done((data) => {
     cb({
       authenticated: true,
       token: data.token
     })
   })
   .error((error) => {
     console.log(error);
     cb({
       authenticated: false

     })
   })
}
