import { Component,OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { FileserviceService } from '../shared/fileservice.service';
@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
constructor(private fileService:FileserviceService){}

shortLink:string=""
loading:boolean=false
file!:File

  ngOnInit(): void {
  }
  onChange(event:any){
    this.file=event.target.files[0]
  }
  
  onLoading(){
    this.loading =!this.loading
    console.log(this.file)
    if(this.file.type=='image/png'||'image/jpg' && this.file.size<6000){
      this.fileService.upload(this.file).subscribe((event:any)=>{
        if(typeof (event)==='object'){
          this.shortLink=event.link;
          this.loading=false
        }
      })
    }
    else{
      if(this.file.size>6000){
        alert("File Size should be less than 5MB")
      }
      else{
        alert("Only png/jpg files are allowed")
      }
     
    }
   
  }

}
