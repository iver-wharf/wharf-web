import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wh-timer',
  template: '{{time}}',
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() start?: Date | string;
  @Input() end?: Date | string;

  time: string;
  private durationIntervalId: number;

  constructor(
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.durationIntervalId = setInterval(() => {
      this.updateFormattedTime();
      this.ref.markForCheck();
    }, 1000);
    this.updateFormattedTime();
  }

  ngOnDestroy(): void {
    clearInterval(this.durationIntervalId);
  }

  private updateFormattedTime(): void {
    const durationMs = this.getDurationMs();
    this.time = this.getFormattedTime(durationMs);
  }

  private getDurationMs(): number {
    const startDate = this.getDateOrNow(this.start);
    const endDate = this.getDateOrNow(this.end);
    return Math.abs(endDate.getTime() - startDate.getTime());
  }

  private getDateOrNow(date?: string | Date) {
    return date ? new Date(date) : new Date();
  }

  private getFormattedTime(durationMs: number): string {
    const totalSeconds = Math.floor(durationMs / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    if (totalHours > 0) {
      const minutes = totalMinutes % 60;
      return `${totalHours}h ${this.padTwoZeros(minutes)}m ${this.padTwoZeros(seconds)}s`;
    } else if (totalMinutes > 0) {
      return `${this.padTwoZeros(totalMinutes)}m ${this.padTwoZeros(seconds)}s`;
    } else {
      return `${this.padTwoZeros(totalSeconds)}s`;
    }
  }

  private padTwoZeros(n: number): string {
    return n.toString().padStart(2, '0');
  }

}
