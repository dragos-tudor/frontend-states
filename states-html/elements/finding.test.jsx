import { assertEquals } from "/asserts.ts"
import { render } from "/rendering.js"
import { findHtmlDescendants } from "./finding.js"

Deno.test("use selectors => find elements", async (t) => {

  await t.step("html tree => find descendants => descendant elements", () => {
    assertEquals(findHtmlDescendants(render(<a></a>), e => e.tagName === "A")[0].tagName, "A")
    assertEquals(findHtmlDescendants(render(<a><b></b></a>), e => e.tagName === "B")[0].tagName, "B")
    assertEquals(findHtmlDescendants(render(<a><b><c></c></b></a>), e => e.tagName === "C")[0].tagName, "C")
    assertEquals(findHtmlDescendants(render(<a><b></b><c></c></a>), e => e.tagName === "C")[0].tagName, "C")
    assertEquals(findHtmlDescendants(render(<a><b><c></c></b><c></c></a>), e => e.tagName === "C").map(e => e.tagName), ["C", "C"])
    assertEquals(findHtmlDescendants(render(<a></a>), e => e.tagName === "B"), [])
  })

})