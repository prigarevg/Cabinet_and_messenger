
export default class Request {

  static baseUrl = "/cabinet/";

  static get(url, params = {}) {
      axios.get(this.baseUrl + url, params)
          .then(function (response){
              //console.log(response);
          })
          .catch(function (error) {
              if(error.response.data.error.name === 'token_expired'){
                  axios.post('/api/auth/refresh-token')
              }
          })
    return axios.get(this.baseUrl + url, params)
  }
  static post(url, params = {}) {
    return axios.post(this.baseUrl + url, params)
  }
  static put(url, params = {}) {
    return axios.put(this.baseUrl + url, params)
  }
  static delete(url, params = {}) {
    return axios.delete(this.baseUrl + url, params)
  }

}
