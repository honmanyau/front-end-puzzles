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

function getListOfFilesInDirectory(path: string) {
  let promise = new Promise(function(resolve, reject)  {
    fs.readdir(path, function(error: Error, filenames: string[]) {
      if (error) {
        reject(error);
      }

      resolve(filenames);
    });
  });

  return promise;
}

function copyTemplates(
  files: string[], sourceDir: string, destinationDir: string
): Promise<{}>[] {
  let promises = files.map(function(name) {
    return new Promise(function(resolve, reject) {
      let source = `${sourceDir}/${name}`;
      let destination = `${destinationDir}/${name}`;
      let mode = fs.constants.COPYFILE_EXCL;

      fs.copyFile(source, destination, mode,function(error: Error) {
        if (error) {
          reject(error);
        }

        // Check if the current path is a directory
        let isDirectory = !name.match(/\./);

        if (isDirectory) {
          let promise = getListOfFilesInDirectory(source);

          promise
            .then(function(subfiles) {
              copyTemplates(subfiles as string[], source, destination);
            });
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
  let puzzleDir = __dirname.replace(/scripts$/, 'src/puzzles');
  let existingPuzzles = fs.readdirSync(puzzleDir).filter(function(name) {
    return name.match(/^\d\d\d-/);
  }).length;
  let prefix = ('00' + existingPuzzles + 1).slice(-3) + '-';
  let slug = prefix + title.toLowerCase().replace(' ', '-');

  let dir = __dirname.replace(/scripts$/, 'src/templates');
  let promise1 = makeDirectory(slug);
  let promise2 = getListOfFilesInDirectory(dir);

  Promise.all([promise1, promise2])
    .then(function(response) {
      let files = response[1] as string[];
      let source = __dirname.replace(/scripts$/, 'src/templates');
      let destination = __dirname.replace(/scripts$/, `src/puzzles/${slug}`);
      let promises = copyTemplates(files, source, destination);

      Promise.all(promises)
        .then(function(response) {
          let final = process.hrtime(init);

          console.log(response);
          console.log(`${final[0] * 1000 + final[1] / 1000000} ms.`);
        });
    });
}
else {
  // Error handling to be implemented.
}
