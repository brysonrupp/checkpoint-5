<template>
    <div class="card">
        <router-link :to="{ name: 'Profile', params: { profileId: post?.creatorId } }">
            <img class="img-fluid m-2 rounded-circle profile-pic" :src="post.creator?.picture" alt="">
            <p>{{ post.name }}</p>
        </router-link>
        <p>{{ post.createdAt }}</p>
        <img v-if="post.imgUrl" class="creator-img img-fluid" :src="post.imgUrl" alt="">
        {{ post.body }}
        <!-- only render this button if the person logged in (account) is the same person as the post creator ***check the ids-->
        <div v-if="(account.id == post.creatorId)">
            <button @click="deletePost(post.id)">delete</button>
        </div>
        <i v-if="account.id" @click="likePost" class="mdi mdi-heart col-1 selectable"></i>
        <p>{{ post.likeCount }} likes</p>
    </div>


</template>


<script>

import { Post } from '../models/Post.js';
import { computed, ref } from 'vue'
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';

export default {
    props: {
        post: {
            type: Post,
            required: true
        }
    },

    setup(props) {

        return {
            account: computed(() => AppState.account),


            async deletePost() {
                try {
                    await postsService.deletePost(props.post.id)
                } catch (error) {
                    Pop.error(error.message)
                    logger.error(error)
                }
            },
            async likePost() {
                try {
                    await postsService.likePost(props.post.id)
                } catch (error) {
                    Pop.error(error.message)
                    logger.error(error)
                }
            }
        }

    }
};
</script>


<style lang="scss" scoped>
.profile-pic {
    height: 5vh;
    width: 5vh;
}

.creator-img {
    height: 40vh;
    width: 100%;
}
</style>