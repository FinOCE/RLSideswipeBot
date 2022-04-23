import Client from '@client/Client'
import Comment from '@structures/Comment'

export default class Post {
  public readonly id: Fullname
  public readonly subredditId: Fullname
  public readonly url: string
  public readonly createdTimestamp: number
  public readonly text: string
  public readonly votes: {
    score: number
    ups: number
    downs: number
  }
  public readonly author: PostAuthor
  public readonly edited: boolean
  public stickied: boolean
  public removed: boolean
  public approved: boolean

  public constructor(private client: Client, data: RedditPost) {
    this.id = data.name
    this.subredditId = data.subreddit_id
    this.url = data.permalink
    this.createdTimestamp = data.created_utc
    this.text = data.selftext
    this.votes = {
      score: data.score,
      ups: data.ups,
      downs: data.downs
    }
    this.author = new PostAuthor(data)
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
