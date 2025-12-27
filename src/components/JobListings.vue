<script setup>
  import jobsData from '@/jobs.json'
  import { onMounted, ref, reactive, watch } from 'vue';
  import axios from 'axios';
  import JobListing from './JobListing.vue';
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

  defineProps({
    limit: Number,
    showButton: {
      type: Boolean,
      default: false
    }
  });

  const state = reactive({
    jobs: [],
    isLoading: true
  });
  const stateFiltered = reactive({
    jobs: [],
    isFiltered: false
  });

  const wordToSearch = ref('');
  
  const timeOut = 1000 * Math.random()
  
  onMounted( () => {
    setTimeout( async () => {  
      try {
        const response = await axios.get('/api/jobs');
        if (response.data) {
          state.jobs =  await response.data
        } else {
          window.alert('No data load!')
        }
      } catch (error) {
        console.error('Error Fetching Jobs: ', error);
        // Can launch a specific page/component here
      } finally {
        state.isLoading = false
      }
    }, timeOut);
  });

  watch(wordToSearch, (oldResult, newResult ) => {
    const word = wordToSearch.value.trim().toLowerCase()
    if (word !== "") {
      stateFiltered.isFiltered = true;
          stateFiltered.jobs = state.jobs.filter( 
            job => (job.description.trim().toLowerCase().includes(word) 
            || job.title.trim().toLowerCase().includes(word)
            || job.type.trim().toLowerCase().includes(word)
            || job.salary.trim().toLowerCase().includes(word)
            )
          )
    } else {
      stateFiltered.isFiltered = false
    }
  })

</script>

<template>
  <div v-if="state.isLoading">
    <PulseLoader class="flex h-32 justify-center items-center"/>
  </div>
  <div v-else>
    <section class="bg-green-50 py-4">
      <div class="container mx-auto px-4">
        <div class="relative">
          <input v-model="wordToSearch"
            type="text"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            placeholder="Filter jobs..."
          />
        </div>
      </div>
    </section>
    <section class="bg-green-50 px-4 py-10">
      <div class="container-xl lg:container m-auto">
        <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
          Browse Jobs
        </h2>
        <div v-if="!stateFiltered.isFiltered" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <JobListing v-for="job in state.jobs.slice(0, limit || state.jobs.length)" :key="job.id" :job="job" />
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <JobListing v-for="job in stateFiltered.jobs" :key="job.id" :job="job" />
        </div>
      </div>
    </section>
    <section class="m-auto max-w-lg my-10 px-6" v-if="showButton">
      <a
        href="/jobs"
        class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >View All Jobs</a
      >
    </section>
  </div>
</template>