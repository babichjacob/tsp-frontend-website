<script>
	import { page } from '$app/stores';

	// TODO: does this actually use the ico format?
	import faviconIco from './favicon.png?width=32&height=32&format=ico';
	import favicon from './favicon.png?width=128&height=128&format=png';
	import appleTouchIcon from './favicon.png?width=180&height=180&format=png';

	import login_avatar from './login_avatar.png';

	import interactivity from './interactivity.js?url';
</script>

<div class="header">
	<div class="left-header">
		<div>
			<!-- add id="main" to push button to right-->
			<button class="openbtn" onclick="openNav()">&#9776;</button>
			<span style="margin-left: 15px;">Team Second Place</span>
		</div>
	</div>
	<div class="right-header">
		<button
			class="login-button"
			onclick="document.getElementById('id01').style.display='block'"
			style="width:auto;">Login</button
		>

		<div id="id01" class="modal">
			<span
				onclick="document.getElementById('id01').style.display='none'"
				class="close"
				title="Close Modal">&times;</span
			>

			<form class="modal-content animate" action="/action_page.php" method="post">
				<div class="imgcontainer">
					<img src={login_avatar} alt="Avatar" class="avatar" />
				</div>
				<div class="container">
					<label for="uname"><b>Username</b></label>
					<input type="text" placeholder="Enter Username" name="uname" required />

					<label for="psw"><b>Password</b></label>
					<input type="password" placeholder="Enter Password" name="psw" required />

					<button type="submit" class="login-button">Login</button>
					<label>
						<input type="checkbox" checked="checked" name="remember" /> Remember me
					</label>
				</div>

				<div class="container" style="background-color: #e9e9e9">
					<button
						type="button"
						onclick="document.getElementById('id01').style.display='none'"
						class="cancelbtn">Cancel</button
					>
					<span class="psw">Forgot <a href="#">password?</a></span>
				</div>
			</form>
		</div>
	</div>
</div>

<div id="mySidebar" class="sidebar">
	<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&#9776;</a>
	<a href="/lighting">Lighting</a>
	<a href="/security">Security</a>
	<a href="/recordings">Recordings</a>
	<a href="/live-feed">Live Feed</a>
</div>

<slot />

<svelte:head>
	<link rel="icon" href={faviconIco} />
	<link rel="shortcut icon" type="image/png" href={favicon} />
	<link rel="apple-touch-icon" href={appleTouchIcon} />

	<title>{$page.data.title}</title>

	<!-- TODO: extract out as much as I can to be regular svelte -->
	<script src={interactivity}></script>
</svelte:head>
