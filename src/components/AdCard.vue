<template>
    <div class="col-8">
        <a href=""> <img :src="ad.banner" alt=""></a>

    </div>

</template>

<script>
import { AppState } from '../AppState.js';
import { Ad } from '../models/Ad.js';
import { computed } from 'vue';
export default {
    props: {
        ad: {
            type: Ad,
            required: true
        }
    },

    setup(props) {
        const adLink = 'https://www.' + props.ad.linkUrl
        return {
            ads: computed(() => AppState.ads),
            adLink
        }
    }
}


</script>