<script>
  import svelteLogo from './assets/svelte.svg'

  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'


  import Intro from './components/Intro.svelte';
  import Question1 from './components/Question1.svelte';
  import Question2 from './components/Question2.svelte';
  import Question3 from './components/Question3.svelte';
  import Subscription from "./components/Subscription.svelte";
  import Results from './components/Results.svelte';


  let currentSlide = 0;
  let answers = {}; // To store user's answers
  let selectedAnswerRecap = {}; // To store user's answers
  let email = null;

  function nextSlide() {
      if (currentSlide < 5) currentSlide += 1;
  }

  function prevSlide() {
      if (currentSlide > 0) currentSlide -= 1;
  }

  function setAnswer(question, answer) {
      answers[question] = answer;
  }

  function setEmail(emailInput) {
      console.log('TODO: Send Email TO klaviyo');
      console.log('TODO: GTM EVENT?');

      email = emailInput;
  }

  function resetQuiz() {
      currentSlide = 0;
      answers = {}; // Reset answers on restart
  }
</script>

        {#if currentSlide === 0}
            <Intro on:next={nextSlide} />
        {/if}
        {#if currentSlide === 1}
            <Question1 on:next={nextSlide} on:back={prevSlide} on:answer={e => setAnswer('question1', e.detail)} />
        {/if}
        {#if currentSlide === 2}
            <Question2 on:next={nextSlide} on:back={prevSlide} on:answer={e => setAnswer('question2', e.detail)} />
        {/if}
        {#if currentSlide === 3}
            <Question3 on:next={nextSlide} on:back={prevSlide} on:answer={e => setAnswer('question3', e.detail)} />
        {/if}
        {#if currentSlide === 4}
            <Subscription on:showResults={nextSlide} on:back={prevSlide} on:subscribe={e => setEmail(e.detail)} />
        {/if}
        {#if currentSlide === 5}
            <Results answers={answers} email={email} on:restart={resetQuiz} />
        {/if}


<style>
    /* Add Tailwind or custom styles as needed */
</style>


