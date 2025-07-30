document.addEventListener('DOMContentLoaded', function() {
    // 3D Cube Follow Mouse
    const cube = document.querySelector('.cube');
    const heroSection = document.querySelector('.hero');
    
    if (cube && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            cube.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        heroSection.addEventListener('mouseleave', () => {
            cube.style.transform = 'rotateY(0) rotateX(0)';
        });
    }
    
    // 3D Skill Cube Animation Control
    const skillCube = document.querySelector('.skill-cube');
    if (skillCube) {
        skillCube.addEventListener('mouseenter', () => {
            skillCube.style.animationPlayState = 'paused';
        });
        
        skillCube.addEventListener('mouseleave', () => {
            skillCube.style.animationPlayState = 'running';
        });
    }
    
    // Animate skill meters on scroll
    const meters = document.querySelectorAll('.meter');
    if (meters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const meter = entry.target;
                    const value = meter.getAttribute('data-value');
                    meter.style.setProperty('--value', value);
                    observer.unobserve(meter);
                }
            });
        }, { threshold: 0.5 });
        
        meters.forEach(meter => {
            observer.observe(meter);
        });
    }
    
    // 3D Button Effects
    const buttons = document.querySelectorAll('.btn-3d');
    buttons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(5px)';
            button.querySelector('::before').style.bottom = '-2px';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(0)';
            button.querySelector('::before').style.bottom = '-5px';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.querySelector('::before').style.bottom = '-5px';
        });
    });
    
    // Typewriter Effect
    class TypeWriter {
        constructor(txtElement, words, wait = 3000) {
            this.txtElement = txtElement;
            this.words = words;
            this.txt = '';
            this.wordIndex = 0;
            this.wait = parseInt(wait, 10);
            this.type();
            this.isDeleting = false;
        }
        
        type() {
            const current = this.wordIndex % this.words.length;
            const fullTxt = this.words[current];
            
            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }
            
            this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
            
            let typeSpeed = 200;
            
            if (this.isDeleting) {
                typeSpeed /= 2;
            }
            
            if (!this.isDeleting && this.txt === fullTxt) {
                typeSpeed = this.wait;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.wordIndex++;
                typeSpeed = 500;
            }
            
            setTimeout(() => this.type(), typeSpeed);
        }
    }
    
    function initTypeWriter() {
        const txtElement = document.querySelector('.txt-type');
        if (txtElement) {
            const words = JSON.parse(txtElement.getAttribute('data-words'));
            const wait = txtElement.getAttribute('data-wait');
            new TypeWriter(txtElement, words, wait);
        }
    }
    
    initTypeWriter();
});