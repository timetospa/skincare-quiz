<script>
    import {createEventDispatcher} from 'svelte';
    import {onMount} from 'svelte';

    const dispatch = createEventDispatcher();

    let userEmail = '';
    let isEmailValid = true; // Track email validity
    let isSubscribed = false; // Track subscription state
    let buttonText = 'Subscribe'; // Initial button text

    export let selectedAnswerRecap;
    export let klaviyoInit;

    // Reactive statement to validate the email format
    $: isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail);

    async function showResults() {
        await subscribe(userEmail);
        //dispatch('subscribe', userEmail);
        dispatch('showResults');
    }


    async function subscribe() {
        console.log(userEmail);
        // Send a message to the parent

        if (!isEmailValid) {
            return; // Prevent submission if the email is not valid
        }

        if (userEmail) {
            window.parent.postMessage({
                type: 'SUBSCRIBE',
                data: {
                    email: userEmail,
                }
            }, "*");
        }
        buttonText = 'Subscribed!'; // Change the text
        isSubscribed = true; // Disable the button

    }

    function back() {
        dispatch('back');
    }
</script>

<div class="h-screen w-screen grid grid-cols-1 md:grid-cols-3">

    <div class="col-span-3 md:col-span-2 flex items-center justify-center">
        <div class="w-full flex flex-col pl-8 ">
            <div class="h-[100px] ">
                <h1 class="text-6xl font-grotesque">Keep In Touch</h1>
                <h2 class="text-2xl font-bold mb-4">Sign up to our newsletter</h2>
            </div>
            <div class="w-full ">

                <label class="block mb-2">
                    <input type="email" bind:value={userEmail} placeholder="You@example.com" disabled={isSubscribed}/>
                </label>

                {#if userEmail !== '' && !isEmailValid}
                    <p class="text-red-500">Please enter a valid email address.</p>
                {/if}

                <button on:click={subscribe} userEmail={userEmail}
                        class="bg-tts-purple font-grotesque uppercase text-white px-6 py-2 rounded"
                        disabled={isSubscribed}>
                    {buttonText}
                </button>

                <p class="italic"> Or skip for now</p>

                <button on:click={showResults}
                        class="bg-tts-purple font-grotesque uppercase text-white px-6 py-2 rounded">
                    Show Results
                </button>
                <button on:click={back} class="bg-tts-gold font-grotesque uppercase text-white px-6 py-2 rounded">Back
                </button>
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
                        <li class=" border-t border-tts-gold mt-2 pl-4 pt-4 pb-4 mr-6 font-grotesque">
                            {answerRecap[1]}
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>

</div>
