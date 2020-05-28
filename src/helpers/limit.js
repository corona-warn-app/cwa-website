module.exports = function(arr, limit) {
    if (!Array.isArray(arr)) { return []; }
    console.log(limit);
    return arr.slice(0, limit);
}