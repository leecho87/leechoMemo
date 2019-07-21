var tag = '[Controller]';

var Controller = function(model, view){
    this.view = view;
    this.model = model;
}

Controller.prototype.init = function(){
    this.view.setup('placeholder', document.querySelectorAll('.writable__placeholder'));

    this.view.setup('writeTitle', document.querySelector('.writable__title'))
                .on('writeTitle', 'keyup', this.onKeyup.bind(this))

    this.view.setup('writeContents', document.querySelector('.writable__contents'))
                .on('writeContents', 'keyup', this.onKeyup.bind(this))

    this.view.setup('writeUpdate', document.querySelector('.writable__button--save'))
                .on('writeUpdate', 'click', this.onUpdate.bind(this))

    this.view.setup('memoContainer', document.querySelector('.memo-view-area'))

}

Controller.prototype.onKeyup = function(keyboardEvent){
    var el = keyboardEvent.target;
    var value = keyboardEvent.target.innerText;

    this.view.showPlaceholder(el, value.length);

    if ( el.className === 'writable__title' && keyboardEvent.keyCode === 13 ){
        this.view.pickElements.writeContents.focus();
        return;
    }
}

Controller.prototype.onUpdate = function(){
    var titleText = this.view.pickElements.writeTitle.innerText;
    var contentsText = this.view.pickElements.writeContents.innerText;
    var key = this.model.generatorKey();

    this.model.inValidator(key, titleText, contentsText);
    this.view.generatorMemo(key).clearForm();
}