<template>
  <div class="container-fluid">
    <div class="row">
      <AdCard v-for="a in ads" :ad="a" />
    </div>
  </div>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-8">
        <form @submit.prevent="editAccount()">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input v-model="editable.name" type="text" required class="form-control" id="name" placeholder="name">
          </div>
          <div class="mb-3">
            <label for="coverImg" class="form-label">coverImg</label>
            <input v-model="editable.coverImg" type="text" required class="form-control" id="coverImg"
              placeholder="coverImg">
          </div>
          <div class="mb-3">
            <label for="picture" class="form-label">picture</label>
            <input v-model="editable.picture" type="text" required class="form-control" id="picture"
              placeholder="picture">
          </div>
          <div class="mb-3">
            <label for="github" class="form-label">github</label>
            <input v-model="editable.github" type="text" class="form-control" id="github" placeholder="github">
          </div>
          <div class="mb-3">
            <label for="resume" class="form-label">resume</label>
            <input v-model="editable.resume" type="text" class="form-control" id="resume" placeholder="resume">
          </div>
          <div class="mb-3">
            <label for="linkedin" class="form-label">linkedIn</label>
            <input v-model="editable.linkedin" type="text" class="form-control" id="linkedin" placeholder="linkedIn">
          </div>
          <div class="mb-3">
            <label for="class" class="form-label">class</label>
            <input v-model="editable.class" type="text" class="form-control" id="class" placeholder="class">
          </div>
          <div class="mb-3">
            <label for="bio" class="form-label">Bio</label>
            <textarea v-model="editable.bio" required class="form-control" id="bio" rows="3"
              placeholder="bio"></textarea>
          </div>
          <button class="btn btn-success" type="submit">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService.js'
import { adsService } from '../services/AdsService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
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

    const editable = ref({})
    watchEffect(() => {
      if (AppState.account.id) {
        editable.value = { ...AppState.account }
      }
    })
    onMounted(() => {
      getAds();
    });

    return {
      editable,
      ads: computed(() => AppState.ads),
      account: computed(() => AppState.account),
      async editAccount() {
        try {
          await accountService.editAccount(editable.value)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
