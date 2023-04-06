import { listenable } from '@babichjacob/emitter';
import { readable } from 'svelte/store';

/**
 * @template Event
 * @param {import("@babichjacob/emitter").Listenable<Event>} emitter
 * @param {function(Event): boolean} predicate
 * @returns {import("@babichjacob/emitter").Listenable<Event>}
 */
export const filtered = (emitter, predicate) => {
	return listenable(
		/** @param {import("@babichjacob/emitter").Emit<Event>} emit */
		(emit) =>
			emitter.listen((event) => {
				if (predicate(event)) emit(event);
			})
	);
};

/**
 * @template Event
 * @param {import("@babichjacob/emitter").Listenable<Event>} emitter
 * @param {function(Event): Promise<boolean>} predicate
 * @returns {import("@babichjacob/emitter").Listenable<Event>}
 */
export const asyncFiltered = (emitter, predicate) => {
	return listenable(
		/** @param {import("@babichjacob/emitter").Emit<Event>} emit */
		(emit) =>
			emitter.listen(async (event) => {
				if (await predicate(event)) emit(event);
			})
	);
};

/**
 * @template Event
 * @template MappedEvent
 * @param {import("@babichjacob/emitter").Listenable<Event>} emitter
 * @param {function(Event): Promise<[] | [MappedEvent]>} predicate
 * @returns {import("@babichjacob/emitter").Listenable<MappedEvent>}
 */
export const asyncFilteredMapped = (emitter, predicate) => {
	return listenable(
		/** @param {import("@babichjacob/emitter").Emit<MappedEvent>} emit */
		(emit) =>
			emitter.listen(async (event) => {
				const mapped = await predicate(event);

				if (!mapped.length) return;

				const [mappedEvent] = mapped;
				emit(mappedEvent);
			})
	);
};

/**
 * @template Event
 * @param {import('@babichjacob/emitter').Listenable<Event>} emitter
 * @param {Event} initial
 * @returns {import("@babichjacob/store").Readable<Event>}
 */
export const latest = (emitter, initial) => {
	return readable(initial, emitter.listen);
};

/**
 * @template Value
 * @param {import('@babichjacob/store').Readble<Value>} store
 * @param {function(Value): boolean} predicate
 * @returns {Promise<Value>}
 */
export const satisfies = (store, predicate) => {
	return new Promise((resolve) => {
		const unsubscribe = store.subscribe((value) => {
			if (predicate(value)) {
				resolve(value);

				try {
					unsubscribe();
				} catch {
					setImmediate(() => {
						unsubscribe();
					});
				}
			}
		});
	});
};
