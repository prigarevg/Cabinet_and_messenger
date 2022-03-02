import Request from './request'
export default class CardIndexTask extends Request {
  static index() {
    return this.get('cardIndexTasks')
  }
  static store(task) {
    return this.post('cardIndexTasks', task)
  }

  static update(task) {
    return this.put('cardIndexTasks/' + task.id, task)
  }

  static destroy(task) {
    return this.delete('cardIndexTasks/' + task.id)
  }
}