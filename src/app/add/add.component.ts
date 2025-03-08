import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { StudentsService } from '../students.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports:[FormsModule,ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addForm!: FormGroup; // Using definite assignment `!`

  constructor(private formBuilder: FormBuilder,private _studentService: StudentsService,
              private router: Router
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      fName: ['', Validators.required], // Ensure field names match the template
      lName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
    
    });
  }
  get email() {
    return this.addForm.get('email');
  }
  onSubmit() {
    console.log(this.addForm.value); // Print form values instead of the FormGroup itself

    this._studentService.createStudent(this.addForm.value).subscribe(data => {
      this.router.navigate(['view']);
  });
  }
}
