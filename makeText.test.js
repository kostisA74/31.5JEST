const fs = require("fs");
const makeText = require('./makeText')

test('read text from file test', () =>{
    let sourceText = "This is a file that has been created to serve the jest testing\nPlease do not remove it"
    txt = makeText.readText('./test2.txt')
    expect(txt).toEqual(sourceText)
})

test('read text from URL test', async () => {
    let sourceText 
    const textFile = fs.readFile('./test.txt', 'Utf8', (err,data)=>{
        if (err) {
            console.log('error reading file')
            return
        }
        sourceText = data})
    const url = "https://www.gutenberg.org/files/11/11-0.txt"
    txt = await makeText.readTextURL(url)
    const w = txt.split(/[ \r\n]+/)
    words = w.filter(c => c !== "");
    for (let word of words){
        expect(sourceText).toContain(word)    
    }
})

// test('file test', () => {
//     let sourceText = "This is a file that has been created to serve the jest testing Please do not remove it" 
//     const file = "./test2.txt"
//     txt = makeText.makeText(file)
//     console.log(txt)
//     const w = txt.split(/[ \r\n]+/)
//     words = w.filter(c => c !== "");
//     for (let word of words){
//         expect(sourceText).toContain(word)    
//     }
// })
