const myPromise = () =>
  new Promise((resolve, reject) => {
    const randTime = Math.floor(Math.random() * 11);

    setTimeout(() => {
      if (randTime >= 5) {
        resolve("YAYYY, SUCCESS!!!");
      } else {
        reject("OH NOOO, WE FAILED!");
      }
    }, randTime);
  });

myPromise()
  .then(successMessage => console.log("POSITIVE OUTCOME: ", successMessage))
  .catch(rejectionMessage => console.log("NEGATIVE OUTCOME: ", rejectionMessage));

const promiseRace = () =>
  new Promise((resolve, reject) => {
    const randTime = Math.floor(Math.random() * 5);
    const randTime2 = Math.floor(Math.random() * 5);

    setTimeout(() => resolve("RESOLVE"), randTime);
    setTimeout(() => reject("REJECT"), randTime2);
  });

promiseRace()
  .then(message => console.log(message))
  .catch(message => console.log(message));
