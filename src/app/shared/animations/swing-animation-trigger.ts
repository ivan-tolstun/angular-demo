import {animate, keyframes, state, style, transition, trigger} from "@angular/animations"

export const swingInTop = (interval: number = 800) => trigger('swingInTop', [
    state('void', style({
    })),
    transition('void => *', animate(`${interval}ms ease-out`, keyframes([
        style({transform: 'rotateX(-100deg)', transformOrigin: 'top', opacity: 0, offset: 0}),
        style({transform: 'rotateX(-30deg)', transformOrigin: 'top', opacity: 0.8, offset: 0.4}),
        style({transform: 'rotateX(0deg)', transformOrigin: 'top', opacity: 1, offset: 1})
    ])))
])
