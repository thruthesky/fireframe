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

    /**
     * 
     * @code create a new category
     * 
        let category = new Category();
        category
        .set('id', 'help')
        .set('name', 'Help')
        .set('title', 'help forum')
        .set('description', 'This is help forum')
        .create( s => { // success
        }, e => { // error
            alert( e );
        });
        
     * @endcode
     */
    create( successCallback, failureCallback ) {
        if ( this.data.key === void 0 ) return failureCallback('input key');
        let data = this.data;
        let key = data.key;
        delete data.key;
        this.get( key, x => { // see if key exists.
            if ( x ) { // if yes, error.
                failureCallback( 'key exists' );
            }
            else {  // if no, create one.
                this.ref
                    .child( key )
                    .set( this.data, r => {
                        this.clear();
                        if ( r ) failureCallback( r );
                        else successCallback( r );
                    })
                    .catch(function(error) {
                        this.clear();
                        failureCallback('Synchronization failed');
                    });
            }
        });
    }

    clear() {
        this.data = {};
        return this;
    }

    /**
     * 
     * Returns value of the category through successCallback's parameta
     * 
     * @Warning null will be delivered to successCallback when snapshot values does not exists.
     *  which means, even if there is no node in db, it will still success with null.
     * 
     * @code get a category value
            let category = new Category();
            category.get('qna', x => {
            console.log(x);
            });
     * @endcode
     */
    get(id, successCallback, failureCallback?) {
        this.ref.child(id).once( 'value', snapshot => {
            if ( snapshot.exists() ) successCallback( snapshot.val() );
            else successCallback( null );
        }, failureCallback );
    }
    /**
     * Returns whole objects of category.
     * @note there is no sorting and filtering.
     * 
     * @code
        category.gets( x => console.log(x) );
     * @endcode
     * 
     */
    gets( successCallback, failureCallback? ) {
        this.ref.once( 'value', snapshot => {
            if ( snapshot.exists() ) successCallback( snapshot.val() );
            else successCallback( null );
        }, failureCallback );
    }

    /**
     * Removes the whole category storage
     */
    destroy( callback? ) {
        this.ref.remove( callback );
    }

}
