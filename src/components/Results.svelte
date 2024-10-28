<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import bannerImage from '../assets/replen-banner.jpg';
    const dispatch = createEventDispatcher();

    export let answers;
    export let userEmail;
    let productRecommendations = [];

    async function loadProductData() {

        const response = await fetch('/quiz-test/data/products.json');
        const product_data = await response.json();
        console.log(product_data);

        const answersResponse = await fetch('/quiz-test/data/answers.json');
        const answer_map = await answersResponse.json();
        console.log(answer_map);

        // build answer Key
        const answer_key = Object.values(answers).join('-');
        console.log(answer_key);

        // lookup answers
        productRecommendations = answer_map[answer_key].map(entry => product_data[entry] || {});

        console.log("RECCCS:");
        console.log(productRecommendations);


    }

    onMount(() => {
        loadProductData();
    });

    function addToCart(product) {
        console.log(product);
    }

    function restart() {
        dispatch('restart');
    }
</script>

<!--<div class="w-full h-64 bg-cover bg-center" style="background-image: url({bannerImage});">-->
<!--    <div class="flex items-center justify-center h-full bg-black bg-opacity-10">-->
<!--    </div>-->
<!--</div>-->

<div class="text-center">

    <h1 class="text-6xl font-grotesque">Your Recommendations</h1>
    <p class="mb-6">Based on your answers, here are some product recommendations:</p>
    <div class="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each productRecommendations as product}
                <div class="p-4 rounded shadow">
                    <img class="object-cover" src="{product.image_link}"/><br/>
                    {product.name}<br/>
                    {product.price}<br/>
                    <button on:click={() => addToCart(product)} class="bg-tts-gold text-white px-6 py-2 rounded mt-6">
                        Add To Cart
                    </button>
                </div>
        {/each}
    </div>
    <button on:click={restart} class="bg-tts-gold text-white px-6 py-2 rounded mt-6">
        Restart Quiz
    </button>
</div>
