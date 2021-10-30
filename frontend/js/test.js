let loggedIn = true;
let before = document.getElementsByClassName('before');
let after = document.getElementsByClassName('after');
function foo(loggedIn){
    if(loggedIn){
        for (var i=0;i<before.length;i+=1){
            before[i].style.display = 'none';
        }   
        for (var i=0;i<after.length;i+=1){
            after[i].style.display = 'block';
        } 
    }
    else {
        for (var i=0;i<before.length;i+=1){
            before[i].style.display = 'block';
        }   
        for (var i=0;i<after.length;i+=1){
            after[i].style.display = 'none';
        } 
    }
}

foo(loggedIn);