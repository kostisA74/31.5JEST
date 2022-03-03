const {markovMachine, MarkovMachine} = require('./markov')

describe('maκe chains test', ()=>{

    test('should create the correct chain', ()=> {
        const testText = "the cat in the hat"
        const mm = new MarkovMachine(testText)
        mm.makeChains()

        const chainTarget = new Map([
            ["the", ["cat", "hat"]],
            ["cat", ["in"]],
            ["in", ["the"]],
            ["hat", [null]]
        ]);

        expect(mm.chains).toEqual(chainTarget)
    })

    test('case: single word', ()=>{
        const testText = "word"
        const mm = new MarkovMachine(testText)
        mm.makeChains()
        const chainTarget = new Map([
            ["word", [null]]
        ])
        expect(mm.chains).toEqual(chainTarget)
    })

    test('case: empty file', ()=>{
        const testText = ""
        const mm = new MarkovMachine(testText)
        const chainTarget = new Map([
            ["No words found", [null]]
        ])
        expect(mm.chains).toEqual(chainTarget)
    })

})

describe('make text test', ()=> {
    test('', ()=>{
        const testText = "Get your kicks on Route 66"
        const mm = new MarkovMachine(testText)
        const txt = mm.makeText()
        const w = txt.split(/[ \r\n]+/)
        words = w.filter(c => c !== "");
        for (let word of words){
            expect(testText).toContain(word)
        }

    })
})