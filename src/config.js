//const default_url = 'http://localhost:8000/api';
const default_url = 'http://193.46.198.137:8000/api';

const validate = (param) => {
    if (param == undefined) {
        param = ''
    }
    return param.length > 0 ? true : false
}

export  { default_url, validate };