export class Post {
    constructor(data) {
        this.body = data.body
        this.imgUrl = data.imgUrl
        this.creator = data.creator
        this.creatorId = data.creatorId
        this.likeIds = data.likeIds
        this.id = data.id
        this.likeCount = data.likes.length
        this.name = data.creator.name
        this.createdAt = new Date(data.createdAt).toLocaleString()
    }
}