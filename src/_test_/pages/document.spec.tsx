import "@testing-library/jest-dom";
import Document from "@/pages/_document";

// Mocking Next.js internal components agar tidak error saat fungsi dipanggil
jest.mock("next/document", () => ({
  Html: ({ children }: any) => <div>{children}</div>,
  Head: () => <div />,
  Main: () => <div />,
  NextScript: () => <div />,
}));

describe("_document.tsx", () => {
  it("should have correct lang attribute and basic structure", () => {
    // Kita panggil fungsinya secara langsung (bukan render)
    const result = Document();

    // 1. Cek properti lang pada tag Html
    expect(result.props.lang).toBe("id");

    // 2. Cek apakah di dalam Html ada komponen wajib
    const htmlChildren = result.props.children;
    
    // Cari Head, body
    const headExist = htmlChildren.find((child: any) => child.type.name === 'Head' || child.type.toString().includes('Head'));
    const bodyExist = htmlChildren.find((child: any) => child.type === 'body');

    expect(headExist).toBeDefined();
    expect(bodyExist).toBeDefined();
  });

  it("should contain Main and NextScript inside body", () => {
    const result = Document();
    const body = result.props.children.find((child: any) => child.type === 'body');
    
    // Cek isi di dalam body
    const bodyChildren = body.props.children;
    const mainExist = bodyChildren.find((child: any) => child.type.name === 'Main' || child.type.toString().includes('Main'));
    const nextScriptExist = bodyChildren.find((child: any) => child.type.name === 'NextScript' || child.type.toString().includes('NextScript'));

    expect(mainExist).toBeDefined();
    expect(nextScriptExist).toBeDefined();
  });
});