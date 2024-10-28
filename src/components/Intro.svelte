<script>
    import { createEventDispatcher } from 'svelte';
    import ttsLogo from '../assets/logo.svg'
    import fallImg from '../assets/fall.webp'
    import sunImg from '../assets/sun.webp'
    import elmImg from '../assets/elemis_products.jpg'
    const dispatch = createEventDispatcher();

    function startQuiz() {
        dispatch('next');
    }
</script>

<div class="h-screen w-screen grid grid-cols-1 md:grid-cols-2">

    <div class="flex items-center justify-center p-8 text-center">
        <div class="text-center">
            <h1 class="text-3xl font-bold font-grotesque mb-4 text-tts-gold">Find your perfect match!</h1>
            <p class="mb-6">This quiz will help you discover something amazing about yourself ...</p>
            <button on:click={startQuiz} class="bg-tts-gold font-grotesque uppercase text-white px-6 py-2 rounded">
                Start Quiz
            </button>
        </div>
    </div>

    <div class="flex items-center justify-center p-8 text-center">
        <div class="space-y-8 relative">
            <img src={ttsLogo} alt="Logo" class="mb-8" />




        </div>
    </div>



</div>
