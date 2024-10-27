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

    <div class="bg-tts-purple flex items-center justify-center p-8 text-center">
        <div class="text-center">
            <h1 class="text-3xl font-bold font-grotesque mb-4 text-tts-gold">Welcome to the Quiz!</h1>
            <h1 class="text-3xl font-bold mb-4 text-tts-gold">Welcome to the Quiz!</h1>
            <p class="mb-6">This quiz will help you discover something amazing about yourself!</p>
            <button on:click={startQuiz} class="bg-blue-500 text-white px-6 py-2 rounded">
                Start Quiz
            </button>
        </div>
    </div>

    <div class="flex items-center justify-center p-8 text-center">
        <div class="space-y-8 relative">
            <img src={ttsLogo} alt="Logo" class="mb-8" />
            <!-- Box 1 - offset left -->
            <div class="w-48 h-48  rounded-lg transform -translate-x-4">
                <img src={fallImg}>
            </div>

            <!-- Box 2 - offset right -->
            <div class="w-48 h-48  rounded-lg transform translate-x-4">
                <img src={elmImg}>
            </div>

            <!-- Box 3 - offset left -->
            <div class="w-48 h-48  rounded-lg transform -translate-x-4">
                <img src={sunImg}>
            </div>
        </div>
    </div>



</div>
