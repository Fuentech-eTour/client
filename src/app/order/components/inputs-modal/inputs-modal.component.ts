import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface TypeData {
  message: string;
}

@Component({
  selector: 'app-inputs-modal',
  templateUrl: './inputs-modal.component.html',
  styleUrls: ['./inputs-modal.component.scss']
})
export class InputsModalComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InputsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TypeData,
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      telefono: ['', Validators.required],
      confirm: ['OK', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
