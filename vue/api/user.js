import Request from './request'
export default class User extends Request {
  static me() {
    return this.get('me')
  }
  static users() {
      return this.get('users')
  }
}
