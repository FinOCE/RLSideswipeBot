import Client from '@client/Client'
import Comment from '@structures/Comment'
import Listing from '@structures/Listing'

export default class Post {
  public readonly id: Fullname
  public readonly subreddit: {
    id: Fullname
    name: string
  }
  public readonly url: string
  public readonly createdTimestamp: number
  public readonly text: string
  public readonly votes: {
    score: number
    ups: number
    downs: number
  }
  public readonly author: PostAuthor
  public flairText: string | null
  public readonly edited: boolean
  public stickied: boolean
  public removed: boolean
  public approved: boolean

  public constructor(private client: Client, data: RedditPost) {
    this.id = data.name
    this.subreddit = {
      id: data.subreddit_id,
      name: data.subreddit
    }
    this.url = data.permalink
    this.createdTimestamp = data.created_utc
    this.text = data.selftext
    this.votes = {
      score: data.score,
      ups: data.ups,
      downs: data.downs
    }
    this.author = new PostAuthor(data)
    this.flairText = data.link_flair_text
    this.edited = data.edited
    this.stickied = data.stickied
    this.removed = data.removed
    this.approved = data.approved
  }

  /**
   * Comment on the post
   */
  public async comment(text: string): Promise<Comment> {
    return this.client.comments.create({
      thing_id: this.id,
      text
    })
  }

  public async flair(data: Omit<FlairProps, 'link'>): Promise<Post> {
    this.flairText = data.text
    return this.client.posts.flair(Object.assign({ link: this.id }, data))
  }

  /**
   * Approve the post
   */
  public async approve(): Promise<void> {
    this.approved = true
    await this.client.posts.approve(this.id)
  }

  /**
   * Remove the comment
   */
  public async remove(spam: boolean = false): Promise<void> {
    this.removed = true
    await this.client.posts.remove(this.id, spam ? 'true' : 'false')
  }

  /**
   * Fetch a list of comments from the post
   */
  public async fetchComments(): Promise<Listing<RedditComment, Comment>> {
    return this.client.comments.fetch({
      sr: this.subreddit.id,
      postId: this.id
    })
  }
}

export class PostAuthor {
  public readonly id: Fullname
  public readonly username: string
  public readonly flair: string | null

  public constructor(data: RedditPost) {
    this.id = data.author_fullname
    this.username = data.author
    this.flair = data.author_flair_text
  }
}
