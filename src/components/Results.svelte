<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let answers;
    export let email;
    let productRecommendations = [];

    async function loadProductData() {

        //const response = await fetch('/data/products.json');
        const response = await fetch('https://adetds.github.io/quiz-test/data/products.json');
        const product_data = await response.json();
        console.log(product_data);

        //const answersResponse = await fetch('/data/answers.json');
        const answersResponse = await fetch('https://adetds.github.io/quiz-test/data/answers.json');
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

    function restart() {
        dispatch('restart');
    }
</script>

<div class="text-center">
    <h2 class="text-2xl font-bold mb-4">Your Results</h2>
    <p class="mb-6">Based on your answers, here are some product recommendations:</p>
    <div class="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each productRecommendations as product}
                <div class="bg-blue-100 p-4 rounded shadow">
                    {product.name}<br/>
                    <img class="" src="{product.image_link}"/><br/>
                    {product.price}<br/>
                </div>
        {/each}
    </div>
    <button on:click={restart} class="bg-blue-500 text-white px-6 py-2 rounded mt-6">
        Restart Quiz
    </button>
</div>
