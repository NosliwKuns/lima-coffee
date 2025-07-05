gsap.registerPlugin(ScrollTrigger)

document.addEventListener("DOMContentLoaded", function () {
	const header = document.querySelector("header")
	let lastScrollTop = 0
	let ticking = false

	function updateHeader() {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop

		if (scrollTop > 50) {
			header.classList.add("scrolled")
		} else {
			header.classList.remove("scrolled")
		}

		lastScrollTop = scrollTop
		ticking = false
	}

	function requestTick() {
		if (!ticking) {
			requestAnimationFrame(updateHeader)
			ticking = true
		}
	}

	window.addEventListener("scroll", requestTick, { passive: true })
})

function toggleHeaderTheme() {
	const header = document.querySelector("header")
	header.classList.toggle("dark")
}

function toggleBlurIntensity() {
	const header = document.querySelector("header")
	header.classList.toggle("strong-blur")
}
