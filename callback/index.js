const fs = require("fs");
function person(name, callback) {
  console.log("name :", name);
  callback();
}
function age() {
  console.log("Young");
}

person("Suyog", age);

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
  }

  console.log("data :", data);
});
