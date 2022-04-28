
// JOB COUNTER
const counters = document.querySelectorAll('.counter-title');
const speed = 20000;

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-targets');
        const count = +counter.innerText;

        const inc = target / speed;

        if(count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 1);
        } else {
            count.innerText = target;
        }
    }

    updateCount();
});
