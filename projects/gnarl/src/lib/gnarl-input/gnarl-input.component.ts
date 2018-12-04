import { Component, 
            OnInit, 
            Input, 
            Output, 
            EventEmitter, 
            ViewEncapsulation, 
            ViewChild, 
            ElementRef  } from "@angular/core"

@Component({
    selector: "ls-gnarl-input",
    templateUrl: "./gnarl-input.component.html",
    styleUrls: ["./gnarl-input.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class GnarlInputComponent implements OnInit {
    
    editingMode: boolean
    @Input() value: number
    @Input() editable: boolean
    @Output() change: EventEmitter<any> = new EventEmitter()
    @ViewChild('box') editInput: ElementRef

    constructor() {}
    ngOnInit() { }

    update(event: number) {
        this.change.emit(event)
        if (this.editable) {
            this.editingMode = false
        }
    }

    startEditing() {
        if (this.editable) {
            this.editingMode = true
            setTimeout(() => {
                this.editInput.nativeElement.focus()
                this.editInput.nativeElement.select()
            }, 100)
        }
    }
}
