import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-data-search',
  templateUrl: './data-search.component.html',
  styleUrls: ['./data-search.component.css'],
})
export class DataSearchComponent implements OnInit {
  name = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
  });
  data;
  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {}

  onSubmit(e) {
    e.preventDefault();
    if (this.name.invalid) {
      return;
    }
    fetch('http://localhost:3000/api/outofthedatabase', {
      method: 'POST',
      body: JSON.stringify({ search: this.name.value }),
      headers: { 'Content-type': 'application/json' },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.msg) {
          this.matDialog.open(DialogBoxComponent, {
            width: '20rem',
            data: {
              title: 'error',
              content: res.msg,
            },
          });
          return;
        }
        this.data = { ...res };
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
