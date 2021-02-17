import axios from 'axios'
export default {
  auth: {
    me: () => axios.get(''),
    login: (data) => axios.post('auth/signin', data),
    register: (data) => axios.post('auth/signup', data),
    getBucket: (data) => {
      window.console.log(data)
      axios.get(`/:uuid/buckets`, data)
    },
  },
}
