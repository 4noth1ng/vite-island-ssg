import { useState, useEffect } from 'react';
import { Header } from 'shared/types/index';
import { normalizePath } from 'vite';

export function useHeaders(initHeaders: Header[]) {
  const [headers, setHeaders] = useState(initHeaders);

  useEffect(() => {
    if (import.meta.env.DEV) {
      import.meta.hot.on(
        'mdx-changed',
        ({ filePath }: { filePath: string }) => {
          console.log(filePath);
          const index = filePath.indexOf('/docs');
          const path = filePath.substring(index);
          import(
            /* @vite-ignore */

            `${path}?import&t=${Date.now()}`
          )
            .then((module) => {
              setHeaders(module.toc);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      );
    }
  });
  return headers;
}
