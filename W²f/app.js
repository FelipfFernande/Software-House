        // Efeito de fundo de partículas
        const particlesContainer = document.getElementById('particles')
        const particleCount = 50
        
        // Cria partículas
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div')
            particle.className = 'particle'
            particle.style.left = Math.random() * 100 + '%'
            particle.style.animationDelay = Math.random() * 15 + 's'
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's'
            particlesContainer.appendChild(particle)
        }

       // Efeito de scroll no header
        const header = document.getElementById('header')
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled')
            } else {
                header.classList.remove('scrolled')
            }
        });

        // Menu mobile
        const mobileMenuBtn = document.getElementById('mobileMenuBtn')
        const navLinks = document.getElementById('navLinks')
    
        // Toggle menu mobile
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active')
        });

        // Fecha o menu ao clicar em um link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active')
            });
        });

        // Scroll suave para âncoras
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault()
                const target = document.querySelector(this.getAttribute('href'))
                if (target) {
                    const headerHeight = header.offsetHeight
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    })
                }
            })
        })

        // Validação e envio do formulário de contato
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault()
            alert('Obrigado pelo contato! Retornaremos em breve.')
            this.reset();
        })

        // Animações ao rolar a página
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
         
        // Observador de interseção para animações
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1'
                    entry.target.style.transform = 'translateY(0)'
                }
            })
        }, observerOptions)

        // Animação do título principal
        const heroTitle = document.querySelector('.hero-text h1')
        heroTitle.style.opacity = '1'

        // Animação dos elementos de serviço, estatísticas, processo e tecnologias
        const animateElements = document.querySelectorAll('.service-card, .stat-card, .process-step, .tech-card');
        animateElements.forEach(el => {
            el.style.opacity = '0'
            el.style.transform = 'translateY(30px)'
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
            observer.observe(el)
        })

        // Animação dos contadores de estatísticas
        const animateCounter = (element, target) => {
            let current = 0
            const increment = target / 50
            const timer = setInterval(() => {
                current += increment
                if (current >= target) {
                    element.textContent = target + (element.textContent.includes('%') ? '%' : '+')
                    clearInterval(timer)
                } else {
                    element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '+')
                }
            }, 30)
        }
        
        // Observador para os cartões de estatísticas
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target.querySelector('.stat-number')
                    const target = parseInt(statNumber.textContent)
                    animateCounter(statNumber, target)
                    statObserver.unobserve(entry.target)
                }
            })
        }, { threshold: 0.5 })
        
        // Inicia a observação dos cartões de estatísticas
        document.querySelectorAll('.stat-card').forEach(card => {
            statObserver.observe(card)
        })