function formIsToggle() {
	// selector
  const el = document.querySelector('#formWindow')

	//display value
	const style = window.getComputedStyle(el)
  const value = style.getPropertyValue('display')

	if(value == 'none') {
    el.style.display = 'block'
		setTimeout(() => {
			el.classList.toggle('is-active')
		}, 1)
  }else {
		el.classList.toggle('is-active')
		setTimeout(() => {
			el.style.display = 'none'
		}, 300)
	}
}

const formBtn = document.querySelectorAll('.formBtn')
for(let i = 0; i < formBtn.length; i++) {
	formBtn[i].addEventListener('click', formIsToggle)
}
