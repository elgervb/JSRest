JSRest
======

Javascript REST API to communicate with the backend

Usage
-----
```javascript
// create your new rest object to version v1.0
var rest = new Rest("http://your.server.com/v1.0/base");

// perform get request to http://your.server.com/base/object
rest.get('/object')

// add a new object
rest.post('/object', {data: {prop: 'value', prop2: 'value2'}});

// get a new object with success / failure callbacks
var options = {
	data: {prop: 'value', prop2: 'value2'},
	success: function(data, status, xhr){
		document.getElementById('result').innerHTML = data;
	},
	error: function(error, errorType, xhr){
		document.getElementById('error').innerHTML = 'Failed to retrieve object. Error: ' + error;
	}
};
rest.get('/object/32', options)
```

Request Types
---------------

The Rest library supplies a number of default requests:

- GET     : `Rest.get`    Get (a list of) resources
- POST    : `Rest.post`    Add a new resource
- PUT     : `Rest.put`     Change a resource
- PATCH   : `Rest.patch`   Change a part of a resource
- DELETE  : `Rest.delete`  Delete a resource
- OPTIONS : `Rest.options` Request the capablities of the requested url
- HEAD    : `Rest.head`    Check is the resource exists

Apart from those, you can always create your own with the `request` method, just supply the `options.type` option. 


Request Options
---------------

| Key         | Type          | Default                          | Description                    |
|-------------|---------------|:--------------------------------:|--------------------------------|
| url         | string        |                                  | The request url. If you're set the baseurl on the Rest object then the url will be appended |
| headers     | object        |{}                                | Any additional headers to supply to the backend |
| xhrFields   | object        | {withCredentials: false}         | Any additional field to extend the XmlHttpRequest with       |
| debug       | boolean       | false                            | Whether to run in debug mode for additional console logging |
| type        | string        | GET                              | The request type. Only set this when using the `request` method |
| success     | function      |                                  | Callback to be executed on success |
| error       | function      |                                  | Callback to be executed on failure | 
| data        | object        |                                  | data to be supplies when making the request |