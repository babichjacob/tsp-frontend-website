<script>
	import { PUBLIC_PROXY_ENDPOINT } from '$env/static/public';

	import { page } from '$app/stores';
	import { latest } from '$lib/more-store-tools';

	$: connection = $page.data.connection;
	$: latestMessage = latest($page.data.messages);

	let value;

	$: latestMessage.subscribe(async (event) => {
		if (!event) return;
		const blob = event.data;
		console.log(blob);

		const arrayBuffer = await new Response(blob).arrayBuffer();
		console.log(arrayBuffer);

		const arrayView = new Uint8Array(arrayBuffer);
		console.log(arrayView);

		const dec = new TextDecoder();

		const res = dec.decode(arrayBuffer);

		console.log(res);
	});
</script>

<h1>The proxy endpoint is {PUBLIC_PROXY_ENDPOINT}</h1>

{$connection}

{$latestMessage?.data}

<input type="text" bind:value />

<button
	on:click={() => {
		$page.data.websocket.send(value);
	}}>Send</button
>

<slot />
