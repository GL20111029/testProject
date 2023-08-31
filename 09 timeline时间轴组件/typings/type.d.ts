import { type } from 'jquery'

declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}


declare module 'jquery' {
	interface JQuery<HTMLElement> {
		timeline():void;
	}
}