/**
 * ============================================================================
 * WSU Workshop: TypeScript & CI/CD Demo - Calculator Module
 * ============================================================================
 *
 * CONCEPT: Discriminated Unions (Tagged Unions) & Type Safety
 * ----------------------------------------------------------------------------
 * In standard JavaScript, functions often return `null`, `undefined`, or throw
 * runtime exceptions when an error occurs. This forces callers to guess what
 * went wrong or wrap everything in try/catch blocks.
 *
 * In TypeScript, we can use "Discriminated Unions" to model both success and
 * failure explicitly as distinct types sharing a common discriminator field
 * (in our case, the `status` property).
 * ============================================================================
 */

/**
 * Represents a successful calculation.
 *
 * - `status`: Literal type `"success"`. This serves as our "tag" or "discriminator".
 * - `result`: The numerical outcome of the mathematical operation.
 */
export type CalculationSuccess = {
  status: "success";
  result: number;
};

/**
 * Represents a failed calculation (e.g., division by zero).
 *
 * - `status`: Literal type `"failure"`. This serves as our "tag" or "discriminator".
 * - `error`: A descriptive string explaining why the operation could not be completed.
 */
export type CalculationFailure = {
  status: "failure";
  error: string;
};

/**
 * Represents the union of all possible calculation outcomes.
 *
 * Any function returning `CalculationResult` is guaranteed to return either
 * a `CalculationSuccess` OR a `CalculationFailure`.
 *
 * When consuming this result, TypeScript will automatically "narrow" the type
 * based on checks against the `status` property (e.g., `if (res.status === "success")`).
 */
export type CalculationResult = CalculationSuccess | CalculationFailure;

/**
 * Adds two numbers and returns a successful calculation result.
 *
 * @param a - The first number (addend).
 * @param b - The second number (addend).
 * @returns A `CalculationResult` containing the sum marked with status "success".
 *
 * LECTURE TALKING POINT:
 * Notice that both inputs and outputs are explicitly typed. If someone tries to
 * pass a string like `add("5", 7)` or forget an argument, TypeScript catches it
 * at compile time before code ever runs in production.
 */
export function add(a: number, b: number): CalculationResult {
  return { status: "success", result: a + b };
}

/**
 * Divides the numerator by the denominator, safely handling division by zero.
 *
 * @param numerator - The number to be divided (dividend).
 * @param denominator - The number to divide by (divisor).
 * @returns A `CalculationResult` containing either the quotient or an error message.
 *
 * LECTURE TALKING POINT:
 * In traditional JavaScript, `10 / 0` evaluates to `Infinity` without error.
 * Here, we enforce domain logic to return an explicit failure structure,
 * making error handling predictable and type-safe across our application.
 */
export function divide(
  numerator: number,
  denominator: number,
): CalculationResult {
  // Check for invalid mathematical operation (division by zero)
  if (denominator === 0) {
    return { status: "failure", error: "Division by zero is undefined." };
  }

  // Safe division: return successful payload
  return { status: "success", result: numerator / denominator };
}
