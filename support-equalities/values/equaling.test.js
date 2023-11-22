import { assertEquals as eq } from "/asserts.ts"
import { equalValues } from "./equaling.js"

Deno.test("skip updating => verify values equality", async (t) => {

  await t.step("equal values => verify equality => 'true'", () => {
    eq(equalValues(null, null), true)
    eq(equalValues(undefined, undefined), true)
    eq(equalValues("", ""), true)
    eq(equalValues(true, true), true)
    eq(equalValues(0, 0), true)
    eq(equalValues(1, 1), true)
    eq(equalValues("a", "a"), true)
    eq(equalValues([], []), true)
    eq(equalValues([1], [1]), true)
    eq(equalValues([1, true, "a"], [1, true, "a"]), true)
    eq(equalValues({x: 1}, {x: 1}), true)
    eq(equalValues([{x: 1, y: true, z: "a"}], [{x: 1, y: true, z: "a"}]), true)
  })

  await t.step("different values => verify equality => 'false'", () => {
    eq(equalValues(null, undefined), false)
    eq(equalValues(undefined, null), false)
    eq(equalValues(null, ""), false)
    eq(equalValues("", null), false)
    eq(equalValues(undefined, ""), false)
    eq(equalValues("", undefined), false)
    eq(equalValues(null, {}), false)
    eq(equalValues({}, null), false)
    eq(equalValues(undefined, {}), false)
    eq(equalValues({}, undefined), false)
    eq(equalValues(null, []), false)
    eq(equalValues([], null), false)
    eq(equalValues(undefined, []), false)
    eq(equalValues([], undefined), false)
    eq(equalValues(0, null), false)
    eq(equalValues(0, undefined), false)
    eq(equalValues(1, true), false)
    eq(equalValues(1, "1"), false)
    eq(equalValues(1, "true"), false)
    eq(equalValues(1, true), false)
    eq(equalValues(1, 2), false)
    eq(equalValues(true, false), false)
    eq(equalValues("a", "b"), false)
  })

  await t.step("2 functions => verify equality => 'true'", () => {
    eq(equalValues(() => {}, () => { }), true)
    eq(equalValues(() => {}, () => { return 1 }), true)
  })

  await t.step("function and value => verify equality => 'false'", () => {
    eq(equalValues(() => {}, 1), false)
    eq(equalValues(() => {}, true), false)
    eq(equalValues(() => {}, false), false)
    eq(equalValues(() => {}, "a"), false)
    eq(equalValues(() => {}, null), false)
    eq(equalValues(() => {}, undefined), false)
    eq(equalValues(() => {}, []), false)
    eq(equalValues(() => {}, ["a"]), false)
    eq(equalValues(() => {}, {}), false)
    eq(equalValues(() => {}, {x: 1}), false)
  })

})
