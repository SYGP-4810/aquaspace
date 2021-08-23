class HttpRequestCustom{

    sendPostRequestOnLoad(url,namespace='',controller,method,data=[]){


        const values = {"namespace" : namespace, "controller" : controller, "method" : method, "data" : data};
        const xhr = new XMLHttpRequest();
            // open a connection
        xhr.open("POST", url, true);

        // Set the request header i.e. which type of content you are sending
        xhr.setRequestHeader("Content-Type", "application/json");

        // Converting JSON data to string
        var data = JSON.stringify(values);
        xhr.onload = function() {
            if (this.readyState === 4 && this.status == 200) {
                let search = JSON.parse(this.responseText);
               
            }
                
                }

        // Sending data with the request
        xhr.send(data);    
        if(typeof search === 'undefined') return false; 
        return search;
    }

}