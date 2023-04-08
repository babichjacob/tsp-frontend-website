<script>
	import Icon from '@iconify/svelte/dist/OfflineIcon.svelte';

	import add from '@iconify-icons/bx/plus';
	import user from '@iconify-icons/bxs/user';
	import { pack } from 'msgpackr';
	import { page } from '$app/stores';

	let slot = 0;

	const addTrustedUser = async () => {
		const message = {
			Command: {
				AddNewTrustedUser: {
					user_slot: slot
				}
			}
		};

		const encodedMessage = pack(message);

		/** @type {WebSocket} */
		const websocket = $page.data.websocket;
		websocket.send(encodedMessage);
	};
</script>

<form on:submit={addTrustedUser}>
	<label class="flex flex-col gap-y-2">
		<div class="flex items-center gap-x-2">
			<Icon icon={user} inline class="text-on-primary-dimmer-more" /><span>User Slot</span>
		</div>
		<input type="number" bind:value={slot} required />
	</label>

	<button
		type="submit"
		class="p-4 transition-colors duration-500 ease-out bg-action hover:bg-action-brighter text-on-action rounded-xl shadow-xl shadow-action/25"
	>
		<div class="flex items-center gap-x-2">
			<Icon icon={add} inline class="text-on-action-dimmer" /><span>Add</span>
		</div>
	</button>
</form>
