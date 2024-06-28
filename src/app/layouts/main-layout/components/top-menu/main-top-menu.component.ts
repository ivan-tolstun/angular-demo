import {Component, OnInit, ViewChild} from '@angular/core'
import {MessageService} from 'primeng/api'

@Component({
    selector: 'app-main-top-menu',
    templateUrl: './main-top-menu.component.html',
    styleUrls: ['./main-top-menu.component.scss'],
    providers: [MessageService]
})
export class MainTopMenuComponent implements OnInit {

    constructor() {}

    ngOnInit(): void {
    }

}
