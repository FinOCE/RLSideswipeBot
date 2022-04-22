import ThingUtil from '../../src/utils/ThingUtil'

describe('test ThingUtil', () => {
  it('should successfully convert type prefix to name', () => {
    for (const [prefix, name] of Object.entries(ThingUtil.TYPE_PREFIXES)) {
      /// @ts-ignore
      expect(ThingUtil.convertTypePrefixToName(prefix)).toBe(name)
    }
  })

  it('should throw an error for invalid type prefix', () => {
    /// @ts-ignore
    expect(() => ThingUtil.convertTypePrefixToName('invalid')).toThrowError()
  })

  it('should successfully convert type name to prefix', () => {
    for (const [prefix, name] of Object.entries(ThingUtil.TYPE_PREFIXES)) {
      /// @ts-ignore
      expect(ThingUtil.convertTypeNameToPrefix(name)).toBe(prefix)
    }
  })

  it('should throw an error for invalid type name', () => {
    /// @ts-ignore
    expect(() => ThingUtil.convertTypeNameToPrefix('invalid')).toThrowError()
  })

  it('should split the prefix and ID from the fullname', () => {
    expect(ThingUtil.deconstructFullname('t1_abc123')).toStrictEqual([
      't1',
      'abc123'
    ])
  })

  it('should throw and error for invalid fullname', () => {
    expect(() => ThingUtil.deconstructFullname('invalid')).toThrowError()
    expect(() => ThingUtil.deconstructFullname('t7_abc123')).toThrowError()
    expect(() => ThingUtil.deconstructFullname('t1_')).toThrowError()
  })
})
