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

Controller.prototype.bindEvents = function(){
    this.view.setup('memoDelete', document.querySelectorAll('.memo__delete'));
    for(var i=0; i<this.view.pickElements.memoDelete.length; i++){
        this.view.pickElements.memoDelete[i].addEventListener('click', this.onRemove.bind(this));
    }

    this.view.setup('memoItem', document.querySelectorAll('.memo'));
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
    this.bindEvents();
}

Controller.prototype.onRemove = function(e){
    this.view.removeMemo(e.target.offsetParent);
}