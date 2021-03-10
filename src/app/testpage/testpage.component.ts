import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {QuestionComponent} from '../question/question.component';
import {Router} from '@angular/router';
import {AuthServiceService} from '../service/auth-service.service';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css']
})
export class TestpageComponent implements AfterViewInit {

  constructor(public dialog: MatDialog,
              private router: Router,
              private authService: AuthServiceService) {
    authService.getCurrentUser()
      .pipe()
      .subscribe(res => {
        if (res) {
          router.navigateByUrl('/test');
        }
      });
  }

  openDialog(): void {
   this.dialog.open(QuestionComponent, {
      width: '750px',
      data: []
    });
  }

  ngAfterViewInit(): void {
  }
}
