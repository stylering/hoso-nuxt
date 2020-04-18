export function url2Params(url) {
  let seg, ret = {}, atag;
  atag = document.createElement('a');
  atag.href = url;
  seg = atag.search.replace(/^\?/, '').split('&');
  seg.forEach( p => {
      let s = p.split('=');
      ret[s[0]] = s[1];
  });
  return ret;
}