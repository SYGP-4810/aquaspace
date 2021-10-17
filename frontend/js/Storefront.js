document.getElementById('cover-img-u').onchange = function () {
    var src = URL.createObjectURL(this.files[0])
    document.getElementById('cover-pic').src = src
}

document.getElementById('profile-img-u').onchange = function () {
    var src = URL.createObjectURL(this.files[0])
    document.getElementById('profile-img').src = src
}

