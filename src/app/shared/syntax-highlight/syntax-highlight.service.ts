import { Injectable } from '@angular/core';

import 'prismjs';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-yaml';

// Based on https://auralinna.blog/post/2017/code-syntax-highlighting-with-angular-and-prismjs/
@Injectable()
export class SyntaxHighlightService {
  highlightAll() {
    Prism.highlightAll();
  }

  highlightElement(element: Element) {
    Prism.highlightElement(element);
  }
}
