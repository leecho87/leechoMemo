var tag = '[Controller]';

var Controller = function(model, view){
    this.view = view;
    this.model = model;
}

Controller.prototype.init = function(){
    this.view.setup('placeholder', document.querySelectorAll('.writable__placeholder'));

    this.view.setup('writeTitle', document.querySelector('.writable__title'))
                .on('writeTitle', 'keyup', this.onKeyup.bind(this));

    this.view.setup('writeContents', document.querySelector('.writable__contents'))
                .on('writeContents', 'keyup', this.onKeyup.bind(this));

    this.view.setup('writeUpdate', document.querySelector('.writable__button--save'))
                .on('writeUpdate', 'click', this.onUpdate.bind(this));

    this.view.setup('memoContainer', document.querySelector('.memo-view-area'));
    this.view.setup('palette', document.querySelector('.palette'));
    this.view.setup('userName', document.querySelector('.header__user-name'));

    this.view.setup('modifyContainer', document.querySelector('.modify-wrapper'));
    this.view.setup('modifyTitle', document.querySelector('.modify__head'));
    this.view.setup('modifyContents', document.querySelector('.modify__contents'));

    this.view.generatorMemo();

    // this.settingName();
}

Controller.prototype.settingName = function(){
    var name = window.prompt('이름을 입력해주세요.');
    this.model.userName = name;
    this.view.renderName();
}

Controller.prototype.bindEvents = function(){
    this.view.setup('memoDelete', document.querySelectorAll('.memo__action--delete'));
    for(var i=0; i<this.view.pickElements.memoDelete.length; i++){
        this.view.pickElements.memoDelete[i].addEventListener('click', this.onRemove.bind(this), false);
    }

    this.view.setup('memoSetting', document.querySelectorAll('.memo__action--setting'));
    for(var i=0; i<this.view.pickElements.memoSetting.length; i++){
        this.view.pickElements.memoSetting[i].addEventListener('click', this.onSetting.bind(this), false);
    }

    this.view.setup('memoModify', document.querySelectorAll('.memo__action--modify'));
    for(var i=0; i<this.view.pickElements.memoModify.length; i++){
        this.view.pickElements.memoModify[i].addEventListener('click', this.onModifyDisplay.bind(this), false);
    }

    this.view.setup('paletteItem', document.querySelectorAll('.palette__item'));
    for(var i=0; i<this.view.pickElements.paletteItem.length; i++){
        this.view.pickElements.paletteItem[i].addEventListener('click', this.onChangeColor.bind(this));
    }

    this.view.setup('paletteButton', document.querySelector('.palette__button'))
                .on('paletteButton', 'click', this.view.paletteHide)

    this.view.setup('memoItem', document.querySelectorAll('.memo'));

    this.view.setup('modifySave', document.querySelector('.modify__button--save'))
                .on('modifySave', 'click', this.onModifySave.bind(this))
    this.view.setup('modifyCancel', document.querySelector('.modify__button--cancel'))
                .on('modifyCancel', 'click', this.onModifyCancel.bind(this))
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
    this.view.generatorMemo(false, key).clearForm();
    this.bindEvents();
}

Controller.prototype.onRemove = function(e){
    this.model.removeData(e.target.dataset.id)
    this.view.removeMemo(e.target);
}

Controller.prototype.onSetting = function(e){
    this.view.settingMemo(e);
}

Controller.prototype.onChangeColor = function(e){
    this.view.changeColor(e);
}

Controller.prototype.onModifyDisplay = function(e){
    e.stopPropagation();
    var key = e.target.dataset.id;
    this.view.modifyDisplay(key);
}

Controller.prototype.onModifySave = function(e){
    var titleText = this.view.pickElements.modifyTitle.innerText;
    var contentsText = this.view.pickElements.modifyContents.innerText;
    console.log(tag, 'onModifySave() / titleText ', titleText);
    console.log(tag, 'onModifySave() / contentsText ', contentsText);
}

Controller.prototype.onModifyCancel = function(){
    this.view.modifyCancel();
}