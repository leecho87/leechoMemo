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
    var key = key;
    var flag = Object.keys(data).length === 0 && JSON.stringify(data) === JSON.stringify({});
    var memo = ``;

    if(!flag){
        memo = `
            <div class="memo" data-id="${key}">
                <div class="memo__head" contenteditable="false">${data[key].title}</div>
                <div class="memo__body" contenteditable="false">${data[key].contents}</div>
                <button type="button" class="memo__delete" data-id="${key}">X</button>
            </div>
        `;
    }else{
        memo = `
            <div class="memo-empty">
                <p class="memo-empty__text">메모가 없습니다.<br>메모를 작성해주세요.</p>
            </div>
        `;
    }

    if( Object.keys(data).length === 1 && document.querySelector('.memo-empty')){
        document.querySelector('.memo-empty').remove();
    }

    this.pickElements.memoContainer.innerHTML += memo;

    return this;
}

// View.prototype.isEmpty = function(){
//     console.log(tag, 'isEmpty()', this.model)
// }


View.prototype.removeMemo = function(target){
    var key = target.dataset.id;
    var el = target.offsetParent;
    el.remove();

    this.generatorMemo();
}

View.prototype.modifyMemo = function(el){
    console.log(tag, 'modifyMemo()', el)
}

View.prototype.clearForm = function(){
    this.pickElements.writeTitle.innerText = '';
    this.pickElements.writeContents.innerText = '';
    this.pickElements.writeUpdate.blur();
    this.showPlaceholder('reset');
    return this;
}