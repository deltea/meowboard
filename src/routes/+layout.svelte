<script lang="ts">
	import "$lib/theme.css";
	import "./layout.css";
	import "iconify-icon";
	import { onMount } from "svelte";

	let { children } = $props();

	onMount(() => {});
</script>

<svelte:head>
	<!-- Prevent flash of wrong theme before Svelte mounts -->
	<script>!(function(){try{var k="kb:theme",s=localStorage.getItem(k);if(s){var p=JSON.parse(s);document.documentElement.setAttribute("data-theme",p.mode||"light");document.documentElement.setAttribute("data-palette",p.palette||"default")}else{var m=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.setAttribute("data-theme",m?"dark":"light");document.documentElement.setAttribute("data-palette","default")}}catch(e){}})();</script>
</svelte:head>

{@render children()}
