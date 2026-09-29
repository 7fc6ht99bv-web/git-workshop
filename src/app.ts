/**
 * ============================================================================
 * WSU Workshop: Interactive UI Controller (app.ts)
 * ============================================================================
 *
 * CONCEPT: Connecting Type-Safe Business Logic to the DOM
 * ----------------------------------------------------------------------------
 * This module binds user interactions from index.html to our core calculator
 * functions in `calculator.ts`.
 *
 * LECTURE TALKING POINTS:
 * 1. Safe DOM Access:
 *    - Uses type assertion (`as HTMLInputElement`) or explicit null checks
 *      so TypeScript knows which DOM element interfaces are being manipulated.
 * 2. Exhaustive Type Narrowing:
 *    - Consumes the `CalculationResult` discriminated union.
 *    - Notice how checking `outcome.status === "success"` unlocks `outcome.result`,
 *      while the else / `outcome.status === "failure"` branch safely unlocks `outcome.error`.
 * ============================================================================
 */

import { add, divide, type CalculationResult } from "./calculator.js";

// Grab DOM elements with proper TypeScript type annotations
const form = document.getElementById(
  "calculator-form",
) as HTMLFormElement | null;
const numAInput = document.getElementById("numA") as HTMLInputElement | null;
const numBInput = document.getElementById("numB") as HTMLInputElement | null;
const operationSelect = document.getElementById(
  "operation",
) as HTMLSelectElement | null;
const resultBox = document.getElementById("result-box");
const resultText = document.getElementById("result-text");
const resultStatus = document.getElementById("result-status");

/**
 * Updates the user interface based on the type-narrowed CalculationResult.
 */
export function renderResult(outcome: CalculationResult): void {
  if (!resultBox || !resultText || !resultStatus) {
    return;
  }

  resultStatus.style.display = "inline-block";

  // LECTURE DEMO: Discriminated union type narrowing in action
  if (outcome.status === "success") {
    // TypeScript knows `outcome` has `result: number` here!
    resultBox.className = "result-box success";
    resultStatus.className = "status-pill success";
    resultStatus.textContent = "SUCCESS";
    resultText.textContent = `Result: ${outcome.result.toString()}`;
  } else {
    // TypeScript knows `outcome` has `error: string` here!
    resultBox.className = "result-box failure";
    resultStatus.className = "status-pill failure";
    resultStatus.textContent = "FAILURE";
    resultText.textContent = `Error: ${outcome.error}`;
  }
}

/**
 * Handles the calculator form submit event.
 */
export function handleCalculate(event: Event): void {
  event.preventDefault();

  if (!numAInput || !numBInput || !operationSelect) {
    return;
  }

  const a = parseFloat(numAInput.value);
  const b = parseFloat(numBInput.value);
  const operation = operationSelect.value;

  let outcome: CalculationResult;

  if (operation === "divide") {
    outcome = divide(a, b);
  } else {
    outcome = add(a, b);
  }

  renderResult(outcome);
}

// Attach event listener when DOM is ready
if (form) {
  form.addEventListener("submit", handleCalculate);
}
