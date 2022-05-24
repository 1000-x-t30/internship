function cartWindowIsToggle() {

	// selector
  const el = document.querySelector('#cartOverlay')
	const overlayBtn = document.querySelector('#cartOverlayCloseBtn')
	const header = document.querySelector('header')
	const gnavLine = document.querySelectorAll('.gnavLine')

	//display value
	const style = window.getComputedStyle(el)
  const value = style.getPropertyValue('display')

	if(value == 'none') {
		overlayBtn.style.display = 'none'
    el.style.display = 'block'

		setTimeout(() => {
			el.classList.toggle('cart_window-active')
			header.classList.toggle('color-change')

			for(let i = 0; i < gnavLine.length; i++) {
				gnavLine[i].classList.toggle('color-change')
			}
		}, 1)
		console.log('block')

  }else {
		el.classList.toggle('cart_window-active')
		header.classList.toggle('color-change')

		for(let i = 0; i < gnavLine.length; i++) {
			gnavLine[i].classList.toggle('color-change')
		}

		setTimeout(() => {
			overlayBtn.style.display = 'block'
			el.style.display = 'none'
		}, 200)
		console.log('none')
	}
}

const cartOverlayBtn = document.querySelector('#cartWindowBtn')
cartWindowBtn.addEventListener('click', cartWindowIsToggle)
