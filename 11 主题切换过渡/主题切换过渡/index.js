window.onload = () => {
	const btn = document.querySelector("button");

	const toggleTheme = () => {
		document.documentElement.classList.toggle("dark");
	};

	const isDark = () => {
		return document.documentElement.classList.contains("dark");
	};

	// 判断当前运行环境是否支持视图过渡效果
	const isAppearanceTransition =
		typeof document !== "undefined" &&
		document.startViewTransition &&
		!window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	btn.addEventListener("click", (event) => {
		if (!isAppearanceTransition || !event) {
			toggleTheme();
			return;
		}

		const x = event.clientX;
		const y = event.clientY;

		const endRadius = Math.hypot(
			Math.max(x, innerWidth - x),
			Math.max(y, innerHeight - y)
		);

		const transition = document.startViewTransition(() => {
			toggleTheme();
		});

		transition.ready.then(() => {
			const clipPath = [
				`circle(0px at ${x}px ${y}px)`,
				`circle(${endRadius}px at ${x}px ${y}px)`,
			];
			document.documentElement.animate(
				{
					clipPath: isDark() ? [...clipPath].reverse() : clipPath,
				},
				{
					duration: 400,
					easing: "ease-in",
					pseudoElement: isDark()
						? "::view-transition-old(root)"
						: "::view-transition-new(root)",
				}
			);
		});
	});
};