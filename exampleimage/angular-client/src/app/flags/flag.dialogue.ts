import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
    selector: 'my-test-flag-dialog',
    templateUrl: './flags-dialog.html',
})
export class FlagDialog {

    

    constructor(
        public dialogRef: MatDialogRef<FlagDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onCloseClick(): void {
        this.dialogRef.close();
    }

}