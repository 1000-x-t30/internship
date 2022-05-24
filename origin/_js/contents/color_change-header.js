function colorChange() {
	const wH = document.getElementById('wH').style.height
	const header = document.querySelector('header')
	header.classList.toggle('scroll-header', window.scrollY > wH)
}

window.addEventListener('scroll', colorChange)
