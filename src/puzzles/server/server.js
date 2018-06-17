"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var port = process.env.PORT || 3001;
app.get('/puzzle/:id/:filename', function (request, response) {
    var _a = request.params, id = _a.id, filename = _a.filename;
    var puzzleServerDir = __dirname.replace(/server$/, '') + "/" + id + "/server";
    var configPath = puzzleServerDir + "/fepconfig.json";
    var resourcePath = puzzleServerDir + "/" + filename;
    fs.readFile(configPath, { encoding: 'utf8' }, function (error, data) {
        if (error) {
            throw error;
        }
        var config = JSON.parse(data);
        var delay = config[filename].delay;
        console.log(delay);
        setTimeout(function () {
            response.sendFile(resourcePath);
        }, delay);
    });
});
// Start server
app.listen(port, function () {
    console.log("Your app is listening on port " + port);
});
