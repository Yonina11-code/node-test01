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
  fetch('/api/login', {
    method: 'post',
    body: JSON.stringify({
      username: username.value,
      password: password.value
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(res => {
    console.log('res-post', res)
    if (+res.ok === 1) {

      location.href = '/'
    } else {
      alert('用户名密码不匹配')
    }
  })
}