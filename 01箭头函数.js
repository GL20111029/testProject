const person = {
	name: '张三',
	fn() {
		console.log(this)
	},

	fn2: () => {
		console.log(this)
	},
}

person.fn()

person.fn.call(null)

person.fn.apply(null)

person.fn.bind(null)()

// 箭头函数没有this，这一点无论是使用call还是apply还是bind，都是无法改变的
person.fn2()
person.fn2.call(null)
person.fn2.apply(null)
person.fn2.bind(null)()

/* 
  Vue2的生命周期：
    Vue2的声明周期分为： 创建，挂载，更新，销毁
    其中创建分为 beforeCreate，和created，其中要在created中才能访问到data中的数据，并对其做出改变，且不触发更新，但是这一层还不能对DOM进行操作
    挂载分为beforeMount和 mounted，beforeMounted最后一次对data中的数据进行更改且不触发更新的机会，到了Mounted，才可以对DOM进行操作，data中的数据也开始渲染到对应的模板中。
    更新分为beforeUpdate和update
    销毁分为beforeDestroy，destroyed，其中，再beforeDestroy中，vm中的所有数据和方法都处于可调用状态，但到了destroyed的时候，就不可了
*/

/* 
  Vue3的生命周期：
    同Vue2一样，Vue3的周期也分为，创建、挂载、更新、销毁
    但是不同的是，Vue3使用setup代替了Vue2的beforeCreate和Created，另外setup的优先级在生命周期中比beforeCreate还要高，因此不能在setup中去操作DOM。要调用相应的钩子函数才行
    另外还新增了几个钩子，分别对应挂载、更新、卸载
    onBeforeMount
    onMounted
    onBeforeUpdate()
    onUpdated
    onBeforeUnmount
    onUnmounted
    
*/
