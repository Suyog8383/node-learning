const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const modifyValue = data.toLocaleLowerCase();

  fs.writeFile("input.txt", modifyValue, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    fs.readFile("input.txt", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(data);
    });
  });
});
