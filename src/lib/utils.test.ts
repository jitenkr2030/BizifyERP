import { cn } from './utils'

describe('Utility Functions', () => {
  describe('cn', () => {
    it('should combine class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2')
    })

    it('should handle undefined and null values', () => {
      expect(cn('class1', undefined, null, 'class2')).toBe('class1 class2')
    })

    it('should handle conditional class names', () => {
      const condition = true
      expect(cn('base-class', condition && 'conditional-class')).toBe('base-class conditional-class')
    })
  })
})