<script>
	import { page } from '$app/stores';
	import { pack, unpack } from 'msgpackr';
	import exampleMovie from './example-movie.mp4?url';
	import { onMount } from 'svelte';

	const start = () => {
		const message = {
			Command: {
				CameraFeedInterest: {
					wants_camera_feed: true
				}
			}
		};

		const encodedMessage = pack(message);

		const websocket = $page.data.websocket;
		websocket.send(encodedMessage);

		const unlisten = $page.data.messages.listen(async (message) => {
			const blob = message.data;
			const arrayBuffer = await new Response(blob).arrayBuffer();
			const arrayView = new Uint8Array(arrayBuffer);
			const decodedMessage = unpack(arrayView);
			
			console.debug("received", decodedMessage);
		});

		const stop = () => {
			unlisten();

			const message = {
				Command: {
					CameraFeedInterest: {
						wants_camera_feed: false
					}
				}
			};

			const encodedMessage = pack(message);

			websocket.send(encodedMessage);
		};

		return stop;
	};

	onMount(() => {
		return start();
	});
</script>

<div class="flex-1 flex justify-center items-center">
	<div class="live-feed">
		<!-- TODO: replace with imgs stacking on top of each other (and removed when a one above it loads in) as received from the proxy -->
		<video width="720" height="400" controls>
			<source src={exampleMovie} type="video/mp4" />
		</video>
	</div>
	<div class="lorem-ipsum" />
</div>
