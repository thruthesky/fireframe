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
import { Database } from './database';
export interface CategoryData {
    id: string;
    name: string;
    title: string;
    description: string;
}
export let categoryData = {
    id: '',
    name: '',
    title: '',
    description: ''
  };
export class Category extends Database {

    constructor( category_name = 'category') {
        super();
        this.ref = this.child( category_name );
    }

    id( id: string ) { return this.set('id', id); }
    name( name: string ) { return this.set('name', name); }
    title( title: string ) { return this.set('title', title); }
    description( description: string ) { return this.set('description', description); }
}