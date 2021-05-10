/*
The MIT License (MIT)

Copyright (c) 2016-2020 PrimeTek

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
   all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  forwardRef,
  Inject,
  QueryList,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  TabPanel,
  TabView,
} from 'primeng/tabview';
import { PrimeTemplate } from 'primeng/api';

// Copied from:
// https://github.com/primefaces/primeng/blob/11.3.1/src/app/components/tabview/tabview.ts#L12-L23
@Component({
  selector: 'wh-tabpanel-x',
  template: `
    <div [attr.id]="id" class="p-tabview-panel" [hidden]="!selected"
      role="tabpanel" [attr.aria-hidden]="!selected" [attr.aria-labelledby]="id + '-label'" *ngIf="!closed">
      <ng-content></ng-content>
      <ng-container *ngIf="contentTemplate && (cache ? loaded : selected)">
        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
      </ng-container>
    </div>
  `,
})
export class TabPanelExtendedComponent extends TabPanel implements AfterContentInit {
  @ContentChildren(PrimeTemplate, { descendants: true }) templates: QueryList<any>;

  sideHeaderOverrideTemplate: TemplateRef<any>;

  constructor(
    @Inject(forwardRef(() => TabViewExtendedComponent)) tabView,
    public viewContainer: ViewContainerRef,
    public cd: ChangeDetectorRef
  ) {
    super(tabView, viewContainer, cd);
  }

  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'header':
          this.headerTemplate = item.template;
          break;

        case 'content':
          this.contentTemplate = item.template;
          break;

        case 'side-header-override':
          this.sideHeaderOverrideTemplate = item.template;
          break;

        default:
          this.contentTemplate = item.template;
          break;
      }
    });
  }
}

// Copied from:
// https://github.com/primefaces/primeng/blob/11.3.1/src/app/components/tabview/tabview.ts#L146-L176
@Component({
  selector: 'wh-tabview-x',
  template: `
    <div [ngClass]="'p-tabview p-component wh-tabview-x'" [ngStyle]="style" [class]="styleClass">
      <div class="wh-tabview-x-header">
        <div class="wh-tabview-x-header-main">
          <ul #navbar class="p-tabview-nav" role="tablist">
            <ng-template ngFor let-tab [ngForOf]="tabs">
              <li
                role="presentation"
                [ngClass]="{'p-highlight': tab.selected, 'p-disabled': tab.disabled}"
                [ngStyle]="tab.headerStyle"
                [class]="tab.headerStyleClass"
                *ngIf="!tab.closed">
                <a
                  role="tab"
                  class="p-tabview-nav-link"
                  [attr.id]="tab.id + '-label'"
                  [attr.aria-selected]="tab.selected"
                  [attr.aria-controls]="tab.id"
                  [pTooltip]="tab.tooltip"
                  [tooltipPosition]="tab.tooltipPosition"
                  [positionStyle]="tab.tooltipPositionStyle"
                  [tooltipStyleClass]="tab.tooltipStyleClass"
                  (click)="open($event,tab)"
                  (keydown.enter)="open($event,tab)"
                  pRipple
                  [attr.tabindex]="tab.disabled ? null : '0'">
                  <ng-container *ngIf="!tab.headerTemplate">
                    <span class="p-tabview-left-icon" [ngClass]="tab.leftIcon" *ngIf="tab.leftIcon"></span>
                    <span class="p-tabview-title">{{tab.header}}</span>
                    <span class="p-tabview-right-icon" [ngClass]="tab.rightIcon" *ngIf="tab.rightIcon"></span>
                  </ng-container>
                  <ng-container *ngTemplateOutlet="tab.headerTemplate"></ng-container>
                  <span *ngIf="tab.closable" class="p-tabview-close pi pi-times" (click)="close($event,tab)"></span>
                </a>
              </li>
            </ng-template>
            <li #inkbar class="p-tabview-ink-bar"></li>
          </ul>
        </div>
        <div class="wh-tabview-x-header-side">
          <ng-container *ngTemplateOutlet="getSideHeaderTemplate()"></ng-container>
        </div>
      </div>
      <div class="p-tabview-panels">
        <ng-content></ng-content>
      </div>
     </div>
  `,
  styleUrls: [
    './tabview.scss',
    './tabview-x.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TabViewExtendedComponent extends TabView implements AfterContentInit {
  @ContentChildren(TabPanelExtendedComponent) tabPanels: QueryList<TabPanelExtendedComponent>;

  @ContentChildren(PrimeTemplate) templates: QueryList<any>;

  tabs: TabPanelExtendedComponent[];

  sideHeaderTemplate: TemplateRef<any>;

  getSideHeaderTemplate(): TemplateRef<any> {
    const activeTab = this.findSelectedTab();
    return activeTab?.sideHeaderOverrideTemplate ?? this.sideHeaderTemplate;
  }

  ngAfterContentInit() {
    super.ngAfterContentInit();

    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'side-header':
          this.sideHeaderTemplate = item.template;
          break;
      }
    });
  }

  findSelectedTab(): TabPanelExtendedComponent {
    return super.findSelectedTab() as TabPanelExtendedComponent;
  }
}
