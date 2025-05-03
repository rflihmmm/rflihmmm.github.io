<script>
	import Particles from "$lib/components/particles.svelte";
	import { Instagram, Github } from "@lucide/svelte";

	const size = "35px";
	const social = [
		{
			href: "https://github.com/rflihmmm",
			icon: Github
		},
		{
			href: "https://instagram.com/rflihmmm",
			icon: Instagram
		}
	];
</script>

<Particles>
	{#snippet children()}
		<div class="hero min-h-screen min-w-screen">
			<div class="hero-content absolute left-5 md:left-10 bottom-24">
				<div class="max-w-full">
					<h1 class="text-5xl font-bold text-white">Hello, I'm Rafli Hamdani</h1>
					<p class="py-3 text-white text-lg">Fresh Graduate | Fullstack Developer</p>
					<ul class="flex gap-3">
						{#each social as item}
							<li>
								<a href={item.href}><svelte:component this={item.icon} {size} /></a>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	{/snippet}
</Particles>
