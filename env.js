const enviroment = 'local';
const prodApi = 'https://expensas.waantec.com.br/expensas-php/public/api';
const localApi = 'http://192.168.1.106:8000/api';

const Env = {
    apiUrl: enviroment === 'local' ? localApi : prodApi
}
export default Env;