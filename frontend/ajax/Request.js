class Request{
    
    constructor(){
        this.home = "http://127.0.0.1/";
    }

    postJson(url,data=[]){
        let finalUrl = this.home + url;
        let params = [finalUrl,data];
        var xhr = new XMLHttpRequest();
			xhr.open("POST","http://127.0.0.1/backend/public/index.php");
			xhr.onload = function(){
				res = JSON.parse(this.response);
			};
			xhr.send(JSON.stringify(params));

            return res;


    }
    
}