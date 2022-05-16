export class TestSubreddit {
  public static title: string = 'RLSideswipeBot'
  public static userFlair: Record<UserFlairLabelTest, Flair> = {
    PsyonixUser: {
      text: 'PSYONIX',
      class: 'psyuser',
      modOnly: true
    }
  }
  public static postFlair: Record<PostFlairLabelTest, Flair> = {
    PsyonixComment: {
      text: 'PSYONIX COMMENT',
      class: 'psycomment',
      modOnly: true
    },
    Discussion: {
      text: 'DISCUSSION',
      class: 'discussion',
      modOnly: false
    }
  }
}
