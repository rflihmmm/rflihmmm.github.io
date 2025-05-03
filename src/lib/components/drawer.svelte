<script>
	const { content, items } = $props();
</script>

<div class="drawer drawer-end">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<!-- Page content here -->
		{@render content()}
	</div>
	<div class="drawer-side z-50">
		<label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul
			class="menu bg-base-200 text-base-content min-h-full w-80 px-4 py-20 gap-4 flex items-center"
		>
			<!-- Sidebar content here -->
			{@render items()}
		</ul>
	</div>
</div>
