import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation  } from "@angular/core";

@Component({
    selector: "ls-gnarl-input",
    templateUrl: "./gnarl-input.component.html",
    styleUrls: ["./gnarl-input.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class GnarlInputComponent implements OnInit {
    constructor() {}

    @Input() value: number;
    @Output() change: EventEmitter<any> = new EventEmitter()
    ngOnInit() {
    }

    update(event: number) {
        this.change.emit(event);
    }
}
