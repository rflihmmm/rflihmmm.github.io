<!-- ParticleLayout.svelte -->
<script>
	import { onMount } from "svelte";
	import * as THREE from "three";

	// Props yang dapat dikustomisasi
	const {
		content,
		particleCount = 1500,
		colors = [0x9c27b0, 0x673ab7, 0x3f51b5, 0x2196f3],
		mathText = "\\\\(x_{i} \\\\leq x_{j}\\\\)",
		showMathText = true
	} = $props();

	let canvas;
	let scene, camera, renderer, particleSystem;

	onMount(() => {
		// Setup Three.js
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		renderer = new THREE.WebGLRenderer({
			antialias: true,
			canvas: canvas,
			alpha: true
		});

		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(0x0f0524, 1);
		camera.position.z = 30;

		// Setup particles
		const particles = new THREE.BufferGeometry();
		const positions = new Float32Array(particleCount * 3);
		const colorsArray = new Float32Array(particleCount * 3);

		for (let i = 0; i < particleCount; i++) {
			positions[i * 3] = (Math.random() - 0.5) * 100;
			positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
			positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

			const color = new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
			colorsArray[i * 3] = color.r;
			colorsArray[i * 3 + 1] = color.g;
			colorsArray[i * 3 + 2] = color.b;
		}

		particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
		particles.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3));

		const particleMaterial = new THREE.PointsMaterial({
			size: 0.5,
			vertexColors: true,
			transparent: true,
			opacity: 0.7,
			blending: THREE.AdditiveBlending
		});

		particleSystem = new THREE.Points(particles, particleMaterial);
		scene.add(particleSystem);

		// Animation loop
		const animate = () => {
			requestAnimationFrame(animate);

			particleSystem.rotation.x += 0.001;
			particleSystem.rotation.y += 0.002;

			const positions = particles.attributes.position.array;
			for (let i = 0; i < particleCount; i++) {
				positions[i * 3] += (Math.random() - 0.5) * 0.1;
				positions[i * 3 + 1] += (Math.random() - 0.5) * 0.1;
				positions[i * 3 + 2] += (Math.random() - 0.5) * 0.1;
			}
			particles.attributes.position.needsUpdate = true;

			renderer.render(scene, camera);
		};

		// Handle resize
		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener("resize", handleResize);
		animate();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	});
</script>

<div
	class="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-base-900 to-base-950"
>
	<!-- Canvas Background -->
	<canvas bind:this={canvas} class="fixed top-0 left-0 w-full h-full z-0"></canvas>

	<!-- Overlay Konten -->
	{@render content()}
</div>
