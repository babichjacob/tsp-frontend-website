<script>
	import exampleMovie from './example-movie.mp4?url';
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
