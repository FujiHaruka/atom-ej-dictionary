'use babel'

const {exec} = require('child_process')

export default class AtomEjDictionaryView {
  constructor (onHide) {
    // Create root element
    this.element = document.createElement('div')
    this.element.classList.add('atom-ej-dictionary')

    const header = document.createElement('div')
    header.classList.add('atom-ej-dictionary-header')
    const hideButton = document.createElement('i')
    // hideButton.textContent = 'hide'
    hideButton.classList.add('icon')
    hideButton.classList.add('icon-x')
    hideButton.classList.add('atom-ej-dictionary-hide-button')
    hideButton.addEventListener('click', onHide)
    header.appendChild(hideButton)
    this.element.appendChild(header)

    // Create message element
    const message = document.createElement('div')
    message.textContent = 'Searching...'
    message.classList.add('atom-ej-dictionary-meaning')
    this.element.appendChild(message)
  }

  search (word) {
    const message = this.element.lastChild
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
