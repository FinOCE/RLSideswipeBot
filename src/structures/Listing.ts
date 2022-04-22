import ThingUtil from '@utils/ThingUtil'

export default class Listing<T, L extends TypePrefix> {
  public readonly position: {
    after?: Fullname
    before?: Fullname
  }
  public readonly dist: number
  public readonly modhash: null
  public readonly geoFilter: string
  public readonly type: TypeName
  public children: T[]

  public constructor(listing: RawListing<T, L>) {
    this.position = {
      after: listing.data.after,
      before: listing.data.before
    }
    this.dist = listing.data.dist
    this.modhash = listing.data.modhash
    this.geoFilter = listing.data.geo_filter
    this.type = ThingUtil.convertTypePrefixToName(
      listing.data.children[0]?.kind
    )
    this.children = listing.data.children.map(c => c.data)
  }

  public get size(): number {
    return this.children.length
  }
}
