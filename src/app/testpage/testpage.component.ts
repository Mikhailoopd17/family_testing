import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {QuestionComponent} from '../question/question.component';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css']
})
export class TestpageComponent implements AfterViewInit {

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
   this.dialog.open(QuestionComponent, {
      width: '750px',
      data: []
    });
  }

  ngAfterViewInit(): void {
  }
}
