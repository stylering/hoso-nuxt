export function parse(o) {
  try {
      return JSON.parse(o)
  } catch (e) {
      return o
  }
}

export function args2Obj(str) {
  let ret = {};
  let arr = str.split('&');
  arr.forEach(item => {
      let s = item.split('=');
      ret[s[0]] = s[1]
  })
  return ret;
}

export function isEmptyObject(obj) {
  let name;
  for (name in obj) {
      return false;
  }
  return true;
}

export function storage(...args) {
  let len = args.length;
  if (!len) {
      throw 'parameters can not be empty!';
  }
  if (typeof args[0] !== 'string') {
      throw 'parameter error!';
  }
  if (len === 1) {
      return localStorage.getItem && JSON.parse(localStorage.getItem(args[0]));
  }
  if (len >= 2) {
      localStorage.setItem(args[0], JSON.stringify(args[1]));
  }
}

export function getAbsPath(url) {
  let newUrl = url;
  if (process.env.NODE_ENV !== 'production') {
      if (url.indexOf('?') !== -1) {
          let sp = url.split('?');
          newUrl = sp[0] + '.html?' + sp[1];
      } else {
          newUrl = url + '.html';
      }
  }
  return newUrl;
}

