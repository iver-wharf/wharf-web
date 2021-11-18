export class TestResultSummary {
  artifactId?: number;
  buildId?: number;
  failed?: number;
  passed?: number;
  skipped?: number;
  testResultSummaryId?: number;
  total?: number;
  fileName?: string;

  constructor(
    artifactId?: number,
    buildId?: number,
    failed?: number,
    passed?: number,
    skipped?: number,
    testResultSummaryId?: number,
    total?: number,
    fileName?: string) {
    this.artifactId = artifactId;
    this.buildId = buildId;
    this.failed = failed;
    this.passed = passed;
    this.skipped = skipped;
    this.testResultSummaryId = testResultSummaryId;
    this.total = total;
    this.fileName = fileName;
  }
}
