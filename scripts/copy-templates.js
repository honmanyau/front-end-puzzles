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
function getListOfFilesInDirectory(path) {
    var promise = new Promise(function (resolve, reject) {
        fs.readdir(path, function (error, filenames) {
            if (error) {
                reject(error);
            }
            resolve(filenames);
        });
    });
    return promise;
}
function copyTemplates(title, files, sourceDir, destinationDir) {
    var promises = files.map(function (name) {
        return new Promise(function (resolve, reject) {
            var source = sourceDir + "/" + name;
            var destination = destinationDir + "/" + name;
            var mode = fs.constants.COPYFILE_EXCL;
            fs.copyFile(source, destination, mode, function (error) {
                if (error) {
                    reject(error);
                }
                // Check if the current path is a directory
                var isDirectory = !name.match(/\./);
                if (isDirectory) {
                    var promise = getListOfFilesInDirectory(source);
                    promise
                        .then(function (subfiles) {
                        copyTemplates(title, subfiles, source, destination);
                    });
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
    var dir = __dirname.replace(/scripts$/, 'src/templates');
    var promise1 = makeDirectory(title);
    var promise2 = getListOfFilesInDirectory(dir);
    Promise.all([promise1, promise2])
        .then(function (response) {
        var files = response[1];
        var source = __dirname.replace(/scripts$/, 'src/templates');
        var destination = __dirname.replace(/scripts$/, "src/puzzles/" + title);
        var promises = copyTemplates(title, files, source, destination);
        Promise.all(promises)
            .then(function (response) {
            var final = process.hrtime(init);
            console.log(response);
            console.log(final[0] * 1000 + final[1] / 1000000 + " ms.");
        });
    });
}
else {
    // Error handling to be implemented.
}
