'use babel'

import AtomEjDictionaryView from './atom-ej-dictionary-view'
import { CompositeDisposable } from 'atom'

export default {
  atomEjDictionaryView: null,
  modalPanel: null,
  subscriptions: null,

  activate (state) {
    this.atomEjDictionaryView = new AtomEjDictionaryView(this.hide.bind(this))
    this.modalPanel = atom.workspace.addBottomPanel({
      item: this.atomEjDictionaryView.getElement(),
      visible: false
    })

    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-ej-dictionary:toggle': () => this.toggle()
    }))
  },

  deactivate () {
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.atomEjDictionaryView.destroy()
  },

  serialize () {
    return {
      atomEjDictionaryViewState: this.atomEjDictionaryView.serialize()
    }
  },

  toggle () {
    const editor = atom.workspace.getActiveTextEditor()
    const text = editor.getSelectedText()
    if (text.length === 0) {
      this.hide()
      return
    }
    this.modalPanel.show()
    this.atomEjDictionaryView.search(text)
  },

  hide () {
    this.modalPanel.hide()
  }
}

/* global atom */
