'use babel'

import AtomEjDictionaryView from './atom-ej-dictionary-view'
import { CompositeDisposable } from 'atom'

export default {
  atomEjDictionaryView: null,
  modalPanel: null,
  subscriptions: null,

  activate (state) {
    this.atomEjDictionaryView = new AtomEjDictionaryView(state.atomEjDictionaryViewState)
    this.modalPanel = atom.workspace.addBottomPanel({
      item: this.atomEjDictionaryView.getElement(),
      visible: false
    })

    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-ej-dictionary:search': () => this.search(),
      'atom-ej-dictionary:hide': () => this.hide()
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

  search () {
    const editor = atom.workspace.getActiveTextEditor()
    const text = editor.getSelectedText()
    if (text.length === 0) {
      return
    }
    this.modalPanel.show()
    this.atomEjDictionaryView.search(text)
  },

  hide () {
    console.log('hide!!')
    this.modalPanel.hide()
  }
}

/* global atom */
