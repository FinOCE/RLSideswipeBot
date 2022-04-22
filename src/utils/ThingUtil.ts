export default class ThingUtil {
  public static readonly TYPE_PREFIXES: Record<TypePrefix, TypeName> = {
    t1: 'COMMENT',
    t2: 'ACCOUNT',
    t3: 'LINK',
    t4: 'MESSAGE',
    t5: 'SUBREDDIT',
    t6: 'AWARD'
  }

  /**
   * Convert a type prefix to its full label name
   */
  public static convertTypePrefixToName(prefix: TypePrefix): TypeName {
    return ThingUtil.TYPE_PREFIXES[prefix]
  }

  /**
   * Convert a full label name to its type prefix
   */
  public static convertTypeNameToPrefix(name: TypeName): TypePrefix {
    const entries = Object.entries(ThingUtil.TYPE_PREFIXES)
    return entries.find(e => e[1] === name)![0] as TypePrefix
  }

  /**
   * Get type prefix and ID from a Fullname
   */
  public static deconstructFullname(fullname: Fullname): [TypePrefix, string] {
    return fullname.split('_') as [TypePrefix, string]
  }
}
