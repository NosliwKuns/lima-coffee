gsap.registerPlugin(ScrollTrigger)

const tl = gsap.timeline()

if ("scrollRestoration" in history) {
	history.scrollRestoration = "manual"
}

window.addEventListener("load", () => {
	window.scrollTo(0, 0)

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
				alpha: 1,
				scale: 1,
				duration: 1.2,
				ease: "power2.out",
			},
			"-=0.5"
		)

		// Animar contenido principal
		.to(
			".hero-section .hero-heading .hero-subtitle",
			{
				opacity: 1,
				x: 0,
				duration: 1.2,
				ease: "power3.out",
			},
			"-=0.8"
		)

		.to(
			".hero-section .hero-heading .hero-highlight",
			{
				opacity: 1,
				x: 0,
				duration: 1.2,
				ease: "power3.out",
			},
			"-=0.8"
		)

		.to(
			".hero-section .content p",
			{
				opacity: 1,
				y: 0,
				duration: 1,
				ease: "power2.out",
			},
			"-=0.7"
		)

		// Animar botón
		.to(
			".hero-section .content button",
			{
				opacity: 1,
				y: 0,
				duration: 1,
				ease: "back.out(1.7)",
			},
			"-=0.7"
		)

		.to(
			".hero-section .graphic img",
			{
				translateY: "-50%",
				translateX: 0,
				opacity: 1,
				duration: 1.5,
				ease: "power2.out",
			},
			"-=0.7"
		)

		// Animar texto de fondo word by word
		.to(
			".hero-section .graphic .text-background .ghost-text",
			{
				opacity: 0.6,
				duration: 0.8,
				ease: "power3.out",
			},
			"-=0.5"
		)

		.to(
			".hero-section .graphic .text-background .highlight",
			{
				opacity: 1,
				duration: 0.8,
				ease: "power3.out",
			},
			"-=0.5"
		)

		// Animar hojas decorativas
		.to(
			".leaves.top.left",
			{
				opacity: 1,
				x: 0,
				y: 0,
				rotation: 0,
				duration: 1,
				ease: "power2.out",
				onComplete: () => {
					gsap.to(".leaves.top.left", {
						x: -20,
						y: -20,
						duration: 4,
						repeat: -1,
						yoyo: true,
						ease: "power1.inOut",
						stagger: 0.5,
					})
				},
			},
			"-=0.7"
		)

		.to(
			".leaves.bottom.left",
			{
				opacity: 1,
				x: 0,
				y: 0,
				rotation: 0,
				duration: 1.2,
				ease: "power2.out",
				onComplete: () => {
					gsap.to(".leaves.bottom.left", {
						x: -20,
						y: 20,
						duration: 4,
						repeat: -1,
						yoyo: true,
						ease: "power1.inOut",
						stagger: 0.5,
					})
				},
			},
			"-=0.6"
		)

		.to(
			".leaves.bottom.right",
			{
				opacity: 1,
				x: 0,
				y: 0,
				rotation: 0,
				duration: 1,
				ease: "power2.out",
				onComplete: () => {
					gsap.to(".leaves.bottom.right", {
						x: 20,
						y: 20,
						duration: 4,
						repeat: -1,
						yoyo: true,
						ease: "power1.inOut",
						stagger: 0.5,
					})
				},
			},
			"-=0.7"
		)


		// const containerRef = useRef < HTMLDivElement > null
		const gridRef = document.querySelector(".grid-gallery")
		// const titleContainerRef = useRef < HTMLHeadingElement > null
		// const sectionRef = useRef < HTMLElement 
		// const galeryTl = (useRef < gsap.core.Timeline) | (null > null)
		const hasAnimated = false

		console.log(gridRef)

		const itemsPerRow = 2
		const imageHeight = 256
		const imageGap = 16
		const rowHeight = imageHeight + imageGap

		gsap.set(gridRef.children, {
			opacity: 0,
			scale: 0.8,
			y: 50,
			rotation: 5,
		})
})