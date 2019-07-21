var tag = '[Model]';

var Model = function(){
    this.data = {};
}

Model.prototype.inValidator = function(key, title, contents){
    var title = title.replace(/</g, '&lt;');
        title = title.replace(/>/g, '&gt;');
        ( title.length > 0 ? title = title : title = '-' );
    var contents = contents.replace(/</g, '&lt;');
        contents = contents.replace(/>/g, '&gt;');
        contents = contents.replace(/\n/g, '<br>');
        contents = contents.replace(/\s/g, '&nbsp;');
    var date = this.generatorTime();

    this.generatorData(key, title, contents, date)
}

Model.prototype.generatorTime = function(){
    var pad = function(date){
        return date >9 ? date : '0' + date;
    }
    var date = (function(date){
        return [
            date.getFullYear(),
            pad(date.getMonth()+1),
            pad(date.getDay()+1),
        ].join('/')
    })(new Date());

    var time = (function(date){
        return [
            pad(date.getHours()),
            pad(date.getMinutes()),
        ].join(':')
    })(new Date());

    var concatDate = date.concat(' ', time);
    return concatDate;
}

Model.prototype.generatorKey = function(){
    return Math.round( Math.random() * 9999 );
}

Model.prototype.generatorData = function(key, title, contents, date){
    this.data[key] = {
        title,
        contents,
        date,
    };
    return this;
}