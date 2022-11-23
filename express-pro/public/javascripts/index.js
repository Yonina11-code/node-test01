
// let onlogin = document.querySelector('#login')
let register = document.querySelector('#register')
let update = document.querySelector('#update')
let delet = document.querySelector('#delete')
let username = document.querySelector('#username')
let password = document.querySelector('#password')
let age = document.querySelector('#age')
let exit = document.querySelector('#exit')
register.onclick = () => {
  axios.post(`/api/user/add`,{
    username: username.value,
    password: password.value,
    age: age.value
  }).then(res => {
  console.log('res', res)
})
}

update.onclick = () => {
  axios.post(`/api/user/update/6375ac91afffaf3f6830a81e`, {
    username: username.value,
    password: password.value,
    age: 1
  }).then(res => {
  console.log('res', res)
})
}
exit.onclick = () => {
  axios.get('api/logout').then(res => {
    if (res.data.ok === 1) {
      location.href = '/login'
    }
  })
}
delet.onclick = () => {
  axios.get(`/api/user/delete/6375ac91afffaf3f6830a81e`)
  .then(res => {
    console.log('res', res)
  })
}
console.log('errr',fetch('/api/user/list'))
axios.get('/api/user/list', {
  headers: {
    'X-Frame-Options': 'SAMEORIGIN'
  }
}).then(res => {
  console.log('res', res)
  let tbody = document.querySelector('tbody')
  tbody.innerHTML = res.data.map(item => {
    return  `
    <tr>
      <td>${item._id}</td>
      <td>${item.username}</td>
      <td>${item.age}</td>
    </tr>`
  }).join('')
})