<template>
    <div class="container-fluid">
        <div class="row">
            <AdCard v-for="a in ads" :ad="a" />
        </div>
        <div v-if="profile" class="row cover-img" :style="`background-image: url(${profile.coverImg})`">
            <div class="col-12 d-flex align-items-center justify-content-around">
                <img :src="profile.picture" alt="" class="img-fluid profile-picture rounded-circle elevation-5">
                <div class="bg-transparent rounded elevation-5 p-5">
                    <h1 class="elevation-1">
                        {{ profile.name }}
                    </h1>
                    <h2>
                        {{ profile.bio }}
                    </h2>
                    <a :href="profile.github" class="mdi mdi-github fs-3"></a>
                    <a :href="profile.linkedin" class="mdi mdi-linkedin fs-3"></a>
                    <a :href="profile.resume" class="mdi mdi-file-document fs-3"></a>
                    <div v-if="(profile.graduated == true)">
                        <i class="mdi mdi-school fs-3"></i>
                    </div>
                    <p v-else>Noob</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div v-for="p in posts" class="col-md-4 col-12 p-4">
                <PostCard :post="p" />
            </div>
        </div>
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


</template>



<script>
import { onMounted, computed } from 'vue';
import { profilesService } from '../services/ProfileService.js';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import PostCard from '../components/PostCard.vue';
import { postsService } from '../services/PostsService.js';
import { adsService } from '../services/AdsService.js';

export default {
    setup() {
        const route = useRoute();
        async function getProfileByProfileId() {
            try {
                await profilesService.getProfileByProfileId(route.params.profileId);
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

        async function getAds() {
            try {
                await adsService.getAds()
            } catch (error) {
                logger.error(error);
                Pop.error(error.message);
            }
        }

        async function getPostsByCreatorId() {
            try {
                await postsService.getPostsByCreatorId(route.params.profileId);
            }
            catch (error) {
                logger.error(error);
                Pop.error(error.message);

            }
        }
        onMounted(() => {
            getProfileByProfileId();
            getPostsByCreatorId();
            getAds();
        });
        return {
            profile: computed(() => AppState.activeProfile),
            posts: computed(() => AppState.posts),
            nextPage: computed(() => AppState.nextPage),
            previousPage: computed(() => AppState.previousPage),
            ads: computed(() => AppState.ads),
            changePage
        };
    },
    components: { PostCard }
}


</script>

<style lang="scss" scoped>
.cover-img {
    min-height: 50vh;
    background-size: cover;
    background-position: center;
}

.profile-picture {
    height: 10vh;
    width: 10vh;
}

.bg-transparent {
    background-color: rgba(222, 184, 135, 0.185);
    text-shadow: 1px 1px white;
}
</style>