const responseObject = function getReturnObject(data, success, message) {
    return {
        data,
        success,
        message
    }
}

module.exports = responseObject;