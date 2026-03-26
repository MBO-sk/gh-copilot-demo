import { describe, expect, it } from "vitest";
import { validateDate,validateIPV6 } from "./validators";

// test the validateDate function
describe("validateDate", () => {
  it("should return a Date object for valid date input", () => {
    const result = validateDate("15/08/2021")
    expect(result).toBeInstanceOf(Date)
    expect(result?.getDate()).toBe(15)
    expect(result?.getMonth()).toBe(7) // Months are zero-based
    expect(result?.getFullYear()).toBe(2021) 
    })})

// test the validateIPV6 function
describe("validateIPV6", () => {
  it("should return true for valid IPv6 address", () => {
    expect(validateIPV6("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(true)
  })})

