import Client from '@client/Client'
import Comment from '@structures/Comment'
import dotenv from 'dotenv'
import process from 'process'

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
  client.comments.stream('RLSideswipe', async comment => {
    if (comment.author.flair?.includes('Psyonix') && !comment.approved) {
      comment.approve()

      const post = await comment.fetchPost()

      // Change flair of post to PSYONIX COMMENT
      if (!post.flairText?.includes('PSYONIX'))
        post.flair({
          css_class: '.linkflair-psycomment',
          text: ':Psyonix: PSYONIX COMMENT'
        })

      // Create or edit stickied comment
      const stickied = (await post.fetchComments()).children[0]

      if (stickied.stickied && stickied.author.username === client.user!.name) {
        // Stickied comment from the bot exists and can be edited
        stickied.edit(
          stickied.text.replace(Comment.QUOTE_FOOTER, '') +
            comment.quote +
            Comment.QUOTE_FOOTER
        )
      } else {
        // Sticked comment from the bot doesn't exist and can be created
        post
          .comment(Comment.QUOTE_HEADER + comment.quote + Comment.QUOTE_FOOTER)
          .then(comment => comment.sticky())
      }

      console.log('New Psyonix comment quoted on', post.url)
    }
  })
})
