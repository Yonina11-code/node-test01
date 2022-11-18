// let onlogin = document.querySelector('#login')
let register = document.querySelector('#register')
let update = document.querySelector('#update')
let delet = document.querySelector('#delete')
let username = document.querySelector('#username')
let password = document.querySelector('#password')
let age = document.querySelector('#age')
register.onclick = () => {
  fetch(`/api/user/add`, {
    method: 'post',
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      age: age.value
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(res => {
    console.log('res', res)
  })
}

update.onclick = () => {
  fetch(`/api/user/update/6375ac91afffaf3f6830a81e`, {
    method: 'post',
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      age: 1
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(res => {
    console.log('res', res)
  })
}

delet.onclick = () => {
  fetch(`/api/user/delete/6375ac91afffaf3f6830a81e`)
  .then(res => res.json())
  .then(res => {
    console.log('res', res)
  })
}
console.log('errr',fetch('/api/user/list'))
fetch('/api/user/list', {
  headers: {
    'X-Frame-Options': 'SAMEORIGIN'
  }
}).then(res => res.json())
.then(res => {
  console.log('res', res)
  let tbody = document.querySelector('tbody')
  tbody.innerHTML = res.map(item => {
    return  `
    <tr>
      <td>${item._id}</td>
      <td>${item.username}</td>
      <td>${item.age}</td>
    </tr>`
  }).join('')
})