function isToggle() {
	// selector
  const el = document.querySelector('#gnav')
	const btn = document.querySelector('#gnavBtn')

	//display value
	const style = window.getComputedStyle(el)
  const value = style.getPropertyValue('display')

	if(value == 'none') {
    el.style.display = 'block'
		setTimeout(() => {
			btn.classList.toggle('is-active')
			el.classList.toggle('is-active')
		}, 1)
  }else {
		el.classList.toggle('is-active')
		btn.classList.toggle('is-active')
		setTimeout(() => {
			el.style.display = 'none'
		}, 300)
	}
}

const gnavBtn = document.querySelector('#gnavBtn')
gnavBtn.addEventListener('click', isToggle)
