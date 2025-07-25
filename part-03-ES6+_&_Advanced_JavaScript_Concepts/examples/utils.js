/**
 * utils.js
 * This file demonstrates how to export functions and constants from a module.
 */

// Named export: A module can have multiple named exports.
export const PI = 3.14159;

export const EULER_NUMBER = 2.718;

export function add(a, b) {
    return a + b;
}

// Default export: A module can only have one default export.
// This is often used for the "main" thing the module provides.
export default function multiply(a, b) {
    return a * b;
}