import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validator, FormGroup, Validators} from '@angular/forms'


@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.scss']
})
export class AskComponent implements OnInit {

  askForm:FormGroup;

  constructor(
    private fb:FormBuilder
  ) { 
    this.askForm = fb.group({
      'category': [null, Validators.required],
      'ask_to' : [null, Validators.required],
      'subject' : [null, Validators.required],
      'discription' : [null, Validators.required]
    });
  }

  ngOnInit() {
  }

}
