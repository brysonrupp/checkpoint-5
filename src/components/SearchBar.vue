<template>

    <div class="row">
        <form action="" class="input-group" @submit.prevent="searchPost">
            <input type="text" class="form-control" v-model="query" placeholder="search">
            <button class="btn btn-info w-25"><i class="mdi mdi-magnify"></i></button>
        </form>
    </div>
</template>

<script>
import { popScopeId, reactive } from 'vue';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { ref } from '@vue/reactivity'
import { router } from '../router.js';
import { useRouter } from 'vue-router';



export default {
    setup() {
        const query = ref('')
        const router = useRouter()

        return {
            query,
            async searchPost() {
                try {
                    router.push({ name: 'SearchPage' })
                    await postsService.searchPosts(query.value)
                } catch (error) {
                    logger.error(error)
                    Pop.error(error)
                }
            }
        }
    }
}

</script>