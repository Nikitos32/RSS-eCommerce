import { act, renderHook } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';
import { describe, expect, it } from 'vitest';

describe('useLocalStorage', () => {
  const initValue = 'Hi';
  const nextValue = 'By';
  const key = 'test1';
  it('should return original item, then new item', () => {
    const { result } = renderHook(() =>
      useLocalStorage<string>(key, initValue)
    );
    expect(result.current[0]).toBe(initValue);
    act(() => result.current[1](nextValue));
    expect(result.current[0]).toBe(nextValue);
  });
});
