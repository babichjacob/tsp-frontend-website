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
 * @param {import('@babichjacob/emitter').Listenable<Event>} emitter
 * @param {Event} initial
 * @returns {import("@babichjacob/store").Readable<Event>}
 */
export const latest = (emitter, initial) => {
	return readable(initial, emitter.listen);
};
