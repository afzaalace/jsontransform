/*!
 * jsontransform
 * MIT Licensed
 */
var reform = function (obj, replace) {
    var output = {};
    for (y in replace) {
        if (typeof (replace[y]) == "string") {
            var factors = replace[y].split(".");
            output[y] = obj[factors[0]];
            factors = factors.slice(1);
            for(x in factors){
                output[y]=output[y][factors[x]];
            }
        } else {
            output[y] = reform(obj, replace[y]);
        }
    }
    return output;
}
var transform = function (i, o) {
    if (typeof (i) == "string")
        i = JSON.parse(i);
    var output;
    if (Array.isArray(i)) {
        output = [];
        for (x in i) {
            output[x] = reform(i[x], o.all);
        }
    }else{
        output = reform(i,o.all);
    }
    return output;
};
module.exports = transform;
