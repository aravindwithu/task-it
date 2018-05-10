import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../shared/auth.service';
import { FormBuilder, FormControl, Validator, FormGroup, Validators} from '@angular/forms'
import {Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-task-main',
  templateUrl: './task-main.component.html',
  styleUrls: ['./task-main.component.scss']
})
export class TaskMainComponent implements OnInit {
  @Input() _data:any;
  profile_pic = null;
  task_pic = null;
  docs=[];
  comments=[];

  commentForm:FormGroup = new FormGroup({
    update_txt:new FormControl()
  });

  constructor(
    private afStorage: AngularFireStorage,
    private db: AngularFirestore,
    private fb:FormBuilder, 
    private auth: AuthService,
    private router:Router
  ) {
    this.commentForm = fb.group({
      update_txt: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.auth.authUserState().then((res) => {
      if(res){
        if(this._data && this._data[0]){
          this.set_img(this._data[0].created_by).then((res)=>{
            if(res){
              this.task_pic=res;
            }
          });
          this.set_img(this.auth.user.email).then((res)=>{
            if(res){
              this.profile_pic=res;
            }
          });
          this.get_docs();
          this.get_comments();
        }
      }else{
        this.router.navigate(['/cover']);
      }
    });
  }

  ngOnChanges() {
    this.profile_pic = null;
    this.task_pic = null;
    this.docs=[];
    this.comments=[];
    this.ngOnInit();
  }

  set_img(email){
    var promise = new Promise((res)=>{
      // create a reference to the storage bucket location
      let ref = this.afStorage.ref('profiles/'+email);
      // the put method creates an AngularFireUploadTask
      // and kicks off the upload
      ref.getDownloadURL().toPromise().then((imgURL)=>{
        res(imgURL);
        //return data;
      }).catch((error)=>{
        console.log(error);
        return res(null);
        //return null;
      });
    });
    return promise;
  }

  get_task_img(){
    if(this.task_pic){
      return this.task_pic;
    }
    return '../assets/user-default.png';
  }

  get_profile_img(){
    if(this.profile_pic){
      return this.profile_pic;
    }
    return '../assets/user-default.png';
  }

  set data(dataIn){
    this._data[0] = dataIn;
  }

  get data(){
    return this._data[0];
  }

  upload(event){
    if (event.target.files && event.target.files[0]) {
      // create a reference to the storage bucket location
      let ref = this.afStorage.ref("tasks/"+ this.data.time_stamp.toString() +"/"+event.target.files[0].name);
      // the put method creates an AngularFireUploadTask
      // and kicks off the upload
      let task = ref.put(event.target.files[0]).then((doc_data)=>{
        let doc={
          name:event.target.files[0].name,
          url:doc_data.downloadURL
        }
        this.docs.push(doc);
        let tasks_docsRef = this.db.collection("tasks_docs");
        let docs_data = {
          doc_meta:this.docs
        }
        tasks_docsRef.doc(this.data.time_stamp.toString()).set(docs_data);
      });
      //alert("image uploaded successfully");
    }
  }

  set_comments(post){
    let comment={
      by_email: this.auth.user.email,
      by_imgURL: this.profile_pic,
      comment: post.update_txt
    }

    this.comments.push(comment);
    let tasks_commentsRef = this.db.collection("tasks_comments");
    let comments_data = {
      comment_data:this.comments
    }
    tasks_commentsRef.doc(this.data.time_stamp.toString()).set(comments_data);
    this.commentForm.setValue({
      update_txt:null
    }); 
  }

  get_comments(){
    let tasks_commentsRef = this.db.collection("tasks_comments").doc(this.data.time_stamp.toString());
    let tasks_commentsRef$ = tasks_commentsRef.valueChanges();
    tasks_commentsRef$.subscribe((res) => {
      if(res){
        this.comments = res["comment_data"];
      }else{
        console.log("No comments data found");
      }
    });
  }

  get_docs(){
    let tasks_docsRef = this.db.collection("tasks_docs").doc(this.data.time_stamp.toString());
    let tasks_docsRef$ = tasks_docsRef.valueChanges();
    tasks_docsRef$.subscribe((res) => {
      if(res){
        this.docs = res["doc_meta"];
      }else{
        console.log("No docs data found");
      }
    });
  }

  routUpdate(){
    this.router.navigate(['/task-update',this.data.time_stamp.toString()]);
  }

  deleteTask(){
    for (let doc of this.docs) {
      let file_path = "tasks/"+ this.data.time_stamp.toString()+"/"+doc.name;
      console.log(file_path);
      let ref = this.afStorage.ref(file_path);
      ref.delete();
    }
  
    let tasks_docsRef = this.db.collection("tasks_docs").doc(this.data.time_stamp.toString());
    tasks_docsRef.delete()
    .then(() => {

    })
    .catch(error => console.log(error));

    let tasks_commentsRef = this.db.collection("tasks_comments").doc(this.data.time_stamp.toString());
    tasks_commentsRef.delete()
    .then(() => {
    })
    .catch(error => console.log(error));

    let tasksRef = this.db.collection("tasks")
    .doc(this.data.time_stamp.toString());
    tasksRef.delete()
    .then(() => {
    this.router.navigate(['/home']);
    })
    .catch(error => console.log(error));
  }
}
