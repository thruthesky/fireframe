/**
 * 
 * 
 */
import * as firebase from 'firebase';


export class Database {

  private static __connect: boolean = false;
  private static __db: firebase.database.Database = null;

  constructor() {
    this.connect();
  }
  /**
   * Connects to firebase.
   * 
   * @note it only connects one time.
   */
  connect() {
    if ( Database.__connect ) {
      console.log("Database connection already maid...");
      return;
    }
    Database.__connect = true;
    let config = {
      apiKey: "AIzaSyDgVNWHWVRogTbKvTftNoNv7cSmtFaAfz0",
    authDomain: "fir-app-f2d67.firebaseapp.com",
    databaseURL: "https://fir-app-f2d67.firebaseio.com",
    storageBucket: "fir-app-f2d67.appspot.com",
    messagingSenderId: "552188619868"
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
