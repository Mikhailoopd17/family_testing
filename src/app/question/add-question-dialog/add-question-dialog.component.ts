import {AfterViewInit, Component, OnInit} from '@angular/core';
import {QuestionsService} from '../../service/questions.service';
import {Question} from '../../model/question';
import {QuestionCreate} from '../../model/question-create';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-question-dialog',
  templateUrl: './add-question-dialog.component.html',
  styleUrls: ['./add-question-dialog.component.css']
})
export class AddQuestionDialogComponent implements AfterViewInit {

  data: QuestionCreate = new QuestionCreate();
  constructor(public questionService: QuestionsService,
              public dialogRef: MatDialogRef<AddQuestionDialogComponent>,
  ) { }


  addQuestion(): void {
    this.questionService.create(this.data)
      .toPromise()
      .then(res => this.dialogRef.close())
      .catch(error => console.log(error));
  }

  ngAfterViewInit(): void {
  }
}
