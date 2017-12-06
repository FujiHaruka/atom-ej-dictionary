'use babel';

import AtomEjDictionaryView from './atom-ej-dictionary-view';
import { CompositeDisposable } from 'atom';

export default {

  atomEjDictionaryView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomEjDictionaryView = new AtomEjDictionaryView(state.atomEjDictionaryViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomEjDictionaryView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-ej-dictionary:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomEjDictionaryView.destroy();
  },

  serialize() {
    return {
      atomEjDictionaryViewState: this.atomEjDictionaryView.serialize()
    };
  },

  toggle() {
    console.log('AtomEjDictionary was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
