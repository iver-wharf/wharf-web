import { Component, Input, OnInit } from '@angular/core';
import { WharfProject } from 'src/app/models/wharf-project.model';

interface Schedule {
  scheduleId: number;
  occurrence: string;
  finishDate?: Date;
  startDate: Date;
}

@Component({
  selector: 'wh-project-details-schedule',
  templateUrl: './project-details-schedule.component.html',
})
export class ProjectDetailsScheduleComponent implements OnInit {
  @Input() project?: WharfProject;

  projectId: string;
  rowsCount = 10;
  buildsTotalCount = 0;
  schedules: Schedule[] = [
    {
      scheduleId: 1000,
      occurrence: 'Daily',
      finishDate: null,
      startDate: new Date(),
    },
    {
      scheduleId: 999,
      occurrence: 'Monthly',
      finishDate: new Date(),
      startDate: new Date(),
    },
    {
      scheduleId: 998,
      occurrence: 'Daily',
      finishDate: null,
      startDate: new Date(),
    },
  ];

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
