import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://my-react-burger-e3557.firebaseio.com/'
});

export default instance;