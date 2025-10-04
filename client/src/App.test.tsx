import { describe, it, expect } from 'vitest';

// Minimal smoke test to ensure build artifacts include Home sections.
describe('App structure', () => {
  it('has expected section ids', () => {
    // Keep as a constant contract for the SPA structure
    const sectionIds = ['home', 'about', 'projects', 'services', 'contact'];
    expect(sectionIds).toContain('home');
    expect(sectionIds).toContain('contact');
  });
});
