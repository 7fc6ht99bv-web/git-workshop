/**
 * ============================================================================
 * WSU Workshop: TypeScript & CI/CD Demo - Unit Tests (Vitest)
 * ============================================================================
 *
 * CONCEPT: Automated Unit Testing & Test-Driven Confidence
 * ----------------------------------------------------------------------------
 * Unit tests verify individual units of code (like isolated functions) in
 * isolation to ensure they produce expected outputs for given inputs.
 *
 * In modern CI/CD pipelines, automated tests run on every Git push/PR to catch
 * regressions before bugs reach main or production.
 *
 * KEY TESTING CONCEPTS DEMONSTRATED:
 * 1. Test Suite (`describe`): Groups related test cases together.
 * 2. Test Case (`it` / `test`): Defines a specific scenario to verify.
 * 3. Assertions (`expect(...).toBe(...)`): Verifies expected vs actual outcomes.
 * 4. AAA Pattern:
 *    - Arrange: Set up inputs and test state.
 *    - Act: Call the function under test.
 *    - Assert: Check the returned value or side effects.
 * ============================================================================
 */

import { describe, expect, it } from "vitest";
import { add, divide } from "../src/calculator.js";

describe("Calculator", () => {
  /**
   * TEST 1: Happy Path - Addition
   * Verifies that adding two valid positive integers returns a success status
   * with the mathematically correct sum.
   */
  it("adds two valid numbers", () => {
    // 1. Arrange & Act: Invoke the function with sample inputs (5 and 7)
    const outcome = add(5, 7);

    // 2. Assert: Check that status is explicitly "success"
    expect(outcome.status).toBe("success");

    // LECTURE TALKING POINT (Type Narrowing in Tests):
    // Because `outcome` is a discriminated union (`CalculationResult`),
    // checking `outcome.status === "success"` allows TypeScript to narrow
    // the type so we can safely access `outcome.result` without compiler errors.
    if (outcome.status === "success") {
      expect(outcome.result).toBe(12);
    }
  });

  /**
   * TEST 2: Edge Case / Error Handling - Division by Zero
   * Verifies that passing 0 as the denominator produces an explicit "failure"
   * object with a helpful error message, rather than returning Infinity or crashing.
   */
  it("safely handles division by zero", () => {
    // 1. Arrange & Act: Attempt division by zero
    const outcome = divide(10, 0);

    // 2. Assert: Check that status is explicitly "failure"
    expect(outcome.status).toBe("failure");

    // LECTURE TALKING POINT:
    // Once narrowed to `CalculationFailure`, TypeScript knows `outcome.error` exists.
    if (outcome.status === "failure") {
      expect(outcome.error).toBe("Division by zero is undefined.");
    }
  });
});
