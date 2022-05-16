import Client from '@client/Client'
import Comment from '@structures/Comment'
import { TestSubreddit } from '@utils/SubredditUtil'
import dotenv from 'dotenv'
import process from 'process'
import { unescape } from 'querystring'

dotenv.config()
process.stdin.resume()

const client = new Client({
  scopes: [
    'identity',
    'submit',
    'read',
    'edit',
    'modflair',
    'modposts',
    'history'
  ]
})
client.login(
  process.env.REDDIT_USERNAME!,
  process.env.REDDIT_PASSWORD!,
  process.env.CLIENT_ID!,
  process.env.CLIENT_SECRET!
)

client.once('ready', () => {
  client.comments.stream('RLSideswipeBot', async comment => {
    // Test in the testing subreddit
    if (comment.subreddit.name === TestSubreddit.title) {
      if (comment.author.flair?.class === 'psyuser' && !comment.approved) {
        comment.approve()

        const post = await comment.fetchPost()
        if (!post.approved) post.approve()

        // Change flair of post to PSYONIX COMMENT
        if (!post.flairText?.includes('PSYONIX'))
          post.flair({
            css_class: TestSubreddit.postFlair.PsyonixComment.class,
            text: TestSubreddit.postFlair.PsyonixComment.text
          })

        // Create or edit stickied comment
        const stickied = (await post.fetchComments())[1].children[0]

        if (
          stickied?.stickied &&
          !stickied.removed &&
          stickied.author.username === client.user!.name
        ) {
          // Stickied comment from the bot exists and can be edited
          const text = unescape(stickied.text)

          stickied
            .edit(
              text.substring(0, text.length - Comment.QUOTE_FOOTER.length + 1) +
                comment.quote +
                Comment.QUOTE_FOOTER
            )
            .then(() => stickied.approve())
        } else {
          // Sticked comment from the bot doesn't exist and can be created
          post
            .comment(
              Comment.QUOTE_HEADER + comment.quote + Comment.QUOTE_FOOTER
            )
            .then(comment => {
              comment.sticky()
              comment.approve()
            })
        }
      }
    }
  })
})
