<template>
    <div class="row">
        <AdCard v-for="a in ads" :ad="a" />
    </div>
    <h3>search results</h3>
    <section class="row">
        <div v-for="p in posts">
            <PostCard :post="p" />
        </div>
    </section>
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
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import PostCard from '../components/PostCard.vue';
import { logger } from '../utils/Logger.js';
import { postsService } from '../services/PostsService.js';
import { adsService } from '../services/AdsService.js';
export default {
    setup() {

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
                await postsService.changePage(url)
            } catch (error) {
                logger.log(error);
            }
        }

        onMounted(() => {
            getAds();
        })

        return {
            posts: computed(() => AppState.posts),
            nextPage: computed(() => AppState.nextPage),
            previousPage: computed(() => AppState.previousPage),
            ads: computed(() => AppState.ads),
            changePage
        };

    },
    components: { PostCard }
};
</script>


<style lang="scss" scoped>

</style>