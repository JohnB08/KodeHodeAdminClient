const btn = document.querySelector(".buttonGetBracket")
const output = document.querySelector(".output")

const fetchBrackets = async()=>{
    const response = await fetch("https://mkmiddleman.onrender.com/fetchBrackets")
    const result = response.json()
    return result
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
        bracket.usernames.forEach(name=>{
            const username = document.createElement("h3")
            username.className = "name"
            username.innerText = name
            bracketDiv.append(username)
        })
        output.appendChild(bracketDiv)
    })
})