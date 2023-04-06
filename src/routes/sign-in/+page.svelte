<script>
	import { pack, unpack } from 'msgpackr';

	import Icon from '@iconify/svelte/dist/OfflineIcon.svelte';

	import { localStorageWritable } from '@babichjacob/svelte-localstorage';

	import login_avatar from './login_avatar.png';

	import chip from '@iconify-icons/bxs/chip';
	import user from '@iconify-icons/bxs/user';
	import logInCircle from '@iconify-icons/bxs/log-in-circle';
	import dotsHorizontalRounded from '@iconify-icons/bx/dots-horizontal-rounded';

	import { page } from '$app/stores';

	import { next } from '@babichjacob/emitter';
	import { asyncFiltered, asyncFilteredMapped, filtered, satisfies } from '$lib/more-store-tools';
	import { goto } from '$app/navigation';

	const microcontrollerId = localStorageWritable('microcontroller-id', 'system-number-1');
	const username = localStorageWritable('username', '');
	const password = localStorageWritable('password', '');

	/** @type {"Unattempted" | "Pending" | "SystemOffline" | "Successful" | "Rejected"} */
	let state = 'Unattempted';

	const signIn = async () => {
		const connection = $page.data.connection;
		console.debug({ connection });

		await Promise.race([
			satisfies($page.data.connection, (state) => {
				console.debug({ state });
				return state === 'Open';
			}),
			new Promise((resolve) => setTimeout(resolve, 100))
		]);

		/** @type {WebSocket} */
		const websocket = $page.data.websocket;

		console.debug({ websocket });

		const message = {
			Authenticate: {
				microcontroller_id: $microcontrollerId,
				login_info: {
					username: $username,
					password: $password
				}
			}
		};

		const encodedMessage = pack(message);

		console.debug({ encodedMessage });

		state = 'Pending';

		websocket.send(encodedMessage);

		const messages = $page.data.messages;

		const signInResponses = asyncFilteredMapped(messages, async (message) => {
			const blob = message.data;
			const arrayBuffer = await new Response(blob).arrayBuffer();
			const arrayView = new Uint8Array(arrayBuffer);
			const decodedMessage = unpack(arrayView);

			if (decodedMessage === 'MicrocontrollerIsOffline') return ['SystemOffline'];

			if (decodedMessage.toString() !== '[object Object]') return [];

			if ('Authenticated' in decodedMessage) {
				if (decodedMessage['Authenticated']) return ['Successful'];
				return ['Rejected'];
			}

			return [];
		});

		const signInResponse = await next(signInResponses);

		state = signInResponse;

		console.debug({ signInResponse });

		if (state === 'Successful') {
			await goto('/lighting');
		}
	};

	const signInAfterDelay = async () => {
		await new Promise((resolve) => setTimeout(resolve, 300));

		signIn();
	};

	signInAfterDelay();
</script>

<form
	class="flex-1 flex flex-col justify-center"
	class:opacity-50={state === 'Pending'}
	class:pointer-events-none={state === 'Pending'}
	on:submit={signIn}
>
	<div class="flex justify-center">
		<div class="rounded-full p-4 bg-primary">
			<img src={login_avatar} alt="Avatar" class="w-32 h-32" />
		</div>
	</div>
	<div class="flex flex-col gap-8">
		<div class="flex flex-col gap-y-6">
			<label class="flex flex-col gap-y-2">
				<div class="flex items-center gap-x-2">
					<Icon icon={chip} inline class="text-on-primary-dimmer-more" /><span>System ID</span>
				</div>
				<input type="text" bind:value={$microcontrollerId} required />
			</label>

			<div class="flex flex-row gap-4">
				<label class="flex flex-col gap-y-2">
					<div class="flex items-center gap-x-2">
						<Icon icon={user} inline class="text-on-primary-dimmer-more" /><span>Username</span>
					</div>
					<input type="text" bind:value={$username} required />
				</label>
				<label class="flex flex-col gap-y-2">
					<div class="flex items-center gap-x-2">
						<Icon icon={dotsHorizontalRounded} inline class="text-on-primary-dimmer-more" /><span
							>Password</span
						>
					</div>
					<input type="password" bind:value={$password} required />
				</label>
			</div>
		</div>

		<div class="flex justify-center">
			<button
				type="submit"
				class="p-4 transition-colors duration-500 ease-out bg-action hover:bg-action-brighter text-on-action rounded-xl shadow-xl shadow-action/25"
			>
				<div class="flex items-center gap-x-2">
					<Icon icon={logInCircle} inline class="text-on-action-dimmer" /><span>Sign In</span>
				</div>
			</button>
		</div>
		<!-- <label>
			<input type="checkbox" checked name="remember" /> Remember me
		</label> -->
	</div>

	<!-- <div class="container" style="background-color: #e9e9e9">
					<button
						type="button"
						onclick="document.getElementById('id01').style.display='none'"
						class="cancelbtn">Cancel</button
					>
					<span class="psw">Forgot <a href="#">password?</a></span>
				</div> -->
</form>
