'use babel'

const {exec} = require('child_process')

export default class AtomEjDictionaryView {
  constructor () {
    // Create root element
    this.element = document.createElement('div')
    this.element.classList.add('atom-ej-dictionary')

    // Create message element
    const message = document.createElement('div')
    message.textContent = 'Searching...'
    message.classList.add('message')
    this.element.appendChild(message)
  }

  search (word) {
    const message = this.element.firstChild
    message.textContent = 'Searching...'
    exec(`ejdict ${word}`, (err, stdout, stderr) => {
      if (err) {
        message.innerHTML = String(err)
      } else {
        message.innerHTML = stdout.split('\n').join('<br/>')
      }
    })
  }

  // Returns an object that can be retrieved when package is activated
  serialize () {}

  // Tear down any state and detach
  destroy () {
    this.element.remove()
  }

  getElement () {
    return this.element
  }
}
