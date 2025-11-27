import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskPayload } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class EditTaskService {

  task?:TaskPayload;

  constructor() { }
}
