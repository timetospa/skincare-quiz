<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let email = '';

    function showResults() {
            dispatch('subscribe', email);
            dispatch('showResults');
    }

    function back() {
        dispatch('back');
    }
</script>

<div class="text-center">
    <h2 class="text-2xl font-bold mb-4">Keep In Touch</h2>
    <p class="mb-6">Sign up to our newsletter</p>
    <label class="block mb-2">
        <input type="email" bind:value={email} placeholder="You@example.com"/>
    </label>
    <p class="italic"> Or skip for now</p>
    <button on:click={showResults} class="bg-green-500 text-white px-6 py-2 rounded">
        Show Results
    </button>
    <button on:click={back} class="bg-gray-300 text-black px-6 py-2 rounded mt-2">Back</button>
</div>
