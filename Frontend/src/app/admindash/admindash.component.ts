import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
  
export class AdmindashComponent implements OnInit {


  list: any = [{
    Name: "meera",
    Email: "mera@gmail.com",
    Phone: "123545",
    Address: "hhhhh",
    HighestQualification: "btech",
    CurrentCompanyName: "ict",
    Skillset: "angular",
    approved: true
  },{
    Name: "meera",
    Email: "mera@gmail.com",
    Phone: "123545",
    Address: "hhhhh",
    HighestQualification: "btech",
    CurrentCompanyName: "ict",
    Skillset: "angular",
    approved: false
  },{
    Name: "meera",
    Email: "mera@gmail.com",
    Phone: "123545",
    Address: "hhhhh",
    HighestQualification: "btech",
    CurrentCompanyName: "ict",
    Skillset: "angular",
    approved: false
  },{
    Name: "meera",
    Email: "mera@gmail.com",
    Phone: "123545",
    Address: "hhhhh",
    HighestQualification: "btech",
    CurrentCompanyName: "ict",
    Skillset: "angular",
    approved: true
  }];

 

  constructor() { }

  ngOnInit(): void {
    

    }

  }

