<script>
  import svelteLogo from './assets/svelte.svg'
  import { onMount } from 'svelte';

  import Intro from './components/Intro.svelte';
  import Question1 from './components/Question1.svelte';
  import Question2 from './components/Question2.svelte';
  import Question3 from './components/Question3.svelte';
  import Subscription from "./components/Subscription.svelte";
  import Results from './components/Results.svelte';



  // State
  let selectedAnswerRecapMap = {};
  let currentSlide = 0;
  let answers = {}; // To store user's answers
  let selectedAnswerRecap = {};
  let userEmail = '';
  let klaviyoInit = false;

  async function loadAnswerRecapMap() {
      const responsea = await fetch('/quiz-test/data/selected-answers-map.json');
      const answer_recap_map = await responsea.json();
      return answer_recap_map;
  }

  function nextSlide() {
      if (currentSlide < 5) currentSlide += 1;
  }

  function prevSlide() {
      if (currentSlide > 0) {
          currentSlide -= 1;
          delete answers['question' + currentSlide];
          delete selectedAnswerRecap['question' + currentSlide];
      }
  }

  function setAnswer(question, answer) {
      answers[question] = answer;
      selectedAnswerRecap[question] = selectedAnswerRecapMap[answer];
  }

  function setEmail(emailInput) {
      console.log('TODO: Send Email TO klaviyo');
      console.log('TODO: GTM EVENT?');
      userEmail = emailInput;
  }

  function resetQuiz() {
      currentSlide = 0;
      answers = {}; // Reset answers on restart
      selectedAnswerRecap = {};
  }

  onMount(async () => {
      selectedAnswerRecapMap = await loadAnswerRecapMap();
      console.log(selectedAnswerRecapMap);
  });
</script>

        {#if currentSlide === 0}
            <Intro on:next={nextSlide} />
        {/if}
        {#if currentSlide === 1}
            <Question1 selectedAnswerRecap={selectedAnswerRecap} on:next={nextSlide} on:back={prevSlide} on:answer={e => setAnswer('question1', e.detail)} />
        {/if}
        {#if currentSlide === 2}
            <Question2 selectedAnswerRecap={selectedAnswerRecap} on:next={nextSlide} on:back={prevSlide} on:answer={e => setAnswer('question2', e.detail)} />
        {/if}
        {#if currentSlide === 3}
            <Question3 selectedAnswerRecap={selectedAnswerRecap} on:next={nextSlide} on:back={prevSlide} on:answer={e => setAnswer('question3', e.detail)} />
        {/if}
        {#if currentSlide === 4}
            <Subscription klaviyoInit={klaviyoInit} selectedAnswerRecap={selectedAnswerRecap} on:showResults={nextSlide} on:back={prevSlide} on:subscribe={e => setEmail(e.detail)} />
        {/if}
        {#if currentSlide === 5}
            <Results answers={answers} userEmail={userEmail} on:restart={resetQuiz} />
        {/if}


<style>
    /* Add Tailwind or custom styles as needed */
</style>


