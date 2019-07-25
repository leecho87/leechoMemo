var tag = '[View]';

var View = function(model){
    this.model = model;
    this.pickElements = {};
}

View.prototype.setup = function(key, el){
    this.pickElements[key] = el;
    return this;
}

View.prototype.on = function(target, event, handler){
    this.pickElements[target].addEventListener(event, handler)
    return this;
}

View.prototype.renderName = function(){
    this.pickElements.userName.innerHTML = this.model.userName;
}

View.prototype.showPlaceholder = function(el, value){
    if( el === 'reset' ){
        for(var i=0; i<this.pickElements.placeholder.length; i++){
            this.pickElements.placeholder[i].style.display = 'block';
        }
    }else{
        var el = el.previousElementSibling;
        (!value) ? el.style.display = 'block' : el.style.display = 'none'
    }
}

View.prototype.generatorMemo = function(empty, key){
    var data = this.model.data;
    // var key = key;
    var flag = Object.keys(data).length === 0 && JSON.stringify(data) === JSON.stringify({});
    var memo = ``;
    var empty = false
    var emptyEl = document.querySelector('.memo-empty');

    if(flag){
        empty = false;
        memo = `
            <div class="memo-empty">
                <p class="memo-empty__text">메모가 없습니다.<br>메모를 작성해주세요.</p>
            </div>
        `;
    }else{
        empty = true;
        memo = `
            <div class="memo" data-id="${key}">
                <div class="memo__state">
                    ${data[key].date}
                    <button type="button" class="memo__action memo__action--modify" data-id="${key}"></button>
                    <button type="button" class="memo__action memo__action--setting" data-id="${key}"></button>
                    <button type="button" class="memo__action memo__action--delete" data-id="${key}"></button>
                </div>
                <div class="memo__head" contenteditable="false">${data[key].title}</div>
                <div class="memo__body" contenteditable="false">${data[key].contents}</div>
            </div>
        `;
    }

    if (!flag && emptyEl !== null ) emptyEl.remove();

    this.pickElements.memoContainer.innerHTML += memo;

    return this;
}

View.prototype.removeMemo = function(target){
    var flag = Object.keys(this.model.data).length === 0 && JSON.stringify(this.model.data) === JSON.stringify({});

    target.offsetParent.remove();

    if (flag) this.generatorMemo(false);
}

View.prototype.settingMemo = function(e){
    var x = e.pageX+20;
    var y = e.pageY-10;
    this.pickElements.palette.setAttribute("style", `display:block;left:${x}px;top:${y}px`);
    this.pickElements.palette.setAttribute("data-key", `${e.target.dataset.id}`);
}

View.prototype.changeColor = function(e){
    e.preventDefault();
    var key = e.target.parentNode.dataset.key;
    var code = e.target.dataset.color;
    var memoEl = document.querySelector(`.memo[data-id="${key}"]`);
        memoEl.setAttribute('class', `memo memo--${code}`);
}

View.prototype.paletteHide = function(e){
    e.target.parentNode.style.display = 'none';
}

View.prototype.clearForm = function(){
    this.pickElements.writeTitle.innerText = '';
    this.pickElements.writeContents.innerText = '';
    this.pickElements.writeUpdate.blur();
    this.showPlaceholder('reset');
    return this;
}

View.prototype.modifyDisplay = function(key){
    this.pickElements.modifyContainer.style.display = 'block';
    this.pickElements.modifyTitle.innerText = this.model.data[key].title;
    this.pickElements.modifyContents.innerText = this.model.data[key].contents;
}

View.prototype.modifyCancel = function(){
    this.pickElements.modifyTitle.innerText = '';
    this.pickElements.modifyContents.innerText = '';
    this.pickElements.modifyContainer.style.display = 'none';
}