/**
 * Rest makes it possible to make calls to a backend in a simplified manner. It supplies defaults for GET, POST, PUT, PATCH and DELETE requests
 * 
 * @param baseUrl The base url of the backend. If you want to PUT something to https://server.io/api/object then you can supply https://server.io/api as your base url. In your request methods your can supply the /object uri. Alternatively you can omit it and supply the whole url to the request method
 */
var Rest = function(baseUrl){

    var version = function(){return 'v1.0'},
    baseUrl = baseUrl||'',
    defaults = { xhrFields: {withCredentials: true}, contentType: 'application/x-www-form-urlencoded', debug: false, type: 'GET', success: function(data, status, xhr){console.info('API request ' + xhr.status + " " + xhr.statusText + " Bytes: " + xhr.response.length);}, error: function(error, errorType, xhr){alert('XHR call failed...');}},
    get = function(uri, options){
        makeRequest( prepareRequest(uri, options, 'GET') );
    },
    post = function(uri, options){
        makeRequest( prepareRequest(uri, options, 'POST') );
    },
    put = function(uri, options){
        makeRequest( prepareRequest(uri, options, 'PUT') );
    },
    patch = function(uri, options){
        makeRequest( prepareRequest(uri, options, 'PATCH') );
    },
    del = function(uri, options){
        makeRequest( prepareRequest(uri, options, 'DELETE') );
    },
    options = function(uri, options){
        makeRequest( prepareRequest(uri, options, 'OPTIONS') );
    },
    head = function(uri, options){
        makeRequest( prepareRequest(uri, options, 'HEAD') );
    },
    request = function(uri, options){
        makeRequest( prepareRequest(uri, options) );
    }
    prepareRequest = function(uri, options, type){
        options = options || {};
        if (type) options.type = type ;
        options.url = uri;

        extend(options, defaults);

        return options;
    };

    function extend(a, b){
        for(var p in b){
            if (!a[p]){
                a[p] = b[p];
            }        
        }    
    };

    /**
     * Format data to be used in the request
     */
    function formatData(options){
        var result = "";
        for (var p in options.data){
            result += p + '&' + options.data[p]
        }
        return result;
    }

    function makeRequest( options ){

        if ( typeof options.url === "string" && options.url.substring(0, baseUrl.length) !== baseUrl ){
            options.baseUrl = baseUrl + options.url;
        }
        if (options.debug){
            console.log('Making ' + options.type + ' request to ' + options.url);
        }
        var http = new XMLHttpRequest();
        http.open(options.type, options.url, true);

        http.setRequestHeader("Content-type", options.contentType);

        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                if (options.debug){
                    console.log('Request succeeded');
                }
                options.success( decode(http), http.status, http);
            }
            else if(http.readyState == 4) {
                if (options.debug){
                    console.warn('Request failed');
                }
                options.error( decode(http), http.status, http);
            }
        }
        if (options.data 
            && typeof options.data != FormData 
            && typeof options.data != ArrayBuffer
            && typeof options.data != ArrayBufferView 
            && typeof options.data != Blob 
            && typeof options.data != Document  
            ){
            http.send(formatData(options));
        }
        else{
            http.send();
        }
        
    };

    /**
     * Decodes the response into the right format
     *
     * @param XmlHttpRequest the ajax request object
     * 
     * @return string|object The encoded response depending on the content type, eg. application/json delivers a JSON object, text/html returns a string
     */
    function decode(xhr){
        var response = xhr.responseText;
        var type = xhr.getResponseHeader('content-type');
        if (type && type.match(/json/)){
            response = JSON.parse(response);
        }
        return response;
    }

    return {
        get : get,
        post : post,
        put : put,
        patch : patch,
        del : del,
        options : options,
        head : head,
        request : request,
        version : version
    }
};