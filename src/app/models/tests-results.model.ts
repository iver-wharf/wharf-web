export class TestsResults {
  passed: number;
  failed: number;

  constructor(passed: number, failed: number) {
    this.passed = passed;
    this.failed = failed;
  }
}
