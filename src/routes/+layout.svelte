<script>
	import Navbar from '$lib/components/Navigation/Navbar.svelte';
	import '../app.css';
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    inject({ mode: dev ? 'development' : 'production' });
</script>

<div class="h-screen w-screen bg-white flex flex-col justify-start overflow-x-hidden">
	<Navbar/>
	<slot />
</div>
