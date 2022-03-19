const days = document.querySelector('.days')
const hours = document.querySelector('.hours')
const minutes = document.querySelector('.minutes')
const seconds = document.querySelector('.seconds')

const finalDate = new Date(2022, 11, 17, 3, 24, 0)
let day, hour, minute, second, rem;


function getDate(){
    const diffTime = finalDate.getTime() - new Date().getTime()
    day = Math.floor(diffTime/(1000 * 60* 60 * 24))
    rem = diffTime%(1000*60*60*24)
    hour = Math.floor(rem/(1000*60*60))
    rem = rem%(1000*60*60)
    minute = Math.floor(rem/(1000*60))
    rem = rem%(1000*60)
    second = Math.floor(rem/(1000))
}
setInterval(() => {
     getDate()
     days.textContent = day
     hours.textContent = hour
     minutes.textContent = minute
     seconds.textContent = formatInteger(second)
}, 1000);

function formatInteger(val) {
    if (val.toString().length === 1) {
        return "0"+val.toString()
    } else {
        return val.toString()
    }
}
