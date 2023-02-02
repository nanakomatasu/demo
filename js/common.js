// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.body.classList.add("sidenav-pinned");
    document.body.classList.add("ready");
  }, 200);
});

// 每个页面都会导入该js 统一的设置写这里即可
function tip(msg) {
  const toastBody = document.querySelector("#myToast .toast-body");
  toastBody.innerHTML = msg;
  myToast.show();
}
axios.defaults.baseURL = "http://ajax-api.itheima.net";
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers.authorization = localStorage.getItem("token");
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response.data.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.assign("../login.html");
    }
  }
);
