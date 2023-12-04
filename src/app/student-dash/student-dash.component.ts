import { Component,OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-student-dash',
  templateUrl: './student-dash.component.html',
  styleUrl: './student-dash.component.css'
})
export class StudentDashComponent implements OnInit{
  formValue !: FormGroup;
  constructor (private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      firstName: [],
      lastName:[''],
      email: [''],
      mobile:[''],
      fees: [''],
    });
  }


  

  

}
