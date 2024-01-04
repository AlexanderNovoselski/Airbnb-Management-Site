const hiddenElements = document.querySelectorAll('.hidden');
const hiddenRightElements = document.querySelectorAll('.hidden-right');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting){
            entry.target.classList.add('show');
        }
    })
})

const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting){
            entry.target.classList.add('show');
        }
    })
})

hiddenElements.forEach((el) => observer.observe(el))
hiddenRightElements.forEach((el) => observer2.observe(el))