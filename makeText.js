/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");


/** Make Markov machine from text and generate text from it. */

function generateText(text) {
    let mm = new markov.MarkovMachine(text); 
    let txt = mm.makeText()
    return txt
}

function outPutText(text){
    console.log(text)
}

/** read file and generate text from it. */

function makeText(path) {  
  fs.readFile(path, "utf8", function cb(err, data) {
    if (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      txt = generateText(data)
      return txt
    }
  });
}

/** read URL and make text from it. */


async function makeURLText(url) {
  let resp;

  try {
    resp = await axios.get(url);
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
  txt = generateText(resp.data)
  return txt
}


/** interpret cmdline to decide what to do. */
async function outPut(method, path){
    if (method === "file") {
      outPutText(makeText(path));
    }
    else if (method === "url") {
      const txt = await makeURLText(path)
      outPutText(txt);
    }
    else {
    console.log(method)
    console.error(`Unknown method: ${method}`);
    process.exit(1);
    }
}

module.exports = {makeURLText, makeText}

// let [method, path] = process.argv.slice(2);
// outPut(method, path)


