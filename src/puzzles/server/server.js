"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var port = process.env.PORT || 3001;
app.get('/puzzle/:id/:resource', function (request, response) {
    var _a = request.params, id = _a.id, resource = _a.resource;
    var parentDir = __dirname.replace(/server$/, '');
    var path = parentDir + "/" + id + "/server/" + resource;
    response.sendFile(path);
});
// Start server
app.listen(port, function () {
    console.log("Your app is listening on port " + port);
});
