import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    // console.log(e.target.elements);
    const {delay, step, amount} = e.target.elements;
    // console.log({delay, step, amount});
    let delayVal = Number(delay.value);
    const stepVal = Number(step.value);
    const amountVal = Number(amount.value);

    for (let i =  0; i < amountVal; i++){
        createPromise(i + 1, delayVal).then(({position, delay}) => {
            Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }).catch(({position, delay}) => {
            Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }) 
        delayVal += stepVal;
    }
        
}



function createPromise(position, delay) {
    return new Promise((res, rej) => {
    setTimeout(() => {
    const bool = Math.random() > 0.7;
    if (bool) {
        res({position, delay});
    } else {
        rej({position, delay})
    }
    }, delay)
    })
}

