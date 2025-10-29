import { renderHook, act } from '@testing-library/react'
import { useToast } from './use-toast'

describe('useToast Hook', () => {
  beforeEach(() => {
    // Clear all toasts before each test
    const { result } = renderHook(() => useToast())
    act(() => {
      result.current.toasts.forEach(toast => {
        result.current.dismiss(toast.id)
      })
    })
  })

  it('should add a new toast', () => {
    const { result } = renderHook(() => useToast())
    
    act(() => {
      result.current.toast({
        title: 'Test Toast',
        description: 'This is a test toast',
      })
    })

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].title).toBe('Test Toast')
    expect(result.current.toasts[0].description).toBe('This is a test toast')
  })

  it('should dismiss a toast by id', () => {
    const { result } = renderHook(() => useToast())
    
    let toastId: string
    act(() => {
      const toast = result.current.toast({
        title: 'Test Toast',
      })
      toastId = toast.id
    })

    expect(result.current.toasts).toHaveLength(1)

    act(() => {
      result.current.dismiss(toastId)
    })

    // Toast should be marked as closed but not immediately removed
    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].open).toBe(false)
  })

  it('should update an existing toast', () => {
    const { result } = renderHook(() => useToast())
    
    let toastId: string
    act(() => {
      const toast = result.current.toast({
        title: 'Original Title',
        description: 'Original Description',
      })
      toastId = toast.id
    })

    act(() => {
      result.current.toast({
        id: toastId,
        title: 'Updated Title',
        description: 'Updated Description',
      })
    })

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].title).toBe('Updated Title')
    expect(result.current.toasts[0].description).toBe('Updated Description')
  })

  it('should replace toast when limit is reached', () => {
    const { result } = renderHook(() => useToast())
    
    act(() => {
      result.current.toast({
        title: 'First Toast',
        variant: 'success',
      })
    })

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].title).toBe('First Toast')
    expect(result.current.toasts[0].variant).toBe('success')

    act(() => {
      result.current.toast({
        title: 'Second Toast',
        variant: 'destructive',
      })
    })

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].title).toBe('Second Toast')
    expect(result.current.toasts[0].variant).toBe('destructive')
  })

  it('should handle action button in toast', () => {
    const { result } = renderHook(() => useToast())
    
    const action = {
      label: 'Undo',
      onClick: jest.fn(),
    }

    act(() => {
      result.current.toast({
        title: 'Toast with Action',
        action,
      })
    })

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].action).toEqual(action)
  })

  it('should dismiss all toasts when no id provided', () => {
    const { result } = renderHook(() => useToast())
    
    act(() => {
      result.current.toast({
        title: 'Toast 1',
      })
    })

    act(() => {
      result.current.toast({
        title: 'Toast 2',
      })
    })

    expect(result.current.toasts).toHaveLength(1) // Due to limit of 1

    act(() => {
      result.current.dismiss()
    })

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].open).toBe(false)
  })
})