const images = [
	"https://images.squarespace-cdn.com/content/v1/5ca7eb2aa56827a4cf407fd9/1592754110428-9MZPBFUVS6CT6VNNSN02/20190417224211_IMG_6180+%281%29.jpg?format=1000w",
	"https://typika.coffee/cdn/shop/files/i_aG-k_n.jpg?v=1709803046",
	"https://perfectdailygrind.com/wp-content/uploads/2017/10/coffee-shop7-e1506814746889.jpg",
	"https://media.vogue.fr/photos/6698f5621275a3eee95de220/master/w_1600%2Cc_limit/451436942_1616207998939153_420376465810356220_n.jpg",
	"https://elisetanriverdi.wordpress.com/wp-content/uploads/2018/11/unadjustednonraw_thumb_4b02.jpg",
	"https://s3.ap-southeast-1.amazonaws.com/localiiz-prod/uploads/_1000x1000_fit_center-center_80_none/New-cafe%CC%81s-July-2021-From-Scratch-k_b_y.foodiary.jpeg?mtime=20210708170210&focal=none&tmtime=20250625131720",
	"https://s3-media0.fl.yelpcdn.com/bphoto/bDiicCy6hn4eYUsPY0qRag/348s.jpg",
	"https://www.timeoutdubai.com/cloud/timeoutdubai/2021/12/22/Stomping-Grounds-1024x768.jpg",
	"https://content.jdmagicbox.com/comp/def_content_category/blue-tokai-coffee-roasters/blue-tokai-coffee-roasters-635-1vajo-250.jpg",
	"https://www.sassyhongkong.com/wp-content/uploads/2019/09/eat-drink-wan-chao-coffee-shops-Omotesando-Koffee.jpg",
	"https://s3-media0.fl.yelpcdn.com/bphoto/EfZWeCy17EKDtz_ms5ocyQ/348s.jpg",
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSVrrHQBmMnyLk4njomdL67UnyImAdAZgFTw&s",
]

// gsap.registerPlugin(ScrollTrigger)

const gridWrapper = document.getElementById("grid-wrapper")
const gridGallery = document.getElementById("grid-gallery")
const gallerySection = document.querySelector(".gallery-section")
let mainTimeline = null
let hasAnimated = false

function createImages() {
	const allImages = [...images, ...images]

	allImages.forEach((src, index) => {
		const img = document.createElement("img")
		img.src = src
		img.alt = `Gallery image ${index + 1}`
		img.classList.add("grid-item")
		gridGallery.appendChild(img)
	})
}
function createCascadingAnimation() {
	const itemsPerRow = 2
	const imageHeight = 224
	const imageGap = 16
	const rowHeight = imageHeight + imageGap
	const numRowsPerSegment = 2
	const totalOriginalRows = Math.ceil(images.length / itemsPerRow)

	if (mainTimeline) {
		mainTimeline.kill()
	}
	ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

	gsap.set(gridGallery.children, {
		opacity: 0,
		scale: 0.8,
		y: 50,
		rotation: 5,
	})

	const entryTimeline = gsap.timeline()

	entryTimeline.to(
		Array.from(gridGallery.children).slice(0, 4),
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

	entryTimeline.to({}, { duration: 0.5 })

	const loopTimeline = gsap.timeline({
		repeat: -1,
		onRepeat: () => {
			gsap.set(gridWrapper, { y: 0 })
		},
	})

	for (let i = 0; i < totalOriginalRows; i += numRowsPerSegment) {
		const scrollPixels = numRowsPerSegment * rowHeight
		const segmentLabel = `segment${i}`

		loopTimeline.addLabel(segmentLabel, "+=0.2")

		loopTimeline.to(
			gridWrapper,
			{
				y: `-=${scrollPixels}`,
				duration: 1.5,
				ease: "power2.inOut",
			},
			segmentLabel
		)

		const startImageIndex = (i + numRowsPerSegment) * itemsPerRow
		const endImageIndex = startImageIndex + itemsPerRow * numRowsPerSegment
		const newImages = Array.from(gridGallery.children).slice(startImageIndex, endImageIndex)

		if (newImages.length > 0) {
			gsap.set(newImages, {
				opacity: 0,
				scale: 0.8,
				y: 50,
				rotation: 5,
			})

			loopTimeline.to(
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
				segmentLabel + "+=1.3"
			)
		}
	}

	mainTimeline = gsap.timeline()
	mainTimeline.add(entryTimeline).add(loopTimeline)

	ScrollTrigger.create({
		trigger: gallerySection,
		start: "top 70%",
		end: "bottom 30%",
		markers: false,
		onEnter: () => {
			if (!hasAnimated) {
				mainTimeline.play()
				hasAnimated = true
			} else {
				mainTimeline.play()
			}
		},
		onLeave: () => {
			if (mainTimeline) {
				mainTimeline.pause()
			}
		},
		onEnterBack: () => {
			if (mainTimeline) {
				mainTimeline.play()
			}
		},
		onLeaveBack: () => {
			if (mainTimeline) {
				mainTimeline.pause()
			}
			hasAnimated = false

			gsap.to(gridGallery.children, {
				opacity: 0,
				scale: 0.8,
				y: 50,
				rotation: 5,
				duration: 0.3,
				stagger: 0.05,
			})

			gsap.set(gridWrapper, { y: 0 })
		},
	})
}

document.addEventListener("DOMContentLoaded", function () {
	createImages()

	setTimeout(() => {
		createCascadingAnimation()
	}, 100)
})

window.addEventListener("beforeunload", function () {
	if (mainTimeline) {
		mainTimeline.kill()
	}
	ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
