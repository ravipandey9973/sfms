import { Component,OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms';
import {HttpClient } from '@angular/common/http'
import { StudentDashModele } from './studentdash.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-student-dash',
  templateUrl: './student-dash.component.html',
  styleUrl: './student-dash.component.css'
})
export class StudentDashComponent implements OnInit{
  showAdd!:boolean;
  showUpdate!:boolean;
  formValue !: FormGroup;
  StudentModelOnj : StudentDashModele = new StudentDashModele();
  studentAll:any;
  constructor (private formBuilder: FormBuilder,private api : ApiService) {}

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      firstName: [''],
      lastName:[''],
      email: [''],
      mobile:[''],
      fees: [''],
    });
    this.getAllStudents();
  }
  clickAddStudent(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postStudentDetails() {
    this.StudentModelOnj.firstName = this.formValue.value.firstName;
    this.StudentModelOnj.lastName = this.formValue.value.lastName;
    this.StudentModelOnj.email = this.formValue.value.email;
    this.StudentModelOnj.mobile = this.formValue.value.mobile;
    this.StudentModelOnj.fees = this.formValue.value.fees;

  

    this.api.postStudent(this.StudentModelOnj).subscribe((res)=>{
      console.log(res);
      alert("Student Record Added Succesfuly !");
      this.formValue.reset();
    },
    (err)=>{
      alert("Something Went Wrong !!!");
    
    })

}
getAllStudents(){
  this.api.getStudent().subscribe(res=>{
    this.studentAll = res;
  })
}

deletStudents(data:any){
  this.api.deleteStudent(data.id).subscribe(res=>{
   alert("Record Deleted Sucessfully");
   this.getAllStudents();
   
  },
  (err)=>{
    alert("Something Went Wrong in deletion!!!");
    console.error('Error deleting student:', err);
    
  }
  )
}
onEdit(data:any){
  this.showAdd=false;
  this.showUpdate=true;
  this.StudentModelOnj.id=data.id;
  this.formValue.controls['firstName'].setValue(data.firstName);
  this.formValue.controls['lastName'].setValue(data.lastName);
  this.formValue.controls['email'].setValue(data.email);
  this.formValue.controls['mobile'].setValue(data.mobile);
  this.formValue.controls['fees'].setValue(data.fees);
}
UpdateStudentDetails(){
  this.StudentModelOnj.firstName=this.formValue.value.firstName;
  this.StudentModelOnj.lastName=this.formValue.value.lastName;
  this.StudentModelOnj.email=this.formValue.value.email;
  this.StudentModelOnj.mobile=this.formValue.value.mobile;
  this.StudentModelOnj.fees=this.formValue.value.fees;
  this.api.updateStudent(this.StudentModelOnj,this.StudentModelOnj.id).subscribe(res=>{
    alert("Record Update Successfuly!!!");
    this.formValue.reset();
    this.getAllStudents();
  })
}

}




