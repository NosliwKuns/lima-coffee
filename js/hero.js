// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

console.log("GSAP y ScrollTrigger cargados correctamente")

// Timeline principal
const tl = gsap.timeline()

// Crear granos de café flotantes
function createCoffeeBeans() {
	for (let i = 0; i < 12; i++) {
		const bean = document.createElement("div")
		bean.className = "coffee-bean"
		bean.style.left = Math.random() * 100 + "%"
		bean.style.top = Math.random() * 100 + "%"
		document.querySelector(".hero-section").appendChild(bean)

		// Animar granos de café
		gsap.to(bean, {
			y: -30,
			rotation: 360,
			duration: 3 + Math.random() * 2,
			repeat: -1,
			yoyo: true,
			ease: "power2.inOut",
			delay: Math.random() * 2,
		})

		gsap.to(bean, {
			x: Math.random() * 50 - 25,
			duration: 4 + Math.random() * 2,
			repeat: -1,
			yoyo: true,
			ease: "power1.inOut",
			delay: Math.random() * 2,
		})
	}
}

// Inicializar animaciones cuando se carga la página
window.addEventListener("load", () => {
	// Animar header
	tl.to("header", {
		y: 0,
		opacity: 1,
		duration: 1.1,
		ease: "power3.out",
	})

		// Animar logo central
		.to(
			".hero-section .container .logo",
			{
				y: -360,
				opacity: 1,
				scale: 1,
				duration: 1.2,
				ease: "power2.out",
			},
			"-=0.5"
		)

		// Animar contenido principal
		.to(
			".hero-section .content",
			{
				opacity: 1,
				x: 0,
				duration: 1.2,
				ease: "power3.out",
			},
			"-=0.8"
		)

		// Animar párrafo
		.to(
			".hero-section .content p",
			{
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: "power2.out",
			},
			"-=0.6"
		)

		// Animar botón
		.to(
			".hero-section .content button",
			{
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: "back.out(1.7)",
			},
			"-=0.4"
		)

		// Animar sección gráfica
		// .to(".hero-section .graphic img", {
		// 	opacity: 1,
		// })
		.fromTo(
			".hero-section .graphic img",
			// {
			// 	yPercent: 100,
			// 	opacity: 1,
			// },
			{
				yPercent: 100,
				opacity: 0,
				duration: 1.2,
				ease: "power2.out",
			},
			{
				opacity: 1,
			},
			"-=2"
		)
		// Animar texto de fondo word by word
		.to(
			".hero-section .graphic .text-background span",
			{
				x: 0,
				duration: 0.8,
				stagger: 0.2,
				ease: "power3.out",
			},
			"-=0.5"
		)

		// Animar hojas decorativas
		.to(
			".leaves.top.left",
			{
				opacity: 0.8,
				x: 0,
				y: 0,
				rotation: 5,
				duration: 1,
				ease: "power2.out",
			},
			"-=0.7"
		)

		.to(
			".leaves.bottom.left",
			{
				opacity: 0.8,
				x: 0,
				y: 0,
				rotation: -3,
				duration: 1.2,
				ease: "power2.out",
			},
			"-=0.6"
		)

		.to(
			".leaves.bottom.right",
			{
				opacity: 0.8,
				x: 0,
				y: 0,
				rotation: 8,
				duration: 1,
				ease: "power2.out",
			},
			"-=0.6"
		)

	// Crear granos de café después de las animaciones principales
	setTimeout(createCoffeeBeans, 2000)
})

// Animaciones de hover para elementos interactivos
document.querySelectorAll(".nav-links a").forEach((link) => {
	link.addEventListener("mouseenter", () => {
		gsap.to(link, { scale: 1.1, duration: 0.3, ease: "power2.out" })
	})

	link.addEventListener("mouseleave", () => {
		gsap.to(link, { scale: 1, duration: 0.3, ease: "power2.out" })
	})
})

// Animación continua para el texto destacado
gsap.to(".highlight", {
	backgroundPosition: "200% center",
	duration: 3,
	repeat: -1,
	ease: "none",
})

// Animación de respiración para el logo central
// gsap.to(".hero-section .container .logo", {
// 	scale: 1.1,
// 	duration: 2,
// 	repeat: -1,
// 	yoyo: true,
// 	ease: "power2.inOut",
// 	delay: 3,
// })

// Efecto parallax suave en las hojas
gsap.to(".leaves", {
	y: -20,
	duration: 4,
	repeat: -1,
	yoyo: true,
	ease: "power1.inOut",
	stagger: 0.5,
})

// Animación de escritura para el texto de fondo
const textElements = document.querySelectorAll(".text-background span")

setInterval(() => {
	gsap.to(textElements, {
		opacity: 0.3,
		duration: 0.5,
		stagger: 0.1,
		yoyo: true,
		repeat: 1,
		ease: "power2.inOut",
	})
}, 5000)
