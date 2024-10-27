<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let selectedAnswer = '';
    let showRequiredMessage = false; // Flag to show required message

    function next() {
        if (!selectedAnswer) {
            showRequiredMessage = true; // Show message if no answer selected
        } else {
            showRequiredMessage = false; // Hide message if answer is selected
            dispatch('answer', 'Q1' + selectedAnswer);
            dispatch('next');
        }
    }

    function back() {
        dispatch('back');
    }
</script>

<div class="text-center">
    <h2 class="text-2xl font-bold mb-4">Question 1</h2>
    <p class="mb-6">What is your favorite color?</p>
    <label class="block mb-2">
        <input type="radio" bind:group={selectedAnswer} value="A" /> Red
    </label>
    <label class="block mb-2">
        <input type="radio" bind:group={selectedAnswer} value="B" /> Blue
    </label>
    <label class="block mb-2">
        <input type="radio" bind:group={selectedAnswer} value="C" /> Green
    </label>

    <!-- Display required message if no answer is selected -->
    {#if showRequiredMessage}
        <p class="text-red-500 mt-2">Please select an answer to proceed.</p>
    {/if}

    <button on:click={next} class="bg-blue-500 text-white px-6 py-2 rounded mt-4">Next</button>
    <button on:click={back} class="bg-gray-300 text-black px-6 py-2 rounded mt-2">Back</button>
</div>
