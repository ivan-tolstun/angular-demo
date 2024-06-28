import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core'
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainLayoutComponent implements OnInit {

    constructor() {}

    ngOnInit(): void {
    }

}
