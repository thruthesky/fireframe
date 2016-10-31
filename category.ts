/**
 * 
 * 
 * 
 * @attention you can use another name of first-depth-node instead of 'category'
 * @code below sets 'test' as it category name. @see category-test.ts
        this.category = new Category( 'test' );
        this.cateogry.set({...});
 * @endcode
 * 
 * @code
        this.category.id('banana').name('Banana').title('This is Banana').create( () => {}, e => { if ( e ) alert(e); });
 * @endcode
 * @Warning when you create or update a category,
 * 
 *  you will not get the created or updated data
 *  if you call immediately after the create() or update() code
 *  because it is ASYNC call.
 * 
 * @code [ WARNING ] : This will result in success with null.
    let category = new Category();
    category
      .set('id', 'talk')
      .set('name', 'Talk forum')
      .set('title', 'Talk Forum...')
      .create( s => {}, e => console.log( e ) );
    category.get( 'talk', s => {
      console.log('success', s); // Warning this will success with null
    },
    e => {
      console.log('success', e);
    });
 * @endcode
 * 
 * @code
    category
      .set('id', 'help')
      .set('name', 'Site Help')
      .set('title', 'site help forum')
      .set('description', 'This is site help forum')
      .update( x => {
        console.log('category updated');
        }, e => {
          alert( e );
        });
    category.get('help', x => { // Warning this will not get updated data !!
      console.log(x);
    });
 * @endcode
 * 
 * 
 * @code To get the created or updated value, you must get it in success callback !!
 * 
    let category = new Category();
    category
      .set('id', 'gallery')
      .set('name', 'gallery forum')
      .set('title', 'This is Gallery Forum...')
      .create( s => {

        category.get( 'talk', s => {     // this will return the created value
          console.log('success', s);
        },
        e => {
          console.log('success', e);
        });

      }, e => console.log( e ) );
 * @endcode
 * 
 * 
 * @WARNING Do not confused with how objectworks.
 *      The code below will only create cherry due to the three command hold same data.
 * @code
 * 
 
    let category = new Category();
    category.set('id', 'apple').set('name', 'apple').set('title', '123').create( x => {}, e => console.log(e) );
    category.set('id', 'banana').set('name', 'banana').set('title', '234').create( x => {}, e => console.log(e) );
    category.set('id', 'cherry').set('name', 'cherry').set('title', '234').create( x => {}, e => console.log(e) );
    
 * @endcocde
 * 
 * @note To create multiple categories at once
 * 
 * @code
    new Category().set('id', 'apple').set('name', 'apple').set('title', '123').create( x => {}, e => console.log(e) );
    new Category().set('id', 'banana').set('name', 'banana').set('title', '234').create( x => {}, e => console.log(e) );
    new Category().set('id', 'cherry').set('name', 'cherry').set('title', '234').create( x => {}, e => console.log(e) );
    new Category().set('id', 'dragonfruit').set('name', 'dragonfruit').set('title', '567').create( x => {}, e => console.log(e) );
 * @endcode
 * 
 * 
 * @note To access category reference
 * @code
 *      category.ref;
 * @endcocde
 *  
 * @note To remove whole category object
 * @code
 *      category.ref.remove();
 * @endcode
 */
import { Database } from '../fireframe/database';
export interface CATEGORY {
    id: string;
    name: string;
    title: string;
    description: string;
}
export class Category {
    db: Database;
    ref: firebase.database.Reference;
    private data : CATEGORY = <CATEGORY> {};

    constructor( category_name = 'category') {
        this.db = new Database();
        this.db.connect();
        this.ref = this.db.child( category_name );
    }

    set( property: string, value: string ) : Category {
        this.data[ property ] = value;
        return this;
    }
    id( id: string ) { return this.set('id', id); }
    name( name: string ) { return this.set('name', name); }
    title( title: string ) { return this.set('title', title); }
    description( description: string ) { return this.set('description', description); }
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
        let data = this.data;
        let id = data.id;
        this.get( id, x => { // see if category id exists.
            if ( x ) { // if yes, error.
                failureCallback( 'category exists' );
            }
            else {  // if no, create one.
                this.ref
                    .child( this.data.id )
                    //.push()
                    .set( this.data, r => {
                        this.clear();
                        //console.log(r);
                        successCallback( r );
                    } )
                    .then(function() {
                        // Synchronization success
                    })
                    .catch(function(error) {
                        failureCallback('Synchronization failed');
                    });
            }
        });
    }
    /**
     * Update a category.
     * 
     * @return
     *      - If success, successCallback() will be called.
     *      - If the category does not exist, then it returns error through failureCallback()
     * 
     */
    update( successCallback, failureCallback ) {
        let data = this.data;
        let id = data.id;
        this.get( id, x => {
            if ( x ) {
                this.ref
                    .child( id )
                    .update( this.data, r => {
                        this.clear();
                        successCallback();
                    } );
                return this;
            }
            else failureCallback('category does not exist');
        });
    }
    /**
     * Delete a category.
     * 
     * @note When it is deleted, successCallback() will be called.
     *      When it is not deleted, failureCallback() will be called.
     *      When the category does not exist, failreCallback() with error message will be called.
     */
    delete( id: string, successCallback, failureCallback? ) {
        this.get( id, s => {
            if ( s ) {
                this .ref .child( id ) .remove()
                    .then( x => successCallback() )
                    .catch( e => failureCallback( e.message ) );
            }
            else {
                failureCallback( 'category does not exists' );
            }
        }, failureCallback);
    }
    clear() : Category {
        this.data = <CATEGORY> {};
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


}