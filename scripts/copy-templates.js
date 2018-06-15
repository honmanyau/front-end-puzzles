"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
function makeDirectory(title) {
    var promise = new Promise(function (resolve, reject) {
        var path = __dirname.replace(/scripts$/, 'src/puzzles') + ("/" + title);
        fs.mkdir(path, function (error) {
            if (error) {
                reject(error);
            }
            resolve(path);
        });
    });
    return promise;
}
function getListOfTemplates() {
    var promise = new Promise(function (resolve, reject) {
        var path = __dirname.replace(/scripts$/, 'src/templates');
        fs.readdir(path, function (error, filenames) {
            if (error) {
                reject(error);
            }
            resolve(filenames);
        });
    });
    return promise;
}
function copyTemplates(title, files) {
    var promises = files.map(function (file) {
        var source = __dirname.replace(/scripts$/, 'src/templates') + ("/" + file);
        var destination = __dirname.replace(/scripts$/, "src/puzzles/" + title + "/" + file);
        return new Promise(function (resolve, reject) {
            fs.copyFile(source, destination, fs.constants.COPYFILE_EXCL, function (error) {
                if (error) {
                    reject(error);
                }
                resolve({ success: true, destination: destination });
            });
        });
    });
    return promises;
}
// function inputPrompt(question: string, callback: (data: string) => void) {
//     const { stdin, stdout } = process;
//
//     stdin.resume();
//     stdout.write(question);
//     stdin.once('data', function(data) {
//         callback(data.toString().trim());
//     });
// }
// ============
// === Main ===
// ============
var init = process.hrtime();
var title = process.argv.slice(2).join(' ');
var titleNotEmpty = !!title.replace(/\s/g, '');
if (titleNotEmpty) {
    var promise1 = makeDirectory(title);
    var promise2 = getListOfTemplates();
    Promise.all([promise1, promise2])
        .then(function (response) {
        var files = response[1];
        var promises = copyTemplates(title, files);
        Promise.all(promises)
            .then(function (response) {
            var final = process.hrtime(init);
            console.log(response);
            console.log(final[0] * 1000 + final[1] / 1000000 + " ms.");
        });
    });
}
else {
}
