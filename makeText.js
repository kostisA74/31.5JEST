/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function readText(path) {
    try {
        data = fs.readFileSync(path, "utf8")  
    } catch (err) {
        console.error(`Cannot read file: ${path}: ${err}`);
        process.exit(1);
    }
    return data;
}

async function readTextURL(url) {
    let resp;
    try {
      resp = await axios.get(url);
    } catch (err) {
      console.error(`Cannot read URL: ${url}: ${err}`);
      process.exit(1);
    }
    return resp.data
}

function generateText(text) {
    let mm = new markov.MarkovMachine(text); 
    let txt = mm.makeText()
    return txt
}

function outPut(method, path){
    if (method === "file") {
      const data = readText(path)
      console.log(data)
      let text = generateText(data)
      console.log(text)
    }
    else if (method === "url") {
        const txt = readTextURL(path).then((data)=>{
            let text = generateText(data)
            console.log(text)
        })
    }
    else {
        console.log(method)
        console.error(`Unknown method: ${method}`);
        process.exit(1);
    }
}

//!!!!!!! Uncomment to use command - line, comment-out to run the tests !!!!!!!!
let [method, path] = process.argv.slice(2);
// outPut(method, path)

module.exports = {readText, readTextURL}


