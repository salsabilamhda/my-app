import fs from 'fs';
import path from 'path';

describe("Next.js Environment Declaration File", () => {
  const filePath = path.resolve(__dirname, "../../next-env.d.ts");

  it("should exist in the root directory", () => {
    // Mengecek apakah file next-env.d.ts ada
    const fileExists = fs.existsSync(filePath);
    expect(fileExists).toBe(true);
  });

  it("should contain the correct Next.js reference types", () => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Memastikan referensi tipe Next.js ada di dalam file
    expect(fileContent).toContain('/// <reference types="next" />');
    expect(fileContent).toContain('/// <reference types="next/image-types/global" />');
  });
});