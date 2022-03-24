const toggleAdvice = document.querySelector('.toggle')
const adviceContainer = document.querySelector('.advice')
const adviceId = document.querySelector('.adviceId')

async function getAdvice(param){
    try {
        const req = await fetch(`https://api.adviceslip.com/advice/${param}`)
        const res = await req.json()
        const { advice, id } = res.slip
        adviceContainer.textContent = advice
        adviceId.textContent = id
    } catch (error) {
        console.log(error)
    }
}

function idGenerator() {
    return Math.floor(Math.random() * 224) + 1
}

window.addEventListener('DOMContentLoaded', () => getAdvice(idGenerator()))
toggleAdvice.addEventListener('click', () => getAdvice(idGenerator()))