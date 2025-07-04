const images = [
	"https://res.cloudinary.com/dsbifsorx/image/upload/v1751410963/MAKIS_v1endo.png",
	"https://res.cloudinary.com/dsbifsorx/image/upload/v1751410962/Mesa_de_trabajo_2.1_ixpmx1.png",
	"https://res.cloudinary.com/dsbifsorx/image/upload/v1751410963/Mesa_de_trabajo_5_btjaq2.png",
	"https://res.cloudinary.com/dsbifsorx/image/upload/v1751410961/Mesa_de_trabajo_1.1_wkmtwy.png",
	"https://res.cloudinary.com/dsbifsorx/image/upload/v1751407543/Mesa_de_trabajo_12_zsotmy.png",
	"https://res.cloudinary.com/dsbifsorx/image/upload/v1751407543/Mesa_de_trabajo_14_ypa94g.png",
	"https://res.cloudinary.com/dsbifsorx/image/upload/v1751407541/Mesa_de_trabajo_10_qi3wk6.png",
	"https://res.cloudinary.com/dsbifsorx/image/upload/v1751407540/Mesa_de_trabajo_7_viffkr.png",
	"https://res.cloudinary.com/dsbifsorx/image/upload/v1751413174/bowl_andino_flyer_1_fxxyvy.png",
	"https://res.cloudinary.com/dsbifsorx/image/upload/v1751413173/wrap_flyer_3_bpghbr.png",
	"https://res.cloudinary.com/dsbifsorx/image/upload/v1751413174/carrusel_4.2_hmqxdn.png",
	"https://res.cloudinary.com/dsbifsorx/image/upload/v1751413175/Eiich_pecafit_uejgax.png",
]

const titles = ["Roll 360", "Dental Málaga", "Peca Fit"]

const grid = document.getElementById("grid-gallery")
const gridWrapper = document.getElementById("grid-wrapper")
let currentTitle = 0

// Carga imágenes (duplicadas para el bucle)
images.concat(images).forEach((src) => {
	const img = document.createElement("img")
	img.src = src
	img.alt = ""
	img.style.opacity = "0"
	grid.appendChild(img)
})

// Inicial
gsap.set(grid.children, {
	opacity: 0,
	scale: 0.8,
	y: 50,
	rotation: 5,
})

function animateGrid() {
	const itemsPerRow = 2
	const imageHeight = 224
	const imageGap = 16
	const rowHeight = imageHeight + imageGap
	const numRowsPerSegment = 2
	const totalRows = Math.ceil(images.length / itemsPerRow)

	const loopTl = gsap.timeline({
		repeat: -1,
		onRepeat: () => {
			currentTitle = 0
			gsap.set(gridWrapper, { y: 0 })
		},
	})

	// Entrada inicial
	loopTl.to(
		Array.from(grid.children).slice(0, 4),
		{
			opacity: 1,
			scale: 1,
			y: 0,
			rotation: 0,
			duration: 0.6,
			stagger: 0.15,
			ease: "back.out(1.2)",
		},
		"start"
	)

	loopTl.to({}, { duration: 0.5 })

	for (let i = 0; i < totalRows; i += numRowsPerSegment) {
		const scrollY = rowHeight * numRowsPerSegment
		const nextTitle = (Math.floor(i / numRowsPerSegment) + 1) % titles.length

		loopTl.to(
			gridWrapper,
			{
				y: `-=${scrollY}`,
				duration: 1.5,
				ease: "power2.inOut",
			},
			"<"
		)

		const startIndex = (i + numRowsPerSegment) * itemsPerRow
		const endIndex = startIndex + itemsPerRow * numRowsPerSegment
		const newImages = Array.from(grid.children).slice(startIndex, endIndex)

		gsap.set(newImages, {
			opacity: 0,
			scale: 0.8,
			y: 50,
			rotation: 5,
		})

		loopTl.to(
			newImages,
			{
				opacity: 1,
				scale: 1,
				y: 0,
				rotation: 0,
				duration: 0.6,
				stagger: 0.1,
				ease: "back.out(1.2)",
			},
			"+=0.3"
		)
	}
}

gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.create({
	trigger: ".gallery-section",
	start: "top 70%",
	end: "bottom 30%",
	onEnter: () => {
		animateGrid()
	},
})
