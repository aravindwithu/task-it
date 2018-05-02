import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../shared/auth.service';

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

  constructor(
    private afStorage: AngularFireStorage,
    private db: AngularFirestore,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.authUserState().then((res) => {
      if(res){
        if(this._data){
          this.set_img(this._data[0].created_by);
          this.get_docs();
        }
      }else{
        // rerout to cover login
      }
    });

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

  set_comments(){
    let comment={
      by_email: this.auth.user.email,
      comment:"test 1"
    }

    this.comments.push(comment);
    let tasks_docsRef = this.db.collection("tasks_comments");
    let comments_data = {
      comment_data:this.comments
    }
    tasks_docsRef.doc(this.data.time_stamp.toString()).set(comments_data);
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
