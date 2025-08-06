// // ✅ Example RichTextEditorClient.tsx (must be client component)

// "use client";

// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import { EditorContent, useEditor } from "@tiptap/react"; // or your editor lib
// import StarterKit from "@tiptap/starter-kit";

// export default function RichTextEditorClient({
//   value,
//   onChange,
//   onInit,
// }: {
//   value: string;
//   onChange: (val: string) => void;
//   onInit?: () => void;
// }) {
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: value || "",
//     onUpdate: ({ editor }) => {
//       const html = editor.getHTML();
//       onChange(html);
//     },
//   });

//   useEffect(() => {
//     if (editor && onInit) {
//       onInit();
//     }
//   }, [editor]);

//   return <>{editor && <EditorContent editor={editor} />}</>;
// }

"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function RichTextEditorClient({
  value,
  onChange,
  onInit,
}: {
  value: string;
  onChange: (val: string) => void;
  onInit?: () => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "",
    editorProps: {
      attributes: {
        class: "min-h-[200px] border rounded-md p-2",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  useEffect(() => {
    if (editor && onInit) {
      onInit();
    }
  }, [editor]);

  return <>{editor && <EditorContent editor={editor} />}</>;
}
