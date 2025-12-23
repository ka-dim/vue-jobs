<script setup>
  import jobsData from '@/jobs.json'
  import { onMounted, ref, reactive } from 'vue';
  import axios from 'axios';
  import JobListing from './JobListing.vue';
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

  defineProps({
    limit: Number,
    showButton: {
      type: Boolean,
      default: false
    }
  })

  const state = reactive({
    jobs: [],
    isLoading: true
  })
  
  const timeOut = 1000 * Math.random()
  
  onMounted( () => {
    setTimeout( async () => {  
      try {
        const response = await axios.get('http://localhost:8000/jobs');
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
  }
)

</script>

<template>
  <div v-if="state.isLoading">
    <PulseLoader class="flex h-32 justify-center items-center"/>
  </div>
  <div v-else>
    <section class="bg-green-50 px-4 py-10">
      <div class="container-xl lg:container m-auto">
        <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
          Browse Jobs
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <JobListing v-for="job in state.jobs.slice(0, limit || state.jobs.length)" :key="job.id" :job="job" />
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