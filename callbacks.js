// ESEMPIO DI CODICE ASINCRONO

const count = function () {
  const randTime = Math.floor(Math.random() * 4000);

  setTimeout(() => {
    console.log("sono passati " + randTime / 1000 + "s");
  }, randTime);
};

const countAndDone = function () {
  count(); // questa operazione è asincrona

  // essendo che count è un'operazione asincrona, il console.log successivo (che è sincrono),
  // non ha modo di aspettare che l'operazione dentro a count sia finita prima di eseguirsi
  console.log("FINITO");
};

// countAndDone();

// POSSIBILE SOLUZIONE CON CALLBACK

const countWithCallback = function (customFunc) {
  const randTime = Math.floor(Math.random() * 4000);

  setTimeout(() => {
    console.log("sono passati " + randTime / 1000 + "s");

    // siccome il parametro specifica una funzione che verrà passata da fuori, essendo che contiene una funzione,
    // il parametro lo possiamo chiamare dove vogliamo noi
    customFunc();
  }, randTime);
};

const countAndDone2 = function () {
  // ogni chiamata di countWithCallback ci dà la possibilità di inserire il console log, con un messaggio sempre diverso,
  // all'interno del setTimeout (e non più fuori), così da essere sincronizzati con il momento in cui l'operazione è finita
  countWithCallback(() => console.log("FINITO!"));
  countWithCallback(() => console.log("FINITO2!"));
  countWithCallback(() => console.log("FINITO3!"));
};

// countAndDone2();

// creiamoci ora due funzioni che manipolano le stringhe, le useremo poi come callback di un'altra funzione chiamata getStringAndCompute
// la quale comporrà un messaggio con un simbolo, e passerà la stringa risultante come parametro di una di queste due funzioni
// le funzioni a loro volta manipoleranno la stringa che verrà ritornata e loggata

const capitalize = function (str) {
  const words = str.split(" ");

  const capitalized = words.map(w => w.charAt(0).toUpperCase() + w.substring(1));
  return capitalized.join(" ");
};

const allCaps = str => {
  return str.toUpperCase();
};

const getStringAndCompute = function (message, symbol, customFunc) {
  return customFunc(message + symbol); // capitalize(message)
};

// console.log(getStringAndCompute("ciao mi chiamo stefano", "...", capitalize));
// console.log(getStringAndCompute("ciao ragazzi, come state", "?", allCaps));
// console.log(getStringAndCompute("epicode is awesome", "!", str => str.slice(5)));

const myArr = ["cat", "dog", "horse", "bunny", "bird"];

// ricreiamo il metodo map

// map è una funzione che serve a creare un nuovo array di elementi modificati:
// si aspetta una callback da chiamare per determinare quale dato andrà a finire nel nuovo array
// non ha un'opinione su come questo dato dovrà essere modificato, lascerà a noi l'onere di modificarlo attraverso una funzione (callback),
// potenzialmente sempre diversa per ottenere la modifica. callback che ha ricevuto animal come parametro in ingresso, una volta eseguita,
// si lascerà dietro di sé il valore animal modificato, che sarà poi quello effettivamente pushato nel nuovo array.

const map = function (callback) {
  // la funzione si esegue, ha una funzione come parametro e comincia ad eseguire il suo codice:

  // 2) crea il nuovo array
  const newArr = [];
  // 2b) e avvia il ciclo
  for (let i = 0; i < myArr.length; i++) {
    // 2c) crea la variabile per il singolo elemento ciclato
    const animal = myArr[i];
    // 3) chiama callback passando animal come parametro
    // 4) la callback computa il valore modificato e lo ritorna al suo posto
    // 5) il push prende il valore ritornato e lo inserisce nel newArr
    newArr.push(callback(animal));
  }
  // 6) ad operazioni finite l'array avrà ricevuto tutti gli elementi modificati, quindi newArr viene ritornato dalla funzione map
  return newArr;
};

// 1) invocazione della funzione map con callback passata come argomento
const animalsExl = map(animal => animal + "!");
// 7) map si è lasciata dietro di sé il valore ritornato che ora fa parte della variabile che può essere visualizzata in console.
// console.log(animalsExl);

const animalCapital = map(animal => animal.charAt(0).toUpperCase() + animal.substring(1));
// console.log(animalCapital);

const animalCaps = map(animal => allCaps(animal));
// console.log(animalCaps);

// ____________________________________________________________________________________________

const answer = time => {
  console.log("📞pronto chi è? " + time / 1000 + "s");
};
const grannysAnswer = time => {
  console.log("📞pronto caro, hai mangiato? " + time / 1000 + "s");
};
const angryAnswer = time => {
  console.log("📞MA CHI DIAVOLO E'?!? " + time / 1000 + "s");
};

// 2) questa funzione phoneCall ci lascia la possibilità di variare il tipo di risposta in base alle funzioni sempre diverse passate come callback
const phoneCall = callback => {
  const randTime = Math.floor(Math.random() * 4000);

  setTimeout(() => {
    callback(randTime);
  }, randTime);

  console.log("☎️ squilla il telefono....");
};

// 1) invocazione di phoneCall con le varie funzioni che diventeranno le callback per le diverse invocazioni
phoneCall(answer);
phoneCall(grannysAnswer);
phoneCall(angryAnswer);
phoneCall(time => console.log("📞quanto paga di bolletta? " + time / 1000 + "s"));
