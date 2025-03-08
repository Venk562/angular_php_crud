import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { StudentsService } from '../students.service';
import { Students } from '../students';
import { Router, RouterModule,Params,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-edit',
  imports:[FormsModule,ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{
  routes: any;
onSubmit() {
throw new Error('Method not implemented.');
}

  constructor(private formBuilder: FormBuilder,private _studentService: StudentsService,
    private router: Router,
    private route: ActivatedRoute
) {}



  addForm!: FormGroup;

    ngOnInit() {

      // const routeParams = this.routes.snapshot.params;
      // const routeParams = this.route.snapshot.paramMap.get('id'); 
      // console.log(routeParams);

      // this.route.paramMap.subscribe(params => {
      //   const id = params.get('id'); 
      //   console.log('ID:', id);
      //   // console.log(params);
      //   this.addForm.patchValue();
      // });

      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this._studentService.getById(id).subscribe((data: any) => {
            console.log(data);
            this.addForm.patchValue(data);
          });
        }
      });

      this.addForm = this.formBuilder.group({
        sId: [''],
        fName: ['', Validators.required], // Ensure field names match the template
        lName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      
      });
    }

    update()
    {
      console.log('update');

      this._studentService.updateStudent(this.addForm.value).subscribe({
        next: () => {
          this.router.navigate(['view']);
        },
        error: (error) => {
          alert('Error updating student: ' + (error.message || error));
        }
      });
      
      
    }

}
