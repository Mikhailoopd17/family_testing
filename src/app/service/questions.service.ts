import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question} from '../model/question';
import {QuestionCreate} from '../model/question-create';
import {PageParams} from '../model/page-params';
import {Page} from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private httpClient: HttpClient) {
  }

  public getList() {
    return this.httpClient.get('/test/api/questions');
  }

  public getListByParams(params: PageParams): Observable<Page> {
    return this.httpClient.post<Page>('/test/api/questions/by_params', params);
  }


  public create(question: QuestionCreate): Observable<object>{
    const body = {
      question: question.question,
      prompt: question.prompt
    };
    return this.httpClient.post('/test/api/questions', body);
  }

  public delete(id: string): Observable<object> {
    return this.httpClient.delete('/test/api/questions/' + id);
  }
}
