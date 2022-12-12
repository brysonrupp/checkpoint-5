<template>
    <form @submit.prevent="newPost()" class="m-2">
        <div class="mb-3">
            <label for="" class="form-label">New Post</label>
            <div>
                <input type="test" v-model="editable.imgUrl" placeholder="imgUrl">
            </div>
            <textarea name="" id="" class="form-control" v-model="editable.body" rows="3" placeholder="new post">
            </textarea>
            <div class="row">
                <button class="col-1 btn btn-success">new post</button>
            </div>
        </div>
    </form>




</template>

<script>
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';
import { computed, ref } from 'vue'


export default {
    setup() {
        const editable = ref({})
        async function newPost() {
            try {
                await postsService.newPost(editable.value)
                editable.value = {}
                Pop.toast('created post')
            } catch (error) {
                Pop.error(error)
            }
        }
        return {
            editable,
            account: computed(() => AppState.account),
            newPost
        }
    }
}



</script>