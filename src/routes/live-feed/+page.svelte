<script>
	import exampleMovie from './example-movie.mp4?url';
</script>

<div class="feed-container">
	<div class="live-feed">
		<!-- TODO: replace with imgs stacking on top of each other (and removed when a one above it loads in) as received from the proxy -->
		<video width="720" height="400" controls>
			<source src={exampleMovie} type="video/mp4" />
		</video>
	</div>
	<div class="lorem-ipsum" />
</div>

<style>
	.feed-container {
		display: flex;
	}

	.live-feed {
		/*ackground-color: rgb(212, 171, 177);*/
		position: relative;
		width: 1000px;
		height: 700px;
		top: 80px;
		right: 100px;
		left: 100px;
	}

	@media screen and (max-height: 450px) {
		video {
			width: 200px;
			height: 100px;
		}
	}
</style>
