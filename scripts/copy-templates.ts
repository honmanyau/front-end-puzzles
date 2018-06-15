import * as fs from 'fs';

function makeDirectory(title: string) {
  let promise = new Promise(function(resolve, reject) {
    let path = __dirname.replace(/scripts$/, 'src/puzzles') + `/${title}`;

    fs.mkdir(path, function(error: Error) {
      if (error) {
        reject(error);
      }

      resolve(path);
    });
  });

  return promise;
}

function getListOfTemplates() {
  let promise = new Promise(function(resolve, reject)  {
    let path = __dirname.replace(/scripts$/, 'src/templates');

    fs.readdir(path, function(error: Error, filenames: string[]) {
      if (error) {
        reject(error);
      }

      resolve(filenames);
    });
  });

  return promise;
}

function copyTemplates(title: string, files: string[]): Promise<{}>[] {
  let promises = files.map(function(file) {
    let source = __dirname.replace(/scripts$/, 'src/templates') + `/${file}`;
    let destination = __dirname.replace(/scripts$/, `src/puzzles/${title}/${file}`);

    return new Promise(function(resolve, reject) {
      fs.copyFile(source, destination, fs.constants.COPYFILE_EXCL, function(error: Error) {
        if (error) {
          reject(error);
        }

        resolve({ success: true, destination });
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

let init = process.hrtime();
let title = process.argv.slice(2).join(' ');
let titleNotEmpty = !!title.replace(/\s/g, '');

if (titleNotEmpty) {
  let promise1 = makeDirectory(title);
  let promise2 = getListOfTemplates();

  Promise.all([promise1, promise2])
    .then(function(response) {
      let files = response[1] as string[];
      let promises = copyTemplates(title, files);

      Promise.all(promises)
        .then(function(response) {
          let final = process.hrtime(init);

          console.log(response);
          console.log(`${final[0] * 1000 + final[1] / 1000000} ms.`);
        });
    });
}
else {

}
