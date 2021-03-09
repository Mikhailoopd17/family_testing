import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {merge} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {Question} from '../model/question';
import {PageParams} from '../model/page-params';
import {QuestionsService} from '../service/questions.service';
import {AddQuestionDialogComponent} from './add-question-dialog/add-question-dialog.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements AfterViewInit {
  sizeOption: number[] = [1, 5, 10, 30];
  displayedColumns: string[] = ['id', 'question', 'prompt', 'created', 'actions'];
  data: Question[] = [];
  params: PageParams;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public questionService: QuestionsService,
              public dialog: MatDialog) {}

  getIndex(data: Question[]): Question[] {
    for (let i = 0; i < data.length; i++) {
      data[i]._id = i + 1 + this.paginator.pageIndex * this.paginator.pageSize;
    }
    return data;
  }

  changeParams(): void {
    this.params = {
      page: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      params: {
        orderDir: this.sort.direction,
        orderBy: this.sort.active
      }
    };
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.refreshPage();
  }

  refreshPage(): void {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.changeParams();
          this.isLoadingResults = true;
          return this.questionService.getListByParams(this.params);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total;

          return data.entryList;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;

          return [];
        })
      ).subscribe(data => {
      this.data = this.getIndex(data);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddQuestionDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshPage();
    });
  }

  deleteQuestion(id: string): void {
    this.questionService.delete(id)
      .toPromise()
      .then(() => this.refreshPage())
      .catch(error => console.log(error));
  }
}
