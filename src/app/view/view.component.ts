import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { Students } from '../students';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-view',
  imports: [CommonModule,RouterModule],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit{
  students: Students[]=[];
  _id:any;


  constructor(private _studentsService: StudentsService,
              private router:Router
             ){}
 
  ngOnInit() {
    this._studentsService.getStudents()
    .subscribe((data: Students[])  => {
      this.students = data;
    console.log(this.students);
    });
    (error) => {
      console.error("Error fetching students:", error);
    }

     
  }
  // deleteStudent(event:any, studentId:Number)
  // {
  //   if(confirm('Are you sure you want to delete this data ?'))
  //   {
  //     event.target.innerText = "Deleting....";
  //     this._studentsService.destroyStudent(studentId).subscribe((res:any) => {

  //     });
  //   }
  // }

  // delete(Students: Students): void{
  //   console.log(students.sId);
  //   this._studentsService.deleteStudent(this.students.sId).subscribe(data =>{
  //     this.students = this.students.filter(u => u !== Students);
  //   });
  // }

  delete(students: Students): void {
    console.log(students.sId);
    this._studentsService.deleteStudent(students.sId).subscribe(data => {
        this.students = this.students.filter(u => u !== students);
    });
}

edit(students: Students)
{
 this._id = students.sId
 this.router.navigate(['edit/' + this._id]);
}

} 
