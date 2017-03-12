var photos = [];
photos.push({
    name: '口拔牙西',
    path: 'http://i1.pixiv.net/img-original/img/2017/02/04/07/47/29/61268284_p0.png'
});
photos.push({ 
    name: 'Garbriel',
    path: 'http://i4.pixiv.net/img-original/img/2017/01/24/20/41/43/61092883_p0.png'
});
exports.list = function(req, res) {
    res.render('photos', {
        title: 'Photos',
        photos: photos
    });
};
