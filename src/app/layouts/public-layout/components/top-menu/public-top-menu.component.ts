import {OverlayPanel} from 'primeng/overlaypanel'
import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from "@angular/core"
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'portal-public-top-menu',
    templateUrl: './public-top-menu.component.html',
    styleUrls: ['./public-top-menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PublicTopMenuComponent implements OnInit {

    constructor(private readonly router: Router,
                private readonly route: ActivatedRoute) {}

    ngOnInit() {
    }

    protected selectLanguage(language: string) {
    }

    protected toLogin() {
        this.router.navigate(['login'], {relativeTo:this.route});
    }

    protected toAbout() {
        this.router.navigate(['about'], {relativeTo:this.route});
    }
}
