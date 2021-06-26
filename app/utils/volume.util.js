const User = require('../models/user.model');

exports.volumeReaded = function (volumes_read, volume){
    let readed = false;
    volumes_read.forEach(read => {
        if(read.volume_id === volume.id){
            readed = true;
        }
    });
    if(readed){
        return 1;
    }else{
        return 0;
    }
}

exports.onReading = function (volume, user) {
    if(user){
        if(user.volume_read === volume.id){
            return 1;
        }else{
            return 0;
        }
    }
}