let APIURL = '';

switch (window.location.hostname) {

    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:4000';
        break;
    
    case 'ishmael-server-final.herokuapp.com':
        APIURL = 'https://ishmael-server-final.herokuapp.com';
}

export default APIURL;