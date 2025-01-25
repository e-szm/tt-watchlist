<script>
	import Form from '$lib/components/Form.svelte';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
</script>

<main class="container">
	<div class="hero grid--2-col">
		<div class="hero-content">
			<h1>Welcome Back</h1>
			<p class="text--lg">Please log in to begin a new session.</p>
			<Form method="POST">
				<Input label="Username" type="text" />
				<Input label="Password" type="password" />
				<Button type="primary" --margin="2.8rem 0 0 0" --align-self="flex-end">Log In</Button>
			</Form>
		</div>
		<img src="/hero-img.jpg" alt="3D bar chart" />
	</div>
</main>

<style>
	.hero {
		column-gap: 2.4rem;

		max-width: 98rem;
		margin: 0 auto;
		padding: 0.8rem;

		background-color: #fff;
		border-radius: var(--border-radius--xl);
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 2.4rem;

		padding: 3.2rem;
	}

	.hero-content p {
		margin-bottom: 3rem;
	}

	.hero img {
		max-width: 100%;
		border-radius: var(--border-radius--xl);
	}
</style>
