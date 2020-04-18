export function isWeixin() {
  let ua = window.navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) == 'micromessenger'
}

export function isAndroid() {
  let ua = window.navigator.userAgent;
  return ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
}

export function isIOS() {
  let ua = window.navigator.userAgent;
  return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

export function isDev() {
  return /^https?:\/\/localhost/.test(location.href) || /^https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(location.href)
}

export function isTest() {
  return /^https?:\/\/t-/.test(location.href)
}