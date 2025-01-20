function delayFun(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

delayFun(200).then(() => console.log("Promise resolve after 2 sec"));

function myDivide(num1, num2) {
  return new Promise((resolve, reject) => {
    if (num2 === 0) {
      reject("enter valid number");
    }

    resolve(num1 / num2);
  });
}

myDivide(10, 0)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
