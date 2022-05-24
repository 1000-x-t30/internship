function cartOverlayOpenToggle() {

	// selector
  const el = document.querySelector('#cartOverlay')

	//display value
	const style = window.getComputedStyle(el)
  const value = style.getPropertyValue('display')

	if(value == 'none') {
    el.style.display = 'block'
		setTimeout(() => {
			el.classList.toggle('cart_overlay')
		}, 1)
		setTimeout(() => {
			el.classList.toggle('is-active')
		}, 1)
		console.log('block')
  }
}

function cartOverlayCloseToggle() {
	const el = document.querySelector('#cartOverlay')
	setTimeout(() => {
		el.classList.toggle('cart_overlay')
	}, 1)
	el.classList.toggle('is-active')
	setTimeout(() => {
		el.style.display = 'none'
	}, 200)
	console.log('none')
}


const cartOverlayCloseBtn = document.querySelector('#cartOverlayCloseBtn')
cartOverlayCloseBtn.addEventListener('click', cartOverlayCloseToggle)

const cartOverlayBtn = document.querySelectorAll('.cartOverlayBtn')
for(let i = 0; i < cartOverlayBtn.length; i++) {
	cartOverlayBtn[i].addEventListener('click', cartOverlayOpenToggle)
}
