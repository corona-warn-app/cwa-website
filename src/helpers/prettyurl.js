module.exports = function(string) {
    return string.toLowerCase().replace(/[\W_]+/g," ").trim().replace(/\s/g, '-')
}
