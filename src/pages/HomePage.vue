<template>
  <div class="container-fluid">
    <div class="row">
      <AdCard v-for="a in ads" :ad="a" />
    </div>
    <!-- //FIXME - this is for search bar throwing error when un commented -->

    <!-- <section class="row justify-content-center">
      <div class="col-8">
        <SearchBar />
      </div>
    </section> -->

    <!-- //FIXME - this is for the new post form -->

    <div class="row">
      <div v-if="account.id" class="col-10 p-3">
        <PostForm />
      </div>
    </div>

    <div class="row">
      <div v-for="p in posts" class="col-12 img-fluid p-4">
        <PostCard :post="p" />
      </div>

      <!-- //FIXME - this is for the next and previous page buttons -->

      <div class="row">
        <div class="col-md-6">
          <button :disabled="!previousPage" @click="changePage(previousPage)" class="btn btn-outline-danger w-50">
            Previous
          </button>
        </div>

        <div class="col-md-6">
          <button :disabled="!nextPage" @click="changePage(nextPage)" class="btn btn-outline-danger w-50">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import PostCard from '../components/PostCard.vue'
import AdCard from '../components/AdCard.vue';
import { adsService } from '../services/AdsService.js';


export default {
  setup() {
    async function getPosts() {
      try {
        await postsService.getPosts();
      }
      catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }

    async function getAds() {
      try {
        await adsService.getAds()
      } catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }



    async function changePage(url) {
      try {
        await postsService.changePage(url);
      }
      catch (error) {
        logger.log(error);
      }
    }
    onMounted(() => {
      getPosts();
      getAds();
    });
    return {
      posts: computed(() => AppState.posts),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),
      account: computed(() => AppState.account),
      ads: computed(() => AppState.ads),
      changePage
    };
  },
  components: { AdCard }
}
</script>

<style scoped lang="scss">
.profile-pic {
  height: 14vh;
  width: 14vh;
}

.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
