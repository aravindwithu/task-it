import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../shared/auth.service';
import { FormBuilder, FormControl, Validator, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-task-main',
  templateUrl: './task-main.component.html',
  styleUrls: ['./task-main.component.scss']
})
export class TaskMainComponent implements OnInit {
  @Input() _data:any;
  profile_pic = null;
  docs=[];
  comments=[];

  commentForm:FormGroup = new FormGroup({
    update_txt:new FormControl()
  });

  constructor(
    private afStorage: AngularFireStorage,
    private db: AngularFirestore,
    private fb:FormBuilder, 
    private auth: AuthService
  ) {
    this.commentForm = fb.group({
      update_txt: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.auth.authUserState().then((res) => {
      if(res){
        if(this._data){
          this.set_img(this._data[0].created_by);
          this.get_docs();
          this.get_comments();
        }
      }else{
        // rerout to cover login
      }
    });
  }

  ngOnChanges() {

    this.ngOnInit();
    // You can also use categoryId.previousValue and 
    // categoryId.firstChange for comparing old and new values

  }

  set_img(email){
    // create a reference to the storage bucket location
    console.log('email: ', email);
    let ref = this.afStorage.ref(email);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    ref.getDownloadURL().toPromise().then((imgURL)=>{
      console.log(imgURL);
      this.profile_pic = imgURL;
      //return data;
    }).catch((error)=>{
      console.log(error);
      //return null;
    });
  }

  get_img(){
    return this.profile_pic;
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
      let ref = this.afStorage.ref("tasks/"+ this.data.time_stamp +"/"+event.target.files[0].name);
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
    console.log(post);
    let comment={
      by_email: this.auth.user.email,
      comment: post.update_txt
    }

    this.comments.push(comment);
    console.log(this.comments);
    let tasks_commentsRef = this.db.collection("tasks_comments");
    let comments_data = {
      comment_data:this.comments
    }
    tasks_commentsRef.doc(this.data.time_stamp.toString()).set(comments_data);
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
}
