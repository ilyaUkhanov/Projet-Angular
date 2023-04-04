import { Component, OnInit  } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public FormIdentification: FormGroup;
  public data: String="";
  constructor(private formBuilder: FormBuilder) {
    this.FormIdentification = this.formBuilder.group({
      gender: ['',Validators.required],
      lastname: ['',Validators.required],
      firstname: ['',Validators.required],
    });
  }

  ngOnInit(): void {
  }

  submit () {
    this.data = this.FormIdentification.value;
  }
}
