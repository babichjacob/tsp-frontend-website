<script>
	import { page } from '$app/stores';

	// TODO: does this actually use the ico format?
	import faviconIco from './favicon.png?width=32&height=32&format=ico';
	import favicon from './favicon.png?width=128&height=128&format=png';
	import appleTouchIcon from './favicon.png?width=180&height=180&format=png';

	// // This variable will save the event for later use.
	// let deferredPrompt;
	// window.addEventListener('beforeinstallprompt', (e) => {
	// 	// Prevents the default mini-infobar or install dialog from appearing on mobile
	// 	e.preventDefault();
	// 	// Save the event because you'll need to trigger it later.
	// 	deferredPrompt = e;

	// 	console.log({ deferredPrompt });

	// 	// Show your customized install prompt for your PWA
	// 	// Your own UI doesn't have to be a single element, you
	// 	// can have buttons in different locations, or wait to prompt
	// 	// as part of a critical journey.
	// 	showInAppInstallPromotion();
	// });
	import { beforeNavigate } from '$app/navigation';

	import Icon from '@iconify/svelte/dist/OfflineIcon.svelte';

	import bulb from '@iconify-icons/bxs/bulb';
	import calendar from '@iconify-icons/bxs/calendar';
	import cameraHome from '@iconify-icons/bxs/camera-home';
	// import shield from '@iconify-icons/bxs/shield';
	// import videoRecording from '@iconify-icons/bxs/video-recording';
	import menu from '@iconify-icons/bx/menu';
	import x from '@iconify-icons/bx/x';

	const links = [
		{ href: '/lighting', text: 'Lighting', icon: bulb },
		{ href: '/live-feed', text: 'Live Feed', icon: cameraHome },
		{ href: '/history', text: 'History', icon: calendar }
	];

	const adminLinks = [
		// TODO
		{ href: '/add-trusted-user', text: 'Add Trusted User', icon: bulb },
	];

	let navOpen = false;

	beforeNavigate(() => {
		navOpen = false;
	});
</script>

<div class="bg-primary/75 flex-1 flex flex-col">
	<div
		class="h-screen fixed z-1 top-0 left-0 flex flex-col overflow-x-hidden transition-[width] duration-500 ease-out"
		class:w-0={!navOpen}
		class:w-64={navOpen}
	>
		<div class="p-3 pr-0 flex-1 flex flex-col">
			<div class="flex-1 flex flex-col rounded-xl backdrop-blur-xl bg-primary/50">
				<div class="flex justify-end p-3">
					<button
						class="flex items-center group gap-x-2 text-xl"
						on:click={() => {
							navOpen = false;
						}}
					>
						<span
							class="text-on-primary-dimmer group-hover:text-on-primary transition-colors duration-500 ease-out"
							>Close</span
						>
						<Icon
							icon={x}
							inline
							class="inline-block text-on-primary-dimmer-more group-hover:text-on-primary transition-colors duration-500 ease-out"
						/>
						<!-- </div> -->
					</button>
				</div>
				<div class="flex-1 flex flex-col justify-between">
					<div class="px-4 flex flex-col gap-y-4">
						{#each links as { href, icon, text }}
							<a {href} class="flex flex-row items-center group gap-x-2 text-xl w-64">
								<Icon
									{icon}
									inline
									class="inline-block text-on-primary-dimmer-more group-hover:text-on-primary transition-colors duration-500 ease-out"
								/>
								<span
									class="text-on-primary-dimmer group-hover:text-on-primary transition-colors duration-500 ease-out"
									>{text}</span
								>
							</a>
						{/each}
					</div>

					<div class="px-4 flex flex-col gap-y-4">
						{#each adminLinks as { href, icon, text }}
							<a {href} class="flex flex-row items-center group gap-x-2 text-xl w-64">
								<Icon
									{icon}
									inline
									class="inline-block text-on-primary-dimmer-more group-hover:text-on-primary transition-colors duration-500 ease-out"
								/>
								<span
									class="text-on-primary-dimmer group-hover:text-on-primary transition-colors duration-500 ease-out"
									>{text}</span
								>
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>

	<div
		class="flex-1 flex flex-col transition-[margin] duration-500 ease-out p-3 gap-3"
		class:ml-64={navOpen}
		class:-mr-64={navOpen}
	>
		<div
			class="flex flex-row justify-between items-center rounded-xl p-3 backdrop-filter backdrop-blur-md bg-primary/50"
		>
			<div class="text-xl">
				{#if $page.data.canOpenNav}
					<div class="flex gap-x-4">
						<button
							on:click={() => {
								navOpen = !navOpen;
							}}
							class="text-primary bg-on-primary p-4 rounded-xl"
						>
							<Icon icon={menu} />
						</button>
					</div>
				{/if}
			</div>

			<div class="text-2xl font-semibold">
				{$page.data.title}
			</div>

			<!-- Perfectly center the title text -->
			<div class="text-xl opacity-0 pointer-events-none">
				<div class="flex gap-x-4">
					<button class="text-primary bg-on-primary p-4 rounded-xl">
						<Icon icon={menu} />
					</button>
				</div>
			</div>
		</div>

		<div
			class="flex-1 flex flex-col justify-between items-center rounded-xl p-3 backdrop-filter backdrop-blur-md bg-primary/50"
		>
			<slot />
		</div>
	</div>
</div>

<svelte:head>
	<link rel="icon" href={faviconIco} />
	<link rel="shortcut icon" type="image/png" href={favicon} />
	<link rel="apple-touch-icon" href={appleTouchIcon} />

	<title>{$page.data.title}</title>
</svelte:head>
