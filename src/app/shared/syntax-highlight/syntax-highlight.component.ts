import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgChanges } from '../util/ngchanges';
import { SyntaxHighlightService } from './syntax-highlight.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wh-syntax-highlight',
  template: `
    <ng-template #template>
      <pre class="language-{{language}}"><code #codeElem>{{code}}</code></pre>
    </ng-template>
  `,
})
export class SyntaxHighlightComponent implements AfterViewChecked, OnChanges {
  @Input() language: string;
  @Input() code: string;

  @ViewChild('codeElem', { static: false }) codeElem: ElementRef<HTMLElement>;
  @ViewChild('template', { static: true, read: TemplateRef }) template: TemplateRef<any>;

  private hasHighlighted = false;

  constructor(
    private syntaxHighlightService: SyntaxHighlightService,
    private vref: ViewContainerRef,
  ) { }

  ngOnChanges(changes: NgChanges<SyntaxHighlightComponent>): void {
    if (changes.code || changes.language) {
      this.hasHighlighted = false;
      this.vref.clear();
      this.vref.createEmbeddedView(this.template);
    }
  }

  ngAfterViewChecked(): void {
    if (!this.hasHighlighted) {
      this.hasHighlighted = true;
      this.syntaxHighlightService.highlightElement(this.codeElem.nativeElement);
    }
  }
}
