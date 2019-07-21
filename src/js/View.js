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

View.prototype.generatorMemo = function(key){
    var data = this.model.data;
    var memo = `
        <div class="memo" data-id="${key}">
            <div class="memo__head" contenteditable="true">${data[key].title}</div>
            <div class="memo__body" contenteditable="true">${data[key].contents}</div>
            <button type="button" class="memo__delete" data-id="${key}">X</button>
        </div>
    `;
    this.pickElements.memoContainer.innerHTML += memo;
    return this;
}

View.prototype.removeMemo = function(key){
    document.querySelector(`.memo[data-id="${key}"]`).remove();
}

View.prototype.clearForm = function(){
    this.pickElements.writeTitle.innerText = '';
    this.pickElements.writeContents.innerText = '';
    this.pickElements.writeUpdate.blur();
    this.showPlaceholder('reset');
    return this;
}