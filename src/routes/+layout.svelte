<script>
	import "../app.css";
	import Drawer from "$lib/components/drawer.svelte";
	import Navbar from "$lib/components/navbar.svelte";
	let { children } = $props();

	const navItems = [
		{ label: "About", href: "/about" },
		{ label: "Projects", href: "/projects" },
		{ label: "Contact", href: "/contact" },
		{ label: "Resume", href: "#" }
	];
</script>

{#snippet title()}
	Rafli
{/snippet}

{#snippet items()}
	{#each navItems as item}
		<li><a href={item.href}>{item.label}</a></li>
	{/each}
{/snippet}

<Drawer {items}>
	{#snippet content()}
		<Navbar {title} {items} />
		<main class="pt-16 min-h-screen">
			{@render children()}
		</main>
	{/snippet}
</Drawer>
