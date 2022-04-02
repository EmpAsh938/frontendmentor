const activities = document.querySelector('.activities');
const btn = document.querySelectorAll('button');

async function fillDom(type){
    try {
        const req = await fetch('./data.json');
        const res = await req.json();
        activities.innerHTML = res.map(item => {
            const { title, avatar, timeframes} = item;
            const {current, previous} = timeframes[type]
            let tf = type === 'daily' ? 'day' : type === 'weekly' ? 'week' : 'month';
            return `
                <div class="card">
                    <div class="card-img">
                    <img src=${avatar} alt=${title}/>
                    </div>
                    <div class="card-container">
                        <div class="card-top">
                            <h3>${title}</h3>
                            <button>
                                <img src="./images/icon-ellipsis.svg" alt="icon-ellipsis">
                            </button>
                        </div>
                        <div class="card-mid">
                            <h2>${current}hrs</h2>
                        </div>
                        <div class="card-bottom">
                        <p>Last ${tf}</p>-<span>${previous}hrs</span>
                        </div>
                    </div>
                </div>
            `
        }).join('')
    } catch (error) {
        console.log(error)
    }
}


function handleClick(){
    fillDom(this.dataset.tf);
    btn.forEach(b => {
        b.classList.remove('active');
    })
    this.classList.add('active');
}


window.addEventListener('DOMContentLoaded', () => fillDom('daily'));
btn.forEach(b => b.addEventListener('click', handleClick));