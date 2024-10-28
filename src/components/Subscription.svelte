<script>
    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';
    const dispatch = createEventDispatcher();

    let userEmail = '';
    export let selectedAnswerRecap;
    export let klaviyoInit;

    async function showResults() {
        await subscribe(userEmail);
        //dispatch('subscribe', userEmail);
        dispatch('showResults');
    }

    async function subscribe(userEmail) {
        // try {
        //     const response = await fetch('https://a.klaviyo.com/api/v1/list/TE8H8H/members/', {
        //         method: 'POST',
        //         headers: {
        //             'Authorization': 'Klaviyo-API-Key QHnadM',
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             email: userEmail,
        //         })
        //     });
        //
        //     if (response.ok) {
        //
        //         responseMessage.textContent = 'Thank you for subscribing!';
        //         responseMessage.className = 'text-green-600';
        //         console.log('subscribed');
        //     } else {
        //         const errorData = await response.json();
        //         responseMessage.textContent = errorData.detail || 'There was an error subscribing.';
        //         console.log('subscribe error ');
        //         console.log(errorData.detail);
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        //     console.log('subscribe Exception ');
        // }


    }

    function back() {
        dispatch('back');
    }
    onMount(() => {
        // if (klaviyoInit) {
        //     return;
        // }
        //
        // const script = document.createElement('script');
        // script.src = "https://static.klaviyo.com/onsite/js/QHnadM/klaviyo.js";
        // script.async = true; // Load the script asynchronously
        // script.onload = () => {
        //     // Log to verify the script has loaded
        //
        //     klaviyoInit = true;
        //     console.log('Klaviyo script loaded - ' + klaviyoInit);
        //     if (window.Klaviyo) {
        //         window.Klaviyo.init();
        //     }
        //     // Optional: Trigger any necessary initialization for the form
        // };
        //
        // document.body.appendChild(script);

    });
</script>

<div class="h-screen w-screen grid grid-cols-1 md:grid-cols-3">

    <div class="col-span-3 md:col-span-2 flex items-center justify-center">
        <div class="w-full flex flex-col pl-8 ">
            <div class="h-[100px] ">
                <h1 class="text-6xl font-grotesque">Keep In Touch</h1>
                <h2 class="text-2xl font-bold mb-4">Sign up to our newsletter</h2>
            </div>
            <div class="w-full ">

<!--                <div class="klaviyo-form-XKmggp"></div>-->

                <label class="block mb-2">
                    <input type="email" bind:value={userEmail} placeholder="You@example.com"/>
                </label>
                <p class="italic"> Or skip for now</p>

                <button on:click={showResults} class="bg-tts-purple font-grotesque uppercase text-white px-6 py-2 rounded">
                    Show Results
                </button>
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
                        <li class=" border-t border-tts-gold mt-2 pl-4 pt-4 pb-4 mr-6 font-grotesque">
                            {answerRecap[1]}
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>

</div>
