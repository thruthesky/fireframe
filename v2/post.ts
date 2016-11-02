/**
 * 
 * 
 */
import { Database } from './database';
export class Post extends Database {

    constructor( path = 'post') {
        super();
        this.ref = this.child( path );
    }
    create( successCallback, failureCallback ) {
        this.set('key', this.ref.push().key);
        return super.create( successCallback, failureCallback );
    }
}