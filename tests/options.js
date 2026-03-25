import test from 'ava'
import { keysToObject, macro } from './_helpers.js'

test('options.sortOrder', macro.sortObject, {
  options: {
    sortOrder: ['z', 'a', 'name'],
  },
  value: keysToObject(['z', 'name', 'a']),
  expect: keysToObject(['z', 'a', 'name']),
  message: 'Should sort in order of `options.sortOrder`',
})

test('options.sortOrder prepend', macro.sortObject, {
  options: {
    sortOrder: ['z', 'private'],
  },
  value: keysToObject(['b', 'a', 'z', 'version', 'name', 'private']),
  expect: keysToObject(['z', 'private', 'name', 'version', 'a', 'b']),
  message: 'Should still sort `name` and `version`',
})

test('options.sortOrder effect', macro.sortObject, {
  options: {
    sortOrder: ['z', 'private'],
  },
  path: 'bin',
  value: keysToObject(['b', 'a', 'z', 'version', 'name', 'private']),
  expect: keysToObject(['a', 'b', 'name', 'private', 'version', 'z']),
  message: 'options.sortOrder should not effect fields ordering`',
})

test('options.sortOrder function', macro.sortObject, {
  options: {
    sortOrder(left, right) {
      return right.localeCompare(left)
    },
  },
  value: keysToObject(['version', 'name', 'a', 'z']),
  expect: keysToObject(['z', 'version', 'name', 'a']),
  message: 'options.sortOrder should accept function`',
})

test('options.sortOrder with private key', macro.sortObject, {
  options: {
    sortOrder: ['_z'],
  },
  value: keysToObject(['z', '_a', 'name', '_z', 'a']),
  expect: keysToObject(['_z', 'name', 'a', 'z', '_a']),
  message: 'options.sortOrder should work with private keys`',
})

test('options.sortScripts=false', macro.sortObject, {
  options: {
    sortScripts: false,
  },
  value: {
    scripts: {
      z: 'echo z',
      a: 'echo a',
    },
  },
  expect: {
    scripts: {
      z: 'echo z',
      a: 'echo a',
    },
  },
  message: 'Should keep scripts order when `options.sortScripts` is false',
})

test('options.sortScripts=true', macro.sortObject, {
  options: {
    sortScripts: true,
  },
  value: {
    scripts: {
      z: 'echo z',
      a: 'echo a',
    },
  },
  expect: {
    scripts: {
      a: 'echo a',
      z: 'echo z',
    },
  },
  message: 'Should sort scripts when `options.sortScripts` is true',
})
