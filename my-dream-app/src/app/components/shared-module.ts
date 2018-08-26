import { NgModule } from '@angular/core';
import { SpinnerComponent } from './spinner/spinner.component';
import { IconComponent } from './icon/icon.component';

@NgModule({
    imports: [ ],
    declarations: [
        SpinnerComponent,
        IconComponent
    ],
    exports: [
        SpinnerComponent,
        IconComponent
    ]
})
export class SharedModule {}