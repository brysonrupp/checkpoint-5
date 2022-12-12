import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  nextPage: null,
  previousPage: null,


  /** @type {import('./models/Post.js').Post[]} */
  posts: [],

  /** @type {import('./models/Ad.js').Ad[]} */
  ads: [],

  /** @type {import('./models/Account.js').Account} */
  activeProfile: null
})
