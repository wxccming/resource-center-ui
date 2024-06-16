import axios from "axios";
import { Message } from "element-ui";
import storage from "@/utils/storage";

// 设置请求超时时间
axios.defaults.timeout = 1000 * 60 * 15;

// 设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;application/json';

// axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
// axios.defaults.headers.post['Cookie'] = 'zl_token=iBOqq5KzgTWRZpJffTqihsE2nRfAwqdF; Max-Age=1800; Expires=Fri, 10 Mar 2023 09:49:02 +0800; Path=/'

// 请求拦截
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.error(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  (response) => {
    // response.data.code='500'
    //response.data.code == '100009' || response.data.code == '100000'|| response.data.code == '100010'
    if (
      response.data.code == "100001" ||
      response.data.code == "100000" ||
      response.data.code == "100010" ||
      response.data.code == "500"
    ) {
      storage.clear();
      // location.reload();
    } else if (response.data.code == "2000") {
      Message.success(response.data.msg);
    } else {
      if (response.data.code && response.data.code != "000000") {
        if (response.data.code == "901") {
          Message.success(response.data.msg);
        } else {
          Message.error(response.data.msg);
        }
      }
      return response;
    }
  },
  (error) => {
    // console.log(error.response)
    if (error.response) {
      let errorMessage =
        error.response.data === null
          ? "系统内部异常，请联系网站管理员"
          : error.response.data.message;
      switch (error.response.status) {
        case 404:
          Message.error("很抱歉，资源未找到");
          break;
        case 403:
        case 401:
          Message.error(
            "很抱歉，您无法访问该资源，可能是因为没有相应权限或者登录已失效"
          );
          break;
        case 503:
          Message.error(
            error.response.status + " -- 模块化服务尚未启动，请稍后重试"
          );
          break;
        default:
          Message.error(error.response.status + " -- " + errorMessage);
          break;
      }
    }
    Promise.reject(error);
    return error;
  }
);

export function get(url, params, config) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
        ...config,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
export function put(url, params, config) {

  return new Promise((resolve, reject) => {
    axios
      .put(url, {
        ...params,
        ...config,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

export function post(url, params) {
  let headers = {
    headers: { "Content-Type": "application/json" },
  };
  params = params ? params : {};
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
export function DELETE(url, params,config) {
  let headers = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };
  params = params ? params : {};
  return new Promise((resolve, reject) => {
    axios
    .delete(url, {
      params: params,
      ...config,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

export function upFile(url, params) {
  let headers = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  params = params ? params : {};
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

export function getFilePrevGet(url, params, config) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        responseType: "blob",
      })
      .then((r) => {
        // console.log(r)
        // if(r.headers['content-disposition']){
        //     let fileName = r.headers['content-disposition'].split(';')[1].split('filename=')[1]
        //     fileName=decodeURIComponent(fileName)
        // }
        resolve(r.data);
      })
      .catch((err) => {
        reject(err.data);
        // Message.error("预览失败")
      });
  });
}

export function download(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        responseType: "blob",
      })
      .then((r) => {
        let fileName = new Date().getTime();
        if (r.headers["content-disposition"]) {
          fileName = r.headers["content-disposition"]
            .split(";")[1]
            .split("filename=")[1];
          fileName = decodeURIComponent(fileName);
        }
        const content = r.data;
        const blob = new Blob([content]);
        if ("download" in document.createElement("a")) {
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href);
          document.body.removeChild(elink);
        } else {
          navigator.msSaveBlob(blob, fileName);
        }
        resolve(r.data);
      });
    // .catch(err => {
    //     reject(err.data)
    //     Message.error("导出失败")
    // })
  });
}
