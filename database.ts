/**
 * 
 * 
 */
import * as firebase from 'firebase';


export class Database {

  private static __db: firebase.database.Database = null;

  constructor() {
    console.log('Hello Xfirebase Provider');
  }
  connect() {
    if ( this.db ) return;
    let config = {
      apiKey: "AIzaSyCKGAejpeOxxSHELi_Xbo2UdRa8xQPmipU",
      authDomain: "test-ec3e3.firebaseapp.com",
      databaseURL: "https://test-ec3e3.firebaseio.com",
      storageBucket: "test-ec3e3.appspot.com",
      messagingSenderId: "55749236444"
    };
    firebase.initializeApp(config);
    this.db = firebase.database();
    
    /*
    let ref = this.db.ref("/");
    let flower = ref.child('flower');
    flower.push().set({
        name: 'mindle',
        color: 'yellow'
    });
    */
  }
  get db() : firebase.database.Database {
    return Database.__db;
  }
  set db( databaseObject ) {
    Database.__db = databaseObject;
  }



/**
 * Returns of the child reference.
 * This is just an alias of firebase child().
 * 
 * @use collection() instead of child() to have a clear understanding of 
 * 
 * @note don't make too much encapsulation. It will make your life hard.
 * @note Think of child() as collection.
 * @code
 *    db.child('abc');
 *    db.child('animal');
 * @endcode
 * 
 * @code how to push and set data.
 * 
    let db = new Database();
    db.connect();
    let posts = db.child('posts');
    posts .push() .set( {
      'title' : 'Hello World !',
      'content': 'This is the first hello world'
    });

 * @endcode
 */
  child( name: string ) : firebase.database.Reference {
    return this.db.ref('/').child(name);
  }
  

  /**
   * user node structure
   * 
   * 
   */
  register() {}
  updateUser() {}
  resign() {}
  deleteUser() {}
  login() {}
  logout() {}
  getUser() {}
  getUsers() {}
  

  createPost() {}
  updatePost() {}
  deletePost() {}
  getPost() {}
  getPosts() {}

  createComment() {}
  updateComment() {}
  deleteComment() {}
  getComment() {}
  getComments() {}

  uploadFile() {}
  updateFile() {}
  deleteFile() {}
  getFile() {}
  getFiles() {}



  // SNS login. optionanl...
  loginFacebook() {}
  loginGooglePlug() {}
  loginTwitter() {}
  loginGithub() {}

}
