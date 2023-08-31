const listData = ['11111111', '2222222', '33333333', '44444444']

;(() => {
	const oWrapper = document.querySelector('.draggable-list-wrapper')
	const init = () => {
		render()
		bindEvent()
	}
	function render() {
		const oList = createList()
		oWrapper.appendChild(oList)
	}

	function createList() {
		const oDraggablelist = document.createElement('ul')
		oDraggablelist.className = 'draggable-list'

		listData.forEach(item => {
			const oItem = document.createElement('li')
			oItem.className = 'draggable-item'
			oItem.draggable = true
			oItem.innerHTML = `<p>${item}</p>`
			oDraggablelist.appendChild(oItem)
		})
		return oDraggablelist
	}
	// 绑定拖拽相关事件
	function bindEvent() {
		const oDraggablelist = oWrapper.querySelector('.draggable-list')
		const oDraggableItems = oDraggablelist.querySelectorAll('.draggable-item')
		oDraggablelist.addEventListener('dragover', handlerDragover, false)
		window.addEventListener('dragover', handlerDragover, false)
		oDraggablelist.addEventListener('dragenter', e => e.preventDefault(), false)
		window.addEventListener('dragenter', e => e.preventDefault(), false)

		// 给所有的列表item加上拖拽事件
		oDraggableItems.forEach(item => {
			const _this = item
			item.addEventListener(
				'dragstart',
				() => {
					setTimeout(() => _this.classList.add('dragging'), 0)
				},
				false
			)

			item.addEventListener(
				'dragend',
				() => {
					_this.classList.remove('dragging')
				},
				false
			)
		})
	}

	// 拖拽完毕
	const timer = false
	function handlerDragover(e) {
		e.preventDefault()
		// 开启节流
		if (e.target.tagName === 'UL' && this != window) {
			// 这里是拿到触发dragover的对象
			const oDraggablelist = this
			// 找到正在拖拽的item
			const oDraggableItem =
				this != window && oDraggablelist.querySelector('.dragging')
			// 拿到DOM对象中所有非拖拽中的元素
			const oSibItems = oDraggablelist.querySelectorAll(
				'.draggable-item:not(.dragging)'
			)
			// 找到要交换位置的元素 如果当前元素的拖拽y轴的高度，小于当前元素的距离顶部的距离加上它自身的一半
			const oSibItem = [...oSibItems].find(
				item => e.clientY <= item.offsetTop + item.offsetHeight / 2
			)
			console.log(oSibItem)
			// 交换位置
			oDraggablelist.insertBefore(oDraggableItem, oSibItem)
		}
	}
	init()
})()
