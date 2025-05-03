<script>
	import { onMount } from 'svelte';

	// Navigation items
	const { title, items } = $props();
	// State variables
	let prevScrollPos = 0;
	let visible = true;
	let atTop = true;

	// Handle scroll events
	function handleScroll() {
		const currentScrollPos = window.scrollY;

		// Check if at top
		atTop = currentScrollPos <= 10;

		// Determine visibility based on scroll direction
		visible = prevScrollPos > currentScrollPos || currentScrollPos <= 10;

		// Update previous scroll position
		prevScrollPos = currentScrollPos;
	}

	onMount(() => {
		// Set initial scroll position
		prevScrollPos = window.scrollY;

		// Add scroll event listener
		window.addEventListener('scroll', handleScroll);

		// Clean up event listener on component destruction
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<header
	class="fixed top-0 left-0 w-full z-10 transition-all duration-300 bg-base-100"
	class:shadow={!atTop}
	class:lg:mt-1={atTop}
	class:translate-y-0={visible}
	class:translate-y-[-100%]={!visible}
>
	<!-- Navbar -->
	<nav class="navbar w-[1024px] m-auto">
		<div class="flex-none lg:hidden">
			<label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block h-6 w-6 stroke-current"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					></path>
				</svg>
			</label>
		</div>
		<div class="mx-2 flex-1 px-2">
			{@render title()}
		</div>
		<div class="hidden flex-none lg:block">
			<ul class="menu menu-horizontal">
				<!-- Navbar menu content here -->
				{@render items()}
			</ul>
		</div>
	</nav>
</header>
