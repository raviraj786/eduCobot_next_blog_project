'use client';

import React, { useEffect, useRef } from 'react';

// Dynamic import inside useEffect to avoid SSR issues
export default function RichTextEditorClient({ initialContent = '', onChange }: { initialContent?: string, onChange?: (html: string) => void }) {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<any>(null);

  useEffect(() => {
    let makeRichText: any;

    const initEditor = async () => {
      const mod = await import('rich-text-editor');
      makeRichText = mod.makeRichText;

      editorInstanceRef.current = makeRichText({
        container: editorContainerRef.current!,
        content: initialContent,
        onChange: (html: string) => {
          if (onChange) onChange(html);
        },
      });
    };

    initEditor();

    return () => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current.destroy?.();
      }
    };
  }, []);

  return <div ref={editorContainerRef} style={{ minHeight: 300, border: '1px solid #ccc', padding: 10 }} />;
}
