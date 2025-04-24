document.addEventListener('DOMContentLoaded', function() {
    // Establecer el favicon
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = 'images/logo_cauce/icono.png';
    favicon.type = 'image/png';
    document.head.appendChild(favicon);

    // Reemplazar el texto del logo con la imagen
    const logoElement = document.querySelector('.logo a');
    if (logoElement) {
        logoElement.innerHTML = '<img src="images/logo_horizontal/logo_blanco_horizontal.png" alt="El Cauce Logo">';
    }

    // Agregar logo al footer
    const footerLogo = document.querySelector('.footer-logo');
    if (footerLogo) {
        footerLogo.innerHTML = '<img src="images/logo_horizontal/logo_blanco.png" alt="El Cauce Logo">';
    }

    // Aplicar fondos a las secciones
    const sections = document.querySelectorAll('.section');
    const backgroundImages = ['b1.jpg', 'b2.jpg', 'b3.jpg', 'b4.jpg'];
    
    sections.forEach((section, index) => {
        // Aplicar fondos específicos para cada sección
        if (index === 0 || section.id === 'servicios' || section.id === 'detras-camara') {
            // Secciones con fondo blanco
            section.style.backgroundImage = 'none';
            section.style.backgroundColor = '#ffffff';
            // Eliminar el overlay para estas secciones
            const before = section.querySelector(':scope::before');
            if (before) {
                before.style.backgroundColor = 'transparent';
            }
        } else if (section.id === 'contacto') {
            // Sección de contacto con fondo específico (b3)
            section.style.backgroundImage = `url('images/background/b3.jpg')`;
            section.style.backgroundSize = 'cover';
            section.style.backgroundPosition = 'center';
        } else if (section.id === 'aliados') {
            // Sección de aliados con fondo similar al navbar
            section.style.backgroundImage = `url('images/background/b2.jpg')`;
            section.style.backgroundSize = 'cover';
            section.style.backgroundPosition = 'center';
        } else {
            // Para el resto de secciones, aplicar fondos normalmente
            const bgIndex = (index - 1) % backgroundImages.length;
            section.style.backgroundImage = `url('images/background/${backgroundImages[bgIndex]}')`;
        }
        section.style.backgroundSize = 'cover';
        section.style.backgroundPosition = 'center';
    });

    // Inicializar carrusel principal
    const mainCarousel = new Swiper('.main-carousel', {
        slidesPerView: 'auto', // Ajuste automático según el tamaño de pantalla
        spaceBetween: 20,
        loop: true,
        loopedSlides: 24, // Total de slides que se mostrarán en el loop
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        },
        centeredSlides: true,
        initialSlide: 2, // Empezar desde la tercera imagen para ver correctamente la izquierda
        observer: true, // Observar cambios en los elementos hijo
        observeParents: true, // Observar cambios en los elementos padre
        touchEventsTarget: 'container', // Mejorar la detección de eventos táctiles
        watchSlidesProgress: true, // Monitorizar el progreso de las diapositivas
        updateOnImagesReady: true, // Actualizar cuando las imágenes estén listas
        simulateTouch: true, // Asegurar que la simulación táctil esté activada
        touchRatio: 1, // Sensibilidad máxima al tacto
        resistance: false, // Desactivar resistencia en los extremos
        preventInteractionOnTransition: false, // Permitir interacción durante la transición
        allowTouchMove: true, // Permitir movimientos táctiles
        touchStartPreventDefault: false, // No prevenir eventos táctiles predeterminados
        breakpoints: {
            // Para móviles pequeños
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            // Para móviles
            480: {
                slidesPerView: 1,
                spaceBetween: 15,
            },
            // Para tablets
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            // Para escritorio
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            }
        }
    });

    // Cargar imágenes para el carrusel principal (excluyendo la primera)
    const mainCarouselWrapper = document.querySelector('.main-carousel .swiper-wrapper');
    mainCarouselWrapper.innerHTML = ''; // Limpiar cualquier contenido existente
    
    // Crear un array con todas las imágenes (de 2 a 25)
    const imagePaths = [];
    for (let i = 2; i <= 25; i++) {
        imagePaths.push(`images/carousel/${i}.jpg`);
    }
    
    let allMainImagesLoaded = false;
    
    // Agregar todas las imágenes al carrusel
    let mainLoadedImagesCount = 0;
    imagePaths.forEach((path, index) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        const img = document.createElement('img');
        img.src = path;
        img.alt = `Imagen ${index + 2}`;
        img.loading = 'eager'; // Cargar imágenes ávidamente para mejorar la experiencia
        
        // Contar imágenes cargadas
        img.onload = function() {
            mainLoadedImagesCount++;
            // Cuando todas las imágenes estén cargadas, actualizar el carrusel
            if (mainLoadedImagesCount === imagePaths.length) {
                allMainImagesLoaded = true;
                mainCarousel.update();
            }
        };
        
        slide.appendChild(img);
        mainCarouselWrapper.appendChild(slide);
    });

    // Forzar una actualización del carrusel después de un breve retraso y de nuevo después de otro retraso
    setTimeout(() => {
        mainCarousel.update();
        
        // Realizar un swipe inicial para activar correctamente los controles
        mainCarousel.slideNext(0);
        mainCarousel.slidePrev(0);
        
        // Inicializar navegación manualmente
        document.querySelectorAll('.main-carousel .swiper-button-next, .main-carousel .swiper-button-prev').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (this.classList.contains('swiper-button-next')) {
                    mainCarousel.slideNext();
                } else {
                    mainCarousel.slidePrev();
                }
            });
        });
        
        // Segundo retraso
        setTimeout(() => {
            mainCarousel.update();
            // Asegurar que los botones de navegación estén activos
            mainCarousel.navigation.update();
        }, 500);
    }, 500);

    // Observador para asegurar que las imágenes estén correctamente cargadas
    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    mainCarousel.update();
                    behindScenesCarousel.update();
                }, 200);
                imgObserver.unobserve(entry.target);
            }
        });
    });

    // Observar todas las imágenes para actualizar los carruseles cuando sean visibles
    document.querySelectorAll('.swiper-slide img').forEach(img => {
        imgObserver.observe(img);
    });

    // Inicializar carrusel de detrás de cámara
    const behindScenesCarousel = new Swiper('.behind-scenes-carousel', {
        slidesPerView: 'auto', // Ajuste automático según el tamaño de pantalla
        spaceBetween: 20,
        loop: true,
        loopedSlides: 10, // Reducido de 11 a 10 imágenes
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.behind-scenes-pagination',
            clickable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: '.behind-scenes-next',
            prevEl: '.behind-scenes-prev',
        },
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        },
        centeredSlides: true,
        initialSlide: 1, // Cambiar a la segunda imagen (index 1) para que comience desde más cerca del inicio
        // Opciones adicionales para mejorar visibilidad
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        preventInteractionOnTransition: false,
        preloadImages: true,
        updateOnImagesReady: true,
        observer: true, // Observar cambios en los elementos hijo
        observeParents: true, // Observar cambios en los elementos padre
        simulateTouch: true, // Asegurar que la simulación táctil esté activada
        touchRatio: 1, // Sensibilidad máxima al tacto
        resistance: false, // Desactivar resistencia en los extremos
        allowTouchMove: true, // Permitir movimientos táctiles
        touchStartPreventDefault: false, // No prevenir eventos táctiles predeterminados
        breakpoints: {
            // Para móviles pequeños
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            // Para móviles
            480: {
                slidesPerView: 1,
                spaceBetween: 15,
            },
            // Para tablets
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            // Para escritorio
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            }
        }
    });

    // Cargar imágenes para el carrusel de detrás de cámara
    const behindScenesWrapper = document.querySelector('.behind-scenes-carousel .swiper-wrapper');
    behindScenesWrapper.innerHTML = ''; // Limpiar cualquier contenido existente
    
    // Crear un array con todas las imágenes
    const behindScenesPaths = [];
    for (let i = 1; i <= 11; i++) {
        // Omitir la imagen 10 (penúltima)
        if (i !== 10) {
            behindScenesPaths.push(`images/behind-scenes/${i}.jpg`);
        }
    }
    
    // Agregar todas las imágenes al carrusel
    let loadedImagesCount = 0;
    behindScenesPaths.forEach((path, index) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.style.width = '33.333%'; // Forzar el ancho para asegurar que se vean 3 slides
        
        const img = document.createElement('img');
        img.src = path;
        img.alt = `Detrás de cámara ${index + 1}`;
        img.loading = 'eager'; // Cargar imágenes ávidamente para mejorar la experiencia
        
        // Contar imágenes cargadas
        img.onload = function() {
            loadedImagesCount++;
            // Cuando todas las imágenes estén cargadas, actualizar el carrusel
            if (loadedImagesCount === behindScenesPaths.length) {
                behindScenesCarousel.update();
                
                // Hacer un primer scroll para inicializar correctamente los controles de navegación
                behindScenesCarousel.slideNext(1);
                behindScenesCarousel.slidePrev(1);
            }
        };
        
        // Agregar evento de clic para ampliar la imagen
        img.addEventListener('click', function() {
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            modal.style.display = 'block';
            modalImg.src = this.src;
        });
        
        slide.appendChild(img);
        behindScenesWrapper.appendChild(slide);
    });

    // Inicializar navegación manual para el carrusel de detrás de cámara
    setTimeout(() => {
        // Realizar un swipe inicial para activar los controles correctamente
        behindScenesCarousel.slideNext(0);
        behindScenesCarousel.slidePrev(0);
        
        document.querySelectorAll('.behind-scenes-carousel .swiper-button-next, .behind-scenes-carousel .swiper-button-prev').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (this.classList.contains('swiper-button-next')) {
                    behindScenesCarousel.slideNext();
                } else {
                    behindScenesCarousel.slidePrev();
                }
            });
        });
        
        // Actualizar carrusel
        behindScenesCarousel.update();
        behindScenesCarousel.navigation.update();
    }, 500);

    // Forzar actualización adicional después de que todo esté cargado
    window.addEventListener('load', function() {
        setTimeout(() => {
            mainCarousel.update();
            behindScenesCarousel.update();
            
            // Asegurar que los controles de navegación estén activos
            mainCarousel.navigation.update();
            behindScenesCarousel.navigation.update();
            
            // Forzar un swipe inicial en ambos carruseles
            mainCarousel.slideNext(0);
            mainCarousel.slidePrev(0);
            behindScenesCarousel.slideNext(0);
            behindScenesCarousel.slidePrev(0);
        }, 1000);
    });

    // Crear grilla de logos para aliados comerciales
    const clientLogosGrid = document.querySelector('.client-logos-grid');
    if (clientLogosGrid) {
        clientLogosGrid.innerHTML = ''; // Limpiar cualquier contenido existente
        
        // Logos para la sección de Clientes (todos excepto el 3 que es Novartis y el 7 que también se excluye, y los 10, 11, 13 que van en Aliados)
        const clientLogos = [1, 2, 4, 5, 6, 8, 9, 12];
        
        clientLogos.forEach(logoNum => {
            const logoItem = document.createElement('div');
            logoItem.className = 'logo-item';
            
            const img = document.createElement('img');
            img.src = `images/logos/logo${logoNum}.png`;
            img.alt = `Logo de cliente ${logoNum}`;
            
            logoItem.appendChild(img);
            clientLogosGrid.appendChild(logoItem);
        });
    }
    
    // Crear grilla para los logos de aliados
    const alliesLogosGrid = document.querySelector('.allies-logos-grid');
    if (alliesLogosGrid) {
        alliesLogosGrid.innerHTML = ''; // Limpiar cualquier contenido existente
        
        // Logos para la sección de Aliados (10: congo, 11: hd, 13: sama) - cambiando el orden para que 13 sea el último
        const allyLogos = [10, 11, 13];
        
        allyLogos.forEach(logoNum => {
            const logoItem = document.createElement('div');
            logoItem.className = 'logo-item';
            
            const img = document.createElement('img');
            img.src = `images/logos/logo${logoNum}.png`;
            img.alt = `Logo de aliado ${logoNum}`;
            
            logoItem.appendChild(img);
            alliesLogosGrid.appendChild(logoItem);
        });
    }

    // Modal para servicios
    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.close-modal');
    
    // Modal para imágenes
    const imageModal = document.getElementById('imageModal');
    const closeImageModal = document.querySelector('.close-image-modal');
    
    if (closeImageModal) {
        closeImageModal.addEventListener('click', function() {
            imageModal.style.display = 'none';
        });
    }
    
    // Cerrar modal de imagen al hacer clic fuera de la imagen
    window.addEventListener('click', function(event) {
        if (event.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });

    // Datos de servicios
    const serviceData = {
        'corporativa': {
            title: 'Producción corporativa e institucional',
            content: `
                <p>Creamos contenido audiovisual diseñado para fortalecer la identidad y el mensaje de directoras/res, agencias de publicidad, marcas, empresas, instituciones y organizaciones sin ánimo de lucro. A través de una combinación de narrativa visual, estética y estructura comunicativa, ayudamos a transmitir valores, impacto y objetivos estratégicos de manera efectiva.</p>
                <h4>Formatos:</h4>
                <ul>
                    <li>Videos institucionales.</li>
                    <li>Campañas de sensibilización y comunicación.</li>
                    <li>Contenidos para divulgación de proyectos sociales y ambientales.</li>
                    <li>Registros de eventos, conferencias y actividades de impacto.</li>
                </ul>
            `
        },
        'desarrollo': {
            title: 'Desarrollo integral de proyectos audiovisuales',
            content: `
                <p>Para proyectos de mayor envergadura, ofrecemos un servicio completo que abarca la planificación, ejecución y dirección técnica de producciones audiovisuales. Podemos gestionar el proyecto de manera integral o encargarnos de cualquiera de sus fases de manera independiente, según las necesidades de cada cliente.</p>
                <h4>Incluye:</h4>
                <ul>
                    <li>Preproducción: escritura de proyectos, guiones, presupuestos y cronogramas.</li>
                    <li>Scouting técnico y logístico: exploración de locaciones y análisis de viabilidad técnica.</li>
                    <li>Fotografía fija profesional: documentación del proceso audiovisual.</li>
                    <li>Ejecución y manejo técnico: operación de equipos de filmación, iluminación y sonido.</li>
                    <li>Coordinación y dirección de producción: supervisión en campo y optimización de recursos audiovisuales.</li>
                    <li>Postproducción y edición profesional: realizamos la edición, corrección de color, mezcla y diseño sonoro para entregar un producto final de alta calidad.</li>
                </ul>
                <p><em>*Servicios modulares: posibilidad de contratar cada fase del proceso de manera independiente: preproducción, producción o postproducción.</em></p>
            `
        },
        'documentales': {
            title: 'Documentales',
            content: `
                <p>Realización de cortometrajes documentales cinematográficos para fundaciones, entidades públicas, universidades, productoras audiovisuales y artistas. Exploramos temáticas sociales, ambientales y culturales con una mirada estética y narrativa propia.</p>
                <h4>Incluye:</h4>
                <ul>
                    <li>Investigación.</li>
                    <li>Escritura de guion.</li>
                    <li>Dirección.</li>
                    <li>Dirección de fotografía y operación de cámara.</li>
                    <li>Sonido directo.</li>
                    <li>Producción y producción de campo.</li>
                    <li>Postproducción de imagen y audio.</li>
                    <li>Títulos y animaciones.</li>
                </ul>
            `
        },
        'videoclips': {
            title: 'Videoclips',
            content: `
                <p>Producción de videoclips musicales diseñados para artistas que buscan expandir el universo narrativo de sus obras a través de una identidad visual impactante y auténtica.</p>
                <h4>Incluye:</h4>
                <ul>
                    <li>Dirección creativa.</li>
                    <li>Escritura de guion literario y técnico.</li>
                    <li>Producción de campo.</li>
                    <li>Dirección de fotografía e iluminación.</li>
                    <li>Postproducción (montaje, corrección de color, finalizado).</li>
                    <li>Dirección de arte.</li>
                </ul>
            `
        },
        'podcast-corporativo': {
            title: 'Producción de video podcast corporativos e institucionales',
            content: `
                <p>Transformamos ideas en experiencias audiovisuales envolventes, brindando a empresas, instituciones y ONGs un servicio de producción de video podcast adaptado a diversas necesidades. Este servicio está pensado para proyectos de comunicación, en el ámbito cultural, empresarial, social o publicitario.</p>
                <h4>Lo que ofrecemos:</h4>
                <ul>
                    <li>Desarrollo integral: Acompañamiento en la creación del concepto, narrativa, estética y dirección artística del podcast, así como en distribución y monetización</li>
                    <li>Producción técnica: Grabación y postproducción audiovisual sin intervención en la concepción del contenido.</li>
                </ul>
                <h4>Incluye:</h4>
                <ul>
                    <li>Grabación con dos o tres cámaras (o más, según la necesidad del cliente)</li>
                    <li>Grabación de sonido de alta calidad</li>
                    <li>Grabación de video de alta calidad</li>
                    <li>Diseño y equipos de iluminación profesional</li>
                    <li>Postproducción audiovisual (conformado, montaje, etalonaje, finalización).</li>
                    <li>Postproducción de audio (edición y mezcla).</li>
                    <li>Animaciones y gráficos para complementar los contenidos en caso de que se requiera.</li>
                </ul>
            `
        },
        'podcast-educativo': {
            title: 'Video Podcast Educativo y Pedagógico',
            content: `
                <p>Un espacio diseñado para instituciones y centros educativos que buscan potenciar la enseñanza a través de formatos innovadores. Este servicio está dirigido a universidades, colegios, academias y empresas con programas de formación que desean transformar la educación en una experiencia envolvente y dinámica.</p>
                <h4>Lo que ofrecemos:</h4>
                <ul>
                    <li>Producción de video podcast educativo con narrativas audiovisuales.</li>
                    <li>Integración de recursos visuales: animaciones 3D y 2D, ilustraciones y gráficos informativos.</li>
                    <li>Formato adaptado a clases magistrales, cursos de especialización, maestrías y capacitaciones corporativas.</li>
                    <li>Aprendizaje remoto y distribución de conocimientos en formatos accesibles y envolventes.</li>
                </ul>
                <h4>Incluye:</h4>
                <ul>
                    <li>Grabación con dos o tres cámaras (o más, según la necesidad del cliente)</li>
                    <li>Grabación de sonido de alta calidad</li>
                    <li>Grabación de vídeo de alta calidad</li>
                    <li>Diseño y equipos de iluminación profesional</li>
                    <li>Postproducción audiovisual (conformado, montaje, etalonaje, finalización).</li>
                    <li>Postproducción de audio (edición y mezcla).</li>
                    <li>Animaciones y gráficos para complementar los contenidos en caso de que se requiera.</li>
                </ul>
            `
        }
    };

    // Abrir modal al hacer clic en un servicio
    document.querySelectorAll('.service-item').forEach(item => {
        item.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service');
            const service = serviceData[serviceId];
            
            if (service) {
                modalTitle.innerHTML = `<h3>${service.title}</h3>`;
                modalContent.innerHTML = service.content;
                modal.style.display = 'block';
            }
        });
    });

    // Cerrar modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Variaciones de navegación más simples (sin snap scroll)
    let isScrolling = false;
    const allSections = document.querySelectorAll('.section');

    // Función para desplazarse a una sección específica
    function scrollToSection(index) {
        if (index >= 0 && index < allSections.length && !isScrolling) {
            isScrolling = true;
            allSections[index].scrollIntoView({
                behavior: 'smooth'
            });
            
            // Restablecer la bandera después de la animación
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    }

    // Navegación con indicadores de desplazamiento
    document.querySelectorAll('.scroll-indicator').forEach(indicator => {
        indicator.addEventListener('click', function() {
            const currentSection = this.closest('.section');
            const nextSection = currentSection.nextElementSibling;
            
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Ocultar el indicador de desplazamiento en la última sección
    const lastSection = allSections[allSections.length - 1];
    const lastIndicator = lastSection.querySelector('.scroll-indicator');
    if (lastIndicator) {
        lastIndicator.style.display = 'none';
    }

    // Agregar funcionalidad del menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            menu.classList.toggle('active');
            // Hacer que el hamburger se convierta en X cuando está abierto
            this.classList.toggle('active');
        });
    }

    // Cerrar el menú al hacer clic en un enlace
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });

    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
            menu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        }
    });
}); 