"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// Setup
var app = express_1.default();
// Config
var port = process.env.PORT || 3001;
// Start server
app.listen(port, function () {
    console.log("Your app is listening on port " + port);
});
