import { Injectable } from '@angular/core';
import { AllSubTask } from '../interface/interface';
import { AllUsers } from '../interface/interface';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  Tasks: AllSubTask = {}
  Contacts: AllUsers = {}


}
