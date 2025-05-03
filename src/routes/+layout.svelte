<script>
	import "../app.css";
	import Drawer from "$lib/components/drawer.svelte";
	import Navbar from "$lib/components/navbar.svelte";
	let { children } = $props();

	const navItems = [
		{ label: "Home", href: "/" },
		{ label: "About", href: "/about" },
		{ label: "Services", href: "/services" },
		{ label: "Contact", href: "/contact" }
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
		{@render children()}
	{/snippet}
</Drawer>
