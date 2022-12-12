import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {

    async getPosts() {
        const res = await api.get('api/posts')
        logger.log('[get posts]', res.data)
        AppState.posts = res.data.posts.map(p => new Post(p))
        AppState.previousPage = res.data.newer
        AppState.nextPage = res.data.older
    }

    async getPostsByCreatorId(profileId) {
        const res = await api.get('api/profiles/' + profileId + '/posts')
        logger.log(res.data)
        AppState.posts = res.data.posts.map(p => new Post(p))
        AppState.previousPage = res.data.newer
        AppState.nextPage = res.data.older
    }

    async newPost(postData) {
        const res = await api.post('api/posts', postData)
        logger.log('[new Post]', res.data)
        AppState.posts.unshift(new Post(res.data))

    }

    async deletePost(id) {
        const res = await api.delete('api/posts/' + id)
        let index = AppState.posts.findIndex(p => p.id == id)
        if (index >= 0) {
            AppState.posts.splice(index, 1)
        }
    }

    async likePost(id) {
        const res = await api.post(`api/posts/${id}/like`)
        const index = AppState.posts.findIndex(p => p.id == id)
        AppState.posts.splice(index, 1, new Post(res.data))
        AppState.posts = [...AppState.posts]

    }

    //FIXME - our api requires a number rather than a url end point might need to change this later.

    async changePage(url) {
        const res = await api.get(url)
        AppState.posts = res.data.posts.map(p => new Post(p))
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer
    }

    async searchPosts(query = {}) {
        const res = await api.get(`api/posts?query=${query}`)
        logger.log('[search posts]', res.data)
        AppState.posts = res.data.posts.map(p => new Post(p))
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer
    }
}

export const postsService = new PostsService()