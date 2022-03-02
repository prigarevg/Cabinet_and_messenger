import Request from './request'
export default class CardIndex extends Request {
  static index() {
    return this.get('cardIndexes')
  }
  static show(id) {
    return this.get('cardIndexes/' + id)
  }
  static store(card) {
    return this.post('cardIndexes', card)
  }

  static update(card) {
    return this.put('cardIndexes/' + card.id, card)
  }

  static destroy(card) {
    return this.delete('cardIndexes/' + card.id)
  }
}
