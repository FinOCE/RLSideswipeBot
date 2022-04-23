import Client from '@client/Client'

export default class Comment {
  public readonly id: Fullname
  public readonly parentId: Fullname
  public readonly subredditId: Fullname
  public readonly url: string
  public readonly createdTimestamp: number
  public readonly text: string
  public readonly votes: {
    score: number
    ups: number
    downs: number
  }
  public readonly author: CommentAuthor
  public sticked: boolean
  public readonly edited: boolean
  public removed: boolean
  public readonly approved: boolean

  public constructor(private client: Client, data: RedditComment) {
    this.id = data.name
    this.parentId = data.parent_id
    this.subredditId = data.subreddit_id
    this.url = data.permalink
    this.createdTimestamp = data.created_utc
    this.text = data.body
    this.votes = {
      score: data.score,
      ups: data.ups,
      downs: data.downs
    }
    this.author = new CommentAuthor(data)
    this.sticked = data.stickied
    this.edited = data.edited
    this.removed = data.removed
    this.approved = data.approved
  }

  /**
   * Reply to the comment
   */
  public async reply(text: string): Promise<Comment> {
    return this.client.comments.create({
      thing_id: this.id,
      text
    })
  }

  /**
   * Make the comment sticky (Only works on moderator comments)
   */
  public async sticky(): Promise<Comment> {
    this.sticked = true

    return this.client.comments.distinguish({
      id: this.id,
      how: 'yes',
      sticky: 'true'
    })
  }

  /**
   * Remove the comment
   */
  public remove(spam: boolean = false): void {
    this.removed = true

    this.client.comments.remove({
      id: this.id,
      spam: spam ? 'true' : 'false'
    })
  }
}

export class CommentAuthor {
  public readonly id: Fullname
  public readonly username: string
  public readonly op: boolean
  public readonly flair: string | null

  public constructor(data: RedditComment) {
    this.id = data.author_fullname
    this.username = data.author
    this.op = data.is_submitter
    this.flair = data.author_flair_text
  }
}
