if (process.argv.length <= 2) {
  return; // no output at all
}

if (process.argv.length === 3) {
  process.stdout.write(process.argv[2]); // avoid extra newline
  return;
}

let ss = "";
let frstWrd = process.argv[2];
let lnFrst = frstWrd.length;

for (let i = 0; i < lnFrst; i++) {
  for (let j = lnFrst; j >= i; j--) {
    let argId = 3;
    while (argId < process.argv.length) {
      if (!process.argv[argId].includes(frstWrd.substring(i, j))) {
        break;
      }
      if (argId === process.argv.length - 1) {
        ss =
          ss.length < frstWrd.substring(i, j).length
            ? frstWrd.substring(i, j)
            : ss;
      }
      argId++;
    }
  }
}

if (ss.length > 0) {
  process.stdout.write(ss); // write without newline
}
