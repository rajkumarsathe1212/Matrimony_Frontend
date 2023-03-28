import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-businessplans',
  templateUrl: './businessplans.component.html',
  styleUrls: ['./businessplans.component.css']
})

export class BusinessplansComponent implements OnInit{

  formdata:any;
  datas:any = "";
  id = "";
  businesses:any;
  businessid :any

  constructor(private api:ApiService, private route :ActivatedRoute){
    this.businessid = this.route.snapshot.paramMap.get('businessid');
    // console.log(this.businessid);

  }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.id = "";

    this.api.get("businesses").subscribe((result:any)=>{
      // console.log(result.data);
      if(result.status == "success")
      this.businesses = result.data;


    })

    this.api.get("businessplans/" + this.businessid).subscribe((result:any)=>{
      // console.log(result.data);
      if(result.status == "success")
      this.datas = result.data;
    })

    this.formdata = new FormGroup({
      planname : new FormControl("",Validators.compose([Validators.required])),
      businessid : new FormControl(this.businessid),
      amount:new FormControl("",Validators.compose([Validators.required])),
      duration:new FormControl(""),
      profileviews:new FormControl("",Validators.compose([Validators.required]))
    })

  }


  reset(){
    this.load();
  }

  businessChanged(event:any){
    let ctrl = <HTMLSelectElement>(event.target)
    console.log(ctrl.value);

    this.formdata.patchValue({
      businessid : ctrl.value
    })
  }

  edit(id:any){
    this.id = id;
    this.api.get("businessplans/" +this.businessid+ "/" + id).subscribe((result:any)=>{
      console.log(result);

      this.formdata.patchValue({
        businessid:result.data.businessid,
        planname : result.data.planname,
        amount: result.data.amount,
        duration:result.data.duration,
        profileviews:result.data.profileviews
      })
    })
  }


  delete(_id:any){

    Swal.fire({
      title:"Sure to delete",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      timer: 3500,
      timerProgressBar: true,
      showCancelButton: true,
      confirmButtonText: "Yes , delete it!",
      cancelButtonText: "No,Keep It!"
    }).then((result) => {
      if(result.value){

        this.api.delete("businessplans/" + _id).subscribe((result:any)=>{
          this.load();
        })

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: 'Deleted successfully'
        })
      }
    })

  }


  submit(data:any){
    if(this.id == ""){
      this.api.post("businessplans" ,data).subscribe((result:any)=>{
        this.load();

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          // didOpen: (toast) => {
          //   toast.addEventListener('mouseenter', Swal.stopTimer)
          //   toast.addEventListener('mouseleave', Swal.resumeTimer)
          // }
        })
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })
      })
    }
    else{
      this.api.put("businessplans/" + this.id,data).subscribe((result:any)=>{
        this.load();
      })
    }

  }

}
