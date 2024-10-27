<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function startQuiz() {
        dispatch('next');
    }
</script>

<div class="text-center">
    <h1 class="text-3xl font-bold mb-4">Welcome to the Quiz!</h1>
    <p class="mb-6">This quiz will help you discover something amazing about yourself!</p>
    <button on:click={startQuiz} class="bg-blue-500 text-white px-6 py-2 rounded">
        Start Quiz
    </button>
</div>
