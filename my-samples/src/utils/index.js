function getQueryStringArgs(instr) {
    //get query string without the initial ?
    var startIndex = instr.indexOf('?');
    if (startIndex === -1){
        return {};
    }
    var qs = (instr.length > 0 ? instr.substring(startIndex + 1) : ''),
        //object to hold data
        args = {},
        //get individual items
        items = qs.length ? qs.split('&') : [],
        item = null, name = null, value = null,
        //used in for loop
        i = 0, len = items.length;
    //assign each item onto the args object
    for (i = 0; i < len; i++) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) { args[name] = value; }
    }
    return args;
}

Object.assign(getQueryStringArgs(location.hash), getQueryStringArgs(location.search));
