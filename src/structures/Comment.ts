import Client from '@client/Client'
import Post from '@structures/Post'

export default class Comment {
  public static readonly QUOTE_HEADER: string =
    'This is a list of links to comments made by Psyonix Staff in this thread: \n \n '
  public static readonly QUOTE_FOOTER: string =
    '\n--- \n This is a bot providing a service. If you have any questions, please [contact the moderators](https://www.reddit.com/message/compose?to=/r/RLSideswipe). \n '
  public readonly id: Fullname
  public readonly parentId: Fullname
  public readonly postId: Fullname
  public readonly subreddit: {
    id: Fullname
    name: string
  }
  public readonly url: string
  public readonly createdTimestamp: number
  public text: string
  public readonly votes: {
    score: number
    ups: number
    downs: number
  }
  public readonly author: CommentAuthor
  public readonly edited: boolean
  public stickied: boolean
  public removed: boolean
  public approved: boolean

  public constructor(private client: Client, data: RedditComment) {
    this.id = data.name
    this.parentId = data.parent_id
    this.postId = 't3_' + data.permalink.split('/comments/')[1].split('/')[0]
    this.subreddit = {
      id: data.subreddit_id,
      name: data.subreddit
    }
    this.url = data.permalink
    this.createdTimestamp = data.created_utc
    this.text = data.body
    this.votes = {
      score: data.score,
      ups: data.ups,
      downs: data.downs
    }
    this.author = new CommentAuthor(data)
    this.edited = data.edited
    this.stickied = data.stickied
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
   * Edit the message
   */
  public async edit(text: string): Promise<Comment> {
    this.text = text

    return this.client.comments.edit({
      thing_id: this.id,
      text
    })
  }

  /**
   * Make the comment sticky (Only works on moderator comments)
   */
  public async sticky(): Promise<Comment> {
    this.stickied = true

    return this.client.comments.distinguish({
      id: this.id,
      how: 'yes',
      sticky: 'true'
    })
  }

  /**
   * Approve the comment
   */
  public async approve(): Promise<void> {
    this.approved = true
    await this.client.comments.approve(this.id)
  }

  /**
   * Remove the comment
   */
  public async remove(spam: boolean = false): Promise<void> {
    this.removed = true
    await this.client.comments.remove(this.id, spam ? 'true' : 'false')
  }

  /**
   * Get the post the comment is on
   */
  public async fetchPost(): Promise<Post> {
    return (await this.client.posts.fetch([this.postId])).children[0]
  }

  public get quote(): string {
    return ` \n - [__**Comment by ${this.author.username}**__](${this.url}): \n ${this.text} \n`
  }
}

export class CommentAuthor {
  public readonly id: Fullname
  public readonly username: string
  public readonly op: boolean
  public readonly flair: Flair | null

  public constructor(data: RedditComment) {
    this.id = data.author_fullname
    this.username = data.author
    this.op = data.is_submitter
    this.flair = data.author_flair_text
      ? ({
          text: data.author_flair_text,
          class: data.author_flair_css_class,
          modOnly: data.author_flair_type
        } as Flair)
      : null
  }
}
