import { Component, 
            OnInit, 
            Input, 
            Output, 
            EventEmitter, 
            ViewEncapsulation, 
            ViewChild, 
            ElementRef  } from "@angular/core"
import * as _ from 'lodash';

@Component({
    selector: "ls-gnarl-input",
    templateUrl: "./gnarl-input.component.html",
    styleUrls: ["./gnarl-input.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class GnarlInputComponent implements OnInit {
    
    editingMode: boolean
    value: string
    invalid: boolean
    @Input() editable: boolean
    @Input() validInputs: string[]
    @Output() inputValueChange: EventEmitter<any> = new EventEmitter()
    @Output() inputValueEnter: EventEmitter<any> = new EventEmitter()
    @Output() invalidValueEnterd: EventEmitter<any> = new EventEmitter()
    @ViewChild('box') editInput: ElementRef

    constructor() {}
    ngOnInit() { }

    @Input()
    get inputValue() {
        return this.value
    }

    set inputValue(value: string) {
        this.value = value
        this.inputValueChange.emit(value)
    }

    onBlur(event: any) {
        this.inputValueEnter.emit(event)
        if (_.includes(this.validInputs, event.target.value)) {
            this.invalid = false
            this.inputValue = event.target.value
            if (this.editable) {
                this.editingMode = false
            }
        } else {
            this.invalidValueEnterd.emit()
            this.editInput.nativeElement.focus()
            this.invalid = true
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
