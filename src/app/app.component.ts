import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'mat-table-project';
  public groupByColumns: string[] = [];

  displayedColumns: string[] = [
    'marks',
    'name',
    'cgpa',
    'surname',
    'marksheet',
  ];
  childTabledisplayedColumns: string[] = [
    'score',
    'student',
    'gpa',
    'subject',
    'remark',
  ];

  public dataSource: MatTableDataSource<any> = new MatTableDataSource();

  public studentData: any;

  constructor() {
    this.groupByColumns = ['marks'];
  }

  ngOnInit() {
    this.studentData = ELEMENT_DATA;
    this.dataSource.data = this.addGroups(
      this.studentData,
      this.groupByColumns
    );
  }

  public addGroups(data: any[], groupByColumns: string[]): any[] {
    const rootGroup = new Group();
    return this.getSublevel(data, 0, groupByColumns, rootGroup);
  }

  public getSublevel(
    data: any[],
    level: number,
    groupByColumns: string[],
    parent: Group
  ): any[] {
    if (level >= groupByColumns.length) {
      return data;
    }
    const groups = this.uniqueBy(
      data.map((row) => {
        const result: Record<string, any> = {};
        result['level'] = level + 1;
        result['parent'] = parent;
        for (let i = 0; i <= level; i++) {
          result[groupByColumns[i]] = row[groupByColumns[i]];
        }
        return result;
      }),
      JSON.stringify
    );

    const currentColumn = groupByColumns[level];
    let subGroups: any[] = [];
    groups.forEach((group: Record<string, any>) => {
      const rowsInGroup = data.filter(
        (row) => group[currentColumn] === row[currentColumn]
      );
      group['totalCounts'] = rowsInGroup.length;
      const subGroup = this.getSublevel(
        rowsInGroup,
        level + 1,
        groupByColumns,
        group as Group
      );
      subGroup.unshift(group);
      subGroups = subGroups.concat(subGroup);
    });
    return subGroups;
  }

  public uniqueBy(a: any, key: any) {
    const seen: Record<string, any> = {};
    return a.filter((item: any) => {
      const k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
  }

  public isGroup(index: any, item: any): boolean {
    return item.level;
  }

  public isGroupRow(index: any, item: any): boolean {
    return item.level !== 1;
  }
  public isExpand(index: any, item: any): boolean {
    return item.expand;
  }

  public sortData(event: Sort): void {
    if (event.active !== '') {
      this.groupByColumns.pop();
      this.groupByColumns.push(event.active);
      this.dataSource.data = this.addGroups(
        this.studentData,
        this.groupByColumns
      );
    }
  }
  public reloadDatasource(): void {
    this.dataSource.data = this.addGroups(
      this.studentData,
      this.groupByColumns
    );
  }
}

export class Group {
  level = 0;
  parent!: Group;
  totalCounts = 0;
  get visible(): boolean {
    return !this.parent || this.parent.visible;
  }
}

// export interface PeriodicElement {
//   name: string;
//   marks: number;
//   cgpa: number;
//   surname: string;

// }

const ELEMENT_DATA: any[] = [
  {
    marks: 45,
    name: 'Hyder',
    cgpa: 10.8,
    surname: 'Khan',
    expand: false,
    markSheets: [
      { score: 35, gpa: 3.5, subject: 'Math', remark: 'Pass' },
      { score: 32, gpa: 3.2, subject: 'Science', remark: 'Fail' },
      { score: 50, gpa: 5.0, subject: 'Chemestry', remark: 'Pass' },
      { score: 34, gpa: 3.4, subject: 'Physics', remark: 'Pass' },
    ],
  },
  {
    marks: 65,
    name: 'Himesh',
    cgpa: 4.0,
    surname: 'Singh',
    expand: false,
    markSheets: [
      { score: 35, gpa: 3.5, subject: 'Math', remark: 'Pass' },
      { score: 32, gpa: 3.2, subject: 'Science', remark: 'Fail' },
      { score: 50, gpa: 5.0, subject: 'Chemestry', remark: 'Pass' },
      { score: 34, gpa: 3.4, subject: 'Physics', remark: 'Pass' },
    ],
  },
  {
    marks: 65,
    name: 'Lalit',
    cgpa: 6.9,
    surname: 'Trivedi',
    expand: false,
    markSheets: [
      { score: 32, gpa: 3.2, subject: 'Science', remark: 'Fail' },
      { score: 50, gpa: 5.0, subject: 'Chemestry', remark: 'Pass' },
      { score: 34, gpa: 3.4, subject: 'Physics', remark: 'Pass' },
    ],
  },
  {
    marks: 77,
    name: 'Basant',
    cgpa: 9.01,
    surname: 'Singh',
    expand: false,
    markSheets: [
      { score: 35, gpa: 3.5, subject: 'Math', remark: 'Pass' },
      { score: 32, gpa: 3.2, subject: 'Science', remark: 'Fail' },
      { score: 50, gpa: 5.0, subject: 'Chemestry', remark: 'Pass' },
      { score: 34, gpa: 3.4, subject: 'Physics', remark: 'Pass' },
    ],
  },
  {
    marks: 45,
    name: 'Lalit',
    cgpa: 10.8,
    surname: 'Shukla',
    expand: false,
    markSheets: [
      { score: 35, gpa: 3.5, subject: 'Math', remark: 'Pass' },
      { score: 32, gpa: 3.2, subject: 'Science', remark: 'Fail' },
      { score: 50, gpa: 5.0, subject: 'Chemestry', remark: 'Pass' },
      { score: 34, gpa: 3.4, subject: 'Physics', remark: 'Pass' },
    ],
  },
  {
    marks: 77,
    name: 'Carlos',
    cgpa: 12.0,
    surname: 'Xavier',
    expand: false,
    markSheets: [
      { score: 35, gpa: 3.5, subject: 'Math', remark: 'Pass' },
      { score: 32, gpa: 3.2, subject: 'Science', remark: 'Fail' },
      { score: 50, gpa: 5.0, subject: 'Chemestry', remark: 'Pass' },
      { score: 34, gpa: 3.4, subject: 'Physics', remark: 'Pass' },
    ],
  },
  {
    marks: 88,
    name: 'Nilesh',
    cgpa: 14.0,
    surname: 'Patil',
    expand: false,
    markSheets: [
      { score: 35, gpa: 3.5, subject: 'Math', remark: 'Pass' },
      { score: 32, gpa: 3.2, subject: 'Science', remark: 'Fail' },
      { score: 50, gpa: 5.0, subject: 'Chemestry', remark: 'Pass' },
      { score: 34, gpa: 3.4, subject: 'Physics', remark: 'Pass' },
    ],
  },
  {
    marks: 89,
    name: 'Ustad',
    cgpa: 15.99,
    surname: 'Khan',
    expand: false,
    markSheets: [
      { score: 35, gpa: 3.5, subject: 'Math', remark: 'Pass' },
      { score: 32, gpa: 3.2, subject: 'Science', remark: 'Fail' },
      { score: 50, gpa: 5.0, subject: 'Chemestry', remark: 'Pass' },
      { score: 34, gpa: 3.4, subject: 'Physics', remark: 'Pass' },
    ],
  },
  {
    marks: 95,
    name: 'Nilesh',
    cgpa: 18.99,
    surname: 'Shukla',
    expand: false,
    markSheets: [
      { score: 35, gpa: 3.5, subject: 'Math', remark: 'Pass' },
      { score: 32, gpa: 3.2, subject: 'Science', remark: 'Fail' },
      { score: 50, gpa: 5.0, subject: 'Chemestry', remark: 'Pass' },
      { score: 34, gpa: 3.4, subject: 'Physics', remark: 'Pass' },
    ],
  },
  {
    marks: 95,
    name: 'Ojas',
    cgpa: 18.99,
    surname: 'Trivedi',
    expand: false,
    markSheets: [
      { score: 35, gpa: 3.5, subject: 'Math', remark: 'Pass' },
      { score: 32, gpa: 3.2, subject: 'Science', remark: 'Fail' },
      { score: 50, gpa: 5.0, subject: 'Chemestry', remark: 'Pass' },
      { score: 34, gpa: 3.4, subject: 'Physics', remark: 'Pass' },
    ],
  },
];
