/* eslint-disable no-undef */
// const axios = require('axios').default
// let onlogin = document.querySelector('#login')
let loginpost = document.querySelector('#login-post')
let username = document.querySelector('#username')
let password = document.querySelector('#password')
// onlogin.onclick = () => {
//   fetch(`/api/login?username=${username.value}&password=${password.value}`)
//   .then(res => res.text())
//   .then(res => {
//     console.log('res', res)
//   })
// }
loginpost.onclick = () => {
  axios.post('/api/login', {
    username: username.value,
    password: password.value
  }).then(res => {
    console.log(res)
   if (+res.data.ok === 1) {
      // 存储token
      location.href = '/'
    } else {
      alert('用户名密码不匹配')
    }
  })
}