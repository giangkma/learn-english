const TOKEN_EXPIRES_TIME = 7 * 24 * 3600 * 1000; // 7 days (by sec)

const JWT_TOKEN = 'token';

function set(token) {
  const d = new Date();
  d.setTime(d.getTime() + TOKEN_EXPIRES_TIME);
  let expires = 'expires=' + d.toUTCString();
  document.cookie = JWT_TOKEN + '=' + token + ';' + expires;
}

function get() {
  let name = JWT_TOKEN + '=';
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function clear() {
  set(JWT_TOKEN, '');
}

export const tokenStorage = { set, get, clear };
