let APIURL = '';

switch(window.location.hostname) {
    case 'localhost' || '127.0.0.1':

    APIURL = 'http://localhost:4000';
    break;

    case 'mr-bear-cellar.herokuapp.com':

        APIURL = 'https://mr-bear-cellar.herokuapp.com'

}

export default APIURL;