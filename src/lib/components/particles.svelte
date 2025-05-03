<script>
	import { onMount, onDestroy } from "svelte";
	import * as THREE from "three";

	const {
		children,
		backgroundColor = "#0f0524",
		showMathText = true,
		mathText = "\$$x_{i} \\leq x_{j}\$$"
	} = $props();

	let container;
	let scene, camera, renderer, particleSystem, particles;
	let animationId;

	onMount(() => {
		// Initialize scene, camera, renderer
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(backgroundColor, 1);
		container.appendChild(renderer.domElement);

		// Position camera
		camera.position.z = 30;

		// Particles
		const particleCount = 2000;
		particles = new THREE.BufferGeometry();
		const positions = new Float32Array(particleCount * 3);
		const colors = new Float32Array(particleCount * 3);

		// Particle colors (purple and blue)
		const colorPalette = [
			new THREE.Color(0x9c27b0), // Purple
			new THREE.Color(0x673ab7), // Deep purple
			new THREE.Color(0x3f51b5), // Indigo
			new THREE.Color(0x2196f3) // Blue
		];

		// Initialize particle positions and colors
		for (let i = 0; i < particleCount; i++) {
			positions[i * 3] = (Math.random() - 0.5) * 100;
			positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
			positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

			const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
			colors[i * 3] = color.r;
			colors[i * 3 + 1] = color.g;
			colors[i * 3 + 2] = color.b;
		}

		particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
		particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));

		// Particle material
		const particleMaterial = new THREE.PointsMaterial({
			size: 0.5,
			vertexColors: true,
			transparent: true,
			opacity: 0.8,
			blending: THREE.AdditiveBlending
		});

		particleSystem = new THREE.Points(particles, particleMaterial);
		scene.add(particleSystem);

		// Handle resize
		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener("resize", handleResize);

		// Animation
		function animate() {
			animationId = requestAnimationFrame(animate);

			// Rotate particles
			particleSystem.rotation.x += 0.001;
			particleSystem.rotation.y += 0.002;

			// Move particles
			const positions = particles.attributes.position.array;
			for (let i = 0; i < particleCount; i++) {
				positions[i * 3] += (Math.random() - 0.5) * 0.1;
				positions[i * 3 + 1] += (Math.random() - 0.5) * 0.1;
				positions[i * 3 + 2] += (Math.random() - 0.5) * 0.1;
			}
			particles.attributes.position.needsUpdate = true;

			renderer.render(scene, camera);
		}

		animate();

		// Cleanup function
		return () => {
			window.removeEventListener("resize", handleResize);
			cancelAnimationFrame(animationId);
			renderer.dispose();
			particles.dispose();
			if (container && renderer.domElement) {
				container.removeChild(renderer.domElement);
			}
		};
	});
</script>

<div class="particle-container" bind:this={container}></div>
<div class="content">
	{@render children()}
</div>

<style>
	.particle-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
	}

	:global(body) {
		margin: 0;
		overflow: hidden;
	}
	.content {
		position: relative;
		z-index: 1;
	}
</style>
