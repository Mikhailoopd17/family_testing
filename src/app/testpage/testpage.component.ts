import {AfterViewInit, Component, OnInit} from '@angular/core';
import {QuestionDialogComponent} from './question-dialog/question-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {HomeComponent} from '../home/home.component';
import {QuestionsService} from '../service/questions.service';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css']
})
export class TestpageComponent implements AfterViewInit {

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
   this.dialog.open(QuestionDialogComponent, {
      width: '750px',
      data: []
    });
  }

  ngAfterViewInit(): void {
  }
}
