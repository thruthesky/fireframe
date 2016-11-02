/**
 * @version 2
 * 
 */
import * as firebase from 'firebase';


export class Database {

  ref: firebase.database.Reference;
  private static __connect: boolean = false;
  private static __db: firebase.database.Database = null;
  data;

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
      apiKey: "AIzaSyCKGAejpeOxxSHELi_Xbo2UdRa8xQPmipU",
      authDomain: "test-ec3e3.firebaseapp.com",
      databaseURL: "https://test-ec3e3.firebaseio.com",
      storageBucket: "test-ec3e3.appspot.com",
      messagingSenderId: "55749236444"
    };
    firebase.initializeApp(config);
    this.db = firebase.database();
    
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

    set( property: string, value: string ) {
        this.data[ property ] = value;
        return this;
    }

    sets( data ) {
        this.data = data;
        return this;
    }
}
