import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Consultant } from './consultant';
import { ConsultantService } from './consultant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public consultants!: Consultant[];
  public editConsultant: Consultant | undefined;
  public deleteConsultant: Consultant | undefined;

  constructor(private consultantService: ConsultantService) { }

  ngOnInit(): void {
    this.getConsultants();
  }

  public getConsultants(): void {
    this.consultantService.getConsultants().subscribe(
      (response: Consultant[]) => {
        this.consultants = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddConsultant(addForm: NgForm): void {
    document.getElementById('add-consultant-form')?.click();
    this.consultantService.addConsultant(addForm.value).subscribe(
      (response: Consultant) => {
        console.log(response);
        this.getConsultants();
        addForm.reset();
      }
      ,
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );
  }

  public onUpdateConsultant(consultant: Consultant): void {
    this.consultantService.updateConsultant(consultant).subscribe(
      (response: Consultant) => {
        console.log(response);
        this.getConsultants();
      }
      ,
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );
  }

  public onDeleteConsultant(consultantId: number): void {
    this.consultantService.deleteConsultant(consultantId).subscribe(
      (response: void) => {
        console.log(response);
        this.getConsultants();
      }
      ,
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );
  }

  public searchConsultant(key: String){
    console.log(key);
    const results: Consultant[] =[];
    if(this.consultants !== null){
      for (const consultant of this.consultants){
        if(consultant.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || consultant.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || consultant.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || consultant.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1)
        {
          results.push(consultant);
        }
      }
      this.consultants = results;
      if(results.length === 0 || !key){
        this.getConsultants();
      }
      }


  }


  public onOpenModal(mode: String, consultant?: Consultant): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addConsultantModal');
    }
    else if (mode === 'edit') {
      this.editConsultant = consultant;
      button.setAttribute('data-target', '#updateConsultantModal');
    }
    else if (mode === 'delete') {
      this.deleteConsultant = consultant;
      button.setAttribute('data-target', '#deleteConsultantModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
