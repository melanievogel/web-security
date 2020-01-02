import {MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatToolbarModule, MatCardModule, MatListModule, MatFormFieldModule, MatInputModule, MatBadgeModule, MatDialogModule, MatOptionModule, MatSelectModule, MatGridListModule, MatPaginatorModule} from '@angular/material';
import { NgModule} from '@angular/core';

@NgModule({
  imports: [MatInputModule, MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatToolbarModule, MatCardModule, MatListModule, MatFormFieldModule, MatBadgeModule, MatDialogModule, MatOptionModule, MatSelectModule, MatGridListModule, MatPaginatorModule],
  exports: [MatInputModule, MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatToolbarModule, MatCardModule, MatListModule,MatFormFieldModule, MatBadgeModule, MatDialogModule, MatOptionModule, MatSelectModule, MatGridListModule, MatPaginatorModule],
})
export class ImportMaterialModule { }