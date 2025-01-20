function delayFunction(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function delayedFunction(name) {
  await delayFunction(5000);
  console.log(name);
}

delayedFunction("suyog");
