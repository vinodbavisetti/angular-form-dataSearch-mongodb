import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  name = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
  });
  email = new FormControl('', {
    validators: [Validators.required, Validators.email],
  });
  dob = new FormControl('', { validators: [Validators.required] });
  mobile = new FormControl('', {
    validators: [
      Validators.required,
      Validators.pattern(/^\d{10}$/),
      Validators.maxLength(10),
    ],
  });
  formGp: FormGroup;

  constructor(fg: FormBuilder, private matDialog: MatDialog) {
    this.formGp = fg.group({
      email: this.email,
      name: this.name,
      dob: this.dob,
      mobile: this.mobile,
    });
  }

  ngOnInit(): void {
    // console.log(this.formGp);
  }

  onSubmit() {
    let formdata = { ...this.formGp.value };
    // console.log(this.formGp);
    fetch('http://localhost:3000/api/intothedatabase', {
      method: 'POST',
      body: JSON.stringify(formdata),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        this.matDialog.open(DialogBoxComponent, {
          width: '20rem',
          data: {
            title: 'submit summary',
            content: res.msg,
          },
        });
        // this.formGp.reset({
        //   name: '',
        //   email: '',
        //   dob: '',
        //   mobile: '',
        // });
        // console.log(this.formGp);
        this.ngOnInit();
      })
      .catch((err) => console.log(err));
  }
}
