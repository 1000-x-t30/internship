
const itemCnt = (event) => {
	let cnt = 0
	const target = event.target
	const id = target.id
	const el = document.querySelector('#itemCountBtn > #count')
	cnt = Number(el.value)

	if(id == 'plus') {
		cnt = cnt + 1
	}else if(id == 'minus') {
		cnt = cnt - 1
	}
	return cnt
}

const itemInsert = (event) => {
	const el = document.querySelector('#itemCountBtn > #count')
	const result = itemCnt(event)

	el.innerHTML = result
}

const cnt = document.querySelectorAll('.itemCnt')
console.log(cnt)
for(let i = 0; i < cnt.length; i++) {
	cnt.addEventListener('click', itemInsert)
}
