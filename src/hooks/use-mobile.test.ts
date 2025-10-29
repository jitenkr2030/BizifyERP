import { renderHook, act } from '@testing-library/react'
import { useIsMobile } from './use-mobile'

// Mock window.matchMedia
const mockMatchMedia = jest.fn()
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
})

describe('useIsMobile Hook', () => {
  beforeEach(() => {
    mockMatchMedia.mockClear()
    // Set default window width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  it('should return false when screen is desktop size', () => {
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it('should return true when screen is mobile size', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    })

    mockMatchMedia.mockReturnValue({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('should handle media query changes', () => {
    const listeners: Array<() => void> = []
    const mockMediaQueryList = {
      matches: false,
      addEventListener: jest.fn((event, callback) => {
        if (event === 'change') listeners.push(callback)
      }),
      removeEventListener: jest.fn((event, callback) => {
        if (event === 'change') {
          const index = listeners.indexOf(callback)
          if (index > -1) listeners.splice(index, 1)
        }
      }),
    }

    mockMatchMedia.mockReturnValue(mockMediaQueryList)

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)

    // Simulate screen size change
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      })
      listeners.forEach(listener => listener())
    })

    expect(result.current).toBe(true)
  })

  it('should clean up listeners on unmount', () => {
    const mockMediaQueryList = {
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }

    mockMatchMedia.mockReturnValue(mockMediaQueryList)

    const { unmount } = renderHook(() => useIsMobile())
    
    expect(mockMediaQueryList.addEventListener).toHaveBeenCalled()
    expect(mockMediaQueryList.removeEventListener).not.toHaveBeenCalled()

    unmount()

    expect(mockMediaQueryList.removeEventListener).toHaveBeenCalled()
  })
})