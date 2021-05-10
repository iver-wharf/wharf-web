export class TestsResults {
  passed: string;
  failed: string;

  constructor(passed: string, failed: string) {
    this.passed = passed;
    this.failed = failed;
  }
}
