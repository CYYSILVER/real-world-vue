import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://mc.its-silver.com:25545`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

// apiClient.interceptors.request.use(
//   config => {
//     NProgress.start();
//     return config;
//   },
//   error => {
//     NProgress.done();
//     return Promise.reject(error);
//   }
// );

// apiClient.interceptors.response.use(
//   config => {
//     NProgress.done();
//     return config;
//   },
//   error => {
//     NProgress.done();
//     return Promise.reject(error);
//   }
// );

export default {
  getEvents(perPage, page) {
    return apiClient.get('/events', {
      params: {
        _limit: perPage,
        _page: page
      }
    })
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  },
  deleteEvent(eventID) {
    return apiClient.delete('/events/' + eventID)
  }
}
