// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  console.log('config', config)
  // 在发送请求之前做些什么
  let token = window.localStorage.getItem('token')
  config.headers.Authorization = token
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  console.log('response', response)
  const { authorization } = response.headers
  if (authorization) {
    window.localStorage.setItem('token', authorization)
  }
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});