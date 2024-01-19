/*obserwuje jak skroluje się między dinozaurami i robi animacje, dodając klase schowane*/
const the_animation = document.querySelectorAll('.ruch')

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('schowane')
        }
    })
},
    { threshold: 0.8
    });
//
    for (let i = 0; i < the_animation.length; i++) {
    const elements = the_animation[i];

    observer.observe(elements);
    } 
