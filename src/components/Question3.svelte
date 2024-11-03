<script>
    import {createEventDispatcher, onMount} from 'svelte';
    const dispatch = createEventDispatcher();

    let selectedAnswer = '';
    let showRequiredMessage = false;
    let showContent = false;
    export let selectedAnswerRecap;

    // Reactive statement to trigger `next` only after `selectedAnswer` updates
    $: if (selectedAnswer) {
        next();
    }

    function next() {
        dispatch('answer', 'Q3' + selectedAnswer);
        dispatch('next');
    }

    function back() {
        dispatch('back');
    }

    onMount(() => {
        showContent = true;
    })

</script>


<div class="h-screen w-screen grid grid-cols-1 md:grid-cols-3">

    <div class="col-span-3 md:col-span-2 flex items-center justify-center">
        <div class="w-full flex flex-col pl-8 ">
            <div class="h-[100px] mb-5">
                <h1 class="text-6xl font-grotesque">Skincare Quiz</h1>
                <h2 class="text-2xl font-bold mb-4">How would you like your skincare experience to be?</h2>
            </div>
            <div class="w-full mt-2 {`transition-opacity duration-700 ${showContent ? 'opacity-100 animate-fadeIn' : 'opacity-0'}`}">

                <input id="optionA" type="radio" class="hidden peer" bind:group={selectedAnswer} value="A"/>
                <label for="optionA" class="flex items-center justify-center text-base px-2 py2 w-4/5 md:w-2/3 h-12 mb-5 border-2 border-gray-400 bg-white rounded-lg cursor-pointer peer-checked:border-tts-gold-900 peer-checked:bg-tts-gold peer-checked:text-white transition hover:bg-tts-gold hover:text-white">
                    Simple and effortless (3 steps)
                </label>

                <input id="optionB" type="radio" class="hidden peer" bind:group={selectedAnswer} value="B"/>
                <label for="optionB" class="flex items-center justify-center w-4/5 md:w-2/3 h-12 mb-5 border-2 border-gray-400 bg-white rounded-lg cursor-pointer peer-checked:border-tts-gold-900 peer-checked:bg-tts-gold peer-checked:text-white transition hover:bg-tts-gold hover:text-white">
                    A little extra care (4 steps)
                </label>

                <input id="optionC" type="radio" class="hidden peer" bind:group={selectedAnswer} value="C"/>
                <label for="optionC" class="flex items-center justify-center w-4/5 md:w-2/3 h-12 mb-5 border-2 border-gray-400 bg-white rounded-lg cursor-pointer peer-checked:border-tts-gold-900 peer-checked:bg-tts-gold peer-checked:text-white transition hover:bg-tts-gold hover:text-white">
                    A luxurious ritual (6 steps)
                </label>

                <button on:click={back} class="bg-tts-gold font-grotesque uppercase text-white px-6 py-2 rounded">Back</button>
            </div>
        </div>
    </div>

    <div class="col-span-3 md:col-span-1 flex items-start justify-center md:mt-[170px]">
        <div class="w-full flex flex-col pl-8 ">
            <div class="mr-0 md:mr-8">
                <h1 class="text-6xl font-grotesque">Answers</h1>
            </div>
            <div class="w-full h-3/4 ">
                <ul class="list-none">
                    {#each Object.entries(selectedAnswerRecap) as answerRecap}
                        <li class="border-t border-tts-gold mt-2 pl-4 pt-4 pb-4 mr-6 font-grotesque">
                            {answerRecap[1]}
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>

</div>
