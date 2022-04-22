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
    if (!Object.keys(ThingUtil.TYPE_PREFIXES).some(p => p === prefix))
      throw new Error('Invalid type prefix provided')

    return ThingUtil.TYPE_PREFIXES[prefix]
  }

  /**
   * Convert a full label name to its type prefix
   */
  public static convertTypeNameToPrefix(name: TypeName): TypePrefix {
    if (!Object.values(ThingUtil.TYPE_PREFIXES).some(n => n === name))
      throw new Error('Invalid type name provided')

    const entries = Object.entries(ThingUtil.TYPE_PREFIXES)

    return entries.find(e => e[1] === name)![0] as TypePrefix
  }

  /**
   * Get type prefix and ID from a Fullname
   */
  public static deconstructFullname(fullname: Fullname): [TypePrefix, string] {
    if (!fullname.includes('_')) throw new Error('Invalid fullname provided')

    const [prefix, id] = fullname.split('_')

    if (!Object.keys(ThingUtil.TYPE_PREFIXES).some(p => p === prefix))
      throw new Error('Provided fullname does not contain a valid type prefix')

    if (id.length === 0)
      throw new Error('Provided fullname does not contain a valid ID')

    return [prefix as TypePrefix, id]
  }
}
