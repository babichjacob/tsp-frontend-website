import { listenable, mapped } from '@babichjacob/emitter';
import { filtered, latest } from '$lib/more-store-tools';

/**
 * @typedef {{ variant: "Close", close: Event }} CloseEvent
 * @typedef {{ variant: "Error", error: Event }} ErrorEvent
 * @typedef {{ variant: "Message", message: Event }} MessageEvent
 * @typedef {{ variant: "Open", open: Event }} OpenEvent
 *
 * @typedef {CloseEvent | ErrorEvent | MessageEvent | OpenEvent} WebSocketEvent
 */

/** @typedef {"Opening" | "Error" | "Open" | "Close"} ConnectionState */

/**
 * @param {URL} url
 * @returns {{
 *     connection: import("@babichjacob/store").Readable<ConnectionState>,
 *     allEvents: import("@babichjacob/emitter").Listenable<WebSocketEvent>,
 *     messages: import("@babichjacob/emitter").Listenable<Event>,
 *     websocket: WebSocket,
 * }}
 */
export const createWebSocketStuff = (url) => {
	const websocket = new WebSocket(url);

	const allEvents = listenable(
		/**
		 * @param {import("@babichjacob/emitter").Emit<WebSocketEvent>} emit
		 */
		(emit) => {
			/** @param {Event} e */
			const onClose = (e) => {
				console.debug('close', e);

				emit({
					variant: 'Close',
					close: e
				});
			};
			/** @param {Event} e */
			const onError = (e) => {
				console.error('error', e);

				emit({
					variant: 'Error',
					error: e
				});
			};

			/** @param {Event} e */
			const onMessage = (e) => {
				console.debug('message', e);

				emit({
					variant: 'Message',
					message: e
				});
			};

			/** @param {Event} e */
			const onOpen = (e) => {
				console.debug('open', e);

				emit({
					variant: 'Open',
					open: e
				});
			};

			websocket.addEventListener('close', onClose);
			websocket.addEventListener('error', onError);
			websocket.addEventListener('message', onMessage);
			websocket.addEventListener('open', onOpen);

			const stop = () => {
				websocket.removeEventListener('close', onClose);
				websocket.removeEventListener('error', onError);
				websocket.removeEventListener('message', onMessage);
				websocket.removeEventListener('open', onOpen);
			};

			return stop;
		}
	);

	const messages = mapped(
		filtered(allEvents, (event) => event.variant === 'Message'),
		(event) => event.message
	);

	const connectionEvents = filtered(allEvents, (event) =>
		['Close', 'Error', 'Open'].includes(event.variant)
	);
	const connection = latest(
		mapped(connectionEvents, (event) => event.variant),
		'Opening'
	);

	return { allEvents, connection, messages, websocket };
};
