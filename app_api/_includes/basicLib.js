
//Method needed to respond back a var in JSON
module.exports.sendJsonResponse = function (res,status,content){
	res.status(status);
	res.json(content);
};

module.exports.meterConversion = (function() {
    var mToKm = function(distance) {
        return parseFloat(distance / 1000);
    };
    var kmToM = function(distance) {
        return parseFloat(distance * 1000);
    };
    return {
        mToKm : mToKm,
        kmToM : kmToM
    };
})();