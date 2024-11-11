<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import bannerImage from '../assets/replen-banner.jpg';
    const dispatch = createEventDispatcher();

    export let answers;
    export let userEmail;
    let showContent = false;
    let productRecommendations = [];


    async function loadProductData() {

        const response = await fetch('https://qportal.thedevelopmentsuite.com/json/feed-1.json');
        const product_data = await response.json();
        //console.log(product_data);

        const answersResponse = await fetch('/skincare-quiz/data/answers.json');
        const answer_map = await answersResponse.json();
        //console.log(answer_map);

        // build answer Key
        const answer_key = Object.values(answers).join('-');
        //console.log(answer_key);

        // lookup answers
        productRecommendations = answer_map[answer_key].map(entry => product_data[entry] || {});

        //console.log(productRecommendations);
    }

    onMount(() => {
        loadProductData();
        dispatch('track', {'event': 'quiz-complete-show-results', data: {'answers': answers, 'recommendations': productRecommendations}});
    });

    function addToCart(product) {


        // Send a message to the parent
        window.parent.postMessage({
            type: 'ADD_TO_CART',
            data: {
                skus: [product.sku],
            }
        }, "*");

        //dispatch('track', {'event': 'quiz-added-to-cart', data: {sku: product.sku, name: product.name}});
    }

    function isOnSale(product) {

        if (!product.sale_price || !product.sale_price_start) {
            return false;
        }

        const currentDate = new Date();
        const startDate = new Date(product.sale_price_start);

        if (product.sale_price_end) {
            const endDate = new Date(product.sale_price_end);
            return currentDate >= startDate && currentDate <= endDate;
        }

        return false;
    }

    function restart() {
        dispatch('restart');
        showContent = true;
    }
</script>

<!--<div class="w-full h-64 bg-cover bg-center" style="background-image: url({bannerImage});">-->
<!--    <div class="flex items-center justify-center h-full bg-black bg-opacity-10">-->
<!--    </div>-->
<!--</div>-->

<div class="text-center">

    <h1 class="text-6xl font-grotesque">Your Recommendations</h1>

    <div class="${showContent ? 'opacity-100 animate-fadeIn' : 'opacity-0'}`}">
        <p class="mb-6">Based on your answers, here are some product recommendations:</p>

        <div class="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each productRecommendations as product}
                    <div class="p-4 rounded shadow">
                        <img class="object-cover" src="{product.image_link}"/><br/>
                        {product.name}<br/>
                        {#if isOnSale(product) }
                            <span class="text-base line-through">{product.price}</span><br/>
                            <span class="text-red-500">{product.sale_price}</span><br/>
                        {:else}
                            {product.price}<br/>
                        {/if}

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
</div>
