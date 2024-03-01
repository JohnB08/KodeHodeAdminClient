const btn = document.querySelector(".buttonGetBracket")
const output = document.querySelector(".output")
const firstBracket = document.querySelector(".firstBracket")
const secondBracket = document.querySelector(".secondBracket")
const thirdBracket = document.querySelector(".thirdBracket")

const fetchBrackets = async()=>{
    const response = await fetch("https://mkmiddleman.onrender.com/fetchBrackets")
    const result = response.json()
    return result
}
let totalBrackets = 0

const brackets = [firstBracket, secondBracket, thirdBracket]

const contenderBrackets = []

const addContender = (currentBracket, origin, name) =>{
    let nextGroup = 0
    if (origin < 4){
        nextGroup = 0
    } else if (origin < 8){
        nextGroup = 1
    } else if(origin < 12){
        nextGroup = 2
    } else nextGroup = 3
    contenderBrackets.push(name)
    const nextBracket = brackets[brackets.indexOf(currentBracket)+1]
    const username = document.createElement("button")
    username.className = `nextBracket${nextGroup} followup name`
    username.innerText = name
    nextBracket.append(username)
    username.addEventListener("click", ()=>{
        const activeButtons = document.querySelectorAll(`nextBracket${nextGroup}`)
        activeButtons.forEach(button=>{
            button.disabled = true
        })
        console.log(contenderBrackets)
        addContender(nextBracket, nextGroup, name)
     })

}

btn.addEventListener("click", async ()=>{
    const brackets = await fetchBrackets()
    console.log(brackets)
    brackets.data.rows.forEach((bracket, i)=>{
        const bracketDiv = document.createElement("div")
        const bracketTitle = document.createElement("h2")
        bracketTitle.innerText = `Bracket ${i+1}:`
        bracketDiv.appendChild(bracketTitle)
        bracketDiv.className = "bracket"
        totalBrackets = i
        bracket.usernames.forEach(name=>{
            const username = document.createElement("button")
            username.className = `startingBracket${i} start name`
            username.innerText = name
            bracketDiv.append(username)
            username.addEventListener("click", ()=>{
                addContender(firstBracket, i, name)
                const activeButtons = document.querySelectorAll(`.startingBracket${i}`)
                activeButtons.forEach(button=>{
                    button.disabled = true
                })
                console.log(contenderBrackets)
            })

        })
        firstBracket.appendChild(bracketDiv)
        console.log(totalBrackets)
    })

})