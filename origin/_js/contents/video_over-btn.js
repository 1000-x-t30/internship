function videoOver(event) {
	const target = event.target
	const videoOver = document.querySelector('#videoOver')
	const videosImg = document.querySelectorAll('.videosImg')
	const videosIframe = document.querySelectorAll('.videosIframe')


	if(videoOver.classList.toggle('is-active') == true) {
		console.log('1')
		for(let i = 0; i < videosImg.length; i++) {
			if(target == videosImg[i]) {
				console.log('true')
				videosIframe[i].classList.toggle('is-active')
				return
			}
		}
	}

	console.log('false')
	const el = document.querySelector('.videosIframe.is-active')
	el.classList.toggle('is-active')
	return
}

const videoOverBtn = document.querySelectorAll('.videoOverBtn')
for(let i = 0; i < videoOverBtn.length; i++) {
	videoOverBtn[i].addEventListener('click', videoOver);
}
