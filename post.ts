/**
 * @see test/post-test.ts for test and sample codes.
 */
import { Database } from './database';
import { Category } from './category';
export interface PostData {
    key?: string;
    category_id: string;
    user_id: string;
    password: string;
    title: string;
    content: string;
    created: number;
    updated: number;
    email: string;
    name: string;
    like: number;
    dislike: number;
    no_of_comments: number;
    no_of_files: number;
}
export class Post {
    private db: Database;
    private category: Category;
    private ref: firebase.database.Reference;
    private data: PostData = <PostData> {};

    /**
     * 
     * @code How to use Post class with islated storage path. If you do this, the storage pash is separated from others.
     *      ; 아래와 같이 하면 독립된 Post class 공간을 생성해서 사용 할 수 있다.
     *      ; 이렇게 하면 다른 storage path 와 분리되므로 관리가 편해 질 수 있다.
     *      ; 단, 카테고리는 생성을 해야 한다.
     *     question: Post = new Post( 'questions' )
     * @endcode
     * 
     * @code 테스트를 위해서 임의의 경로를 지정 할 수 있다. 이렇게 하면 실제 데이터를 건드리지 않는다.
     *      To test, you can input temporary path. If so, real data will not be changed.
        this.post = new Post( 'post-test', 'category-test' );
     * @endcode
     * 
     */
    constructor( post_path = 'post', category_path = 'category' ) {
        this.db = new Database();
        this.category = new Category( category_path );
        this.ref = this.db.child( post_path );
    }

    set( property: string, value: string ) : Post {
        this.data[ property ] = value;
        return this;
    }

    key( key: string ) { return this.set('key', key); }
    category_id( category_id: string ) { return this.set('category_id', category_id); }
    user_id( user_id: string ) { return this.set('user_id', user_id); }
    password( password: string ) { return this.set('password', password); }
    title( title: string ) { return this.set('title', title); }
    content( content: string ) { return this.set('content', content); }
    name( name: string ) { return this.set('name', name); }
    email( email: string ) { return this.set('email', email); }

    clear() {
        this.data = <PostData> {};
    }

    /**
     * create a post
     */
    create( successCallback, failureCallback ) {
        if ( this.data.title === void 0 ) return failureCallback('input title');
        if ( this.data.category_id === void 0 ) return failureCallback('input category_id');

        this.category.get( this.data.category_id, s => { // check category
            if ( s == null ) return failureCallback('wrong category');

            // @todo check user

            this .ref .push() .set( this.data, re => { // create a post
                if ( re ) return failureCallback( re.message );
                this.clear();
                successCallback( re );
            } )
            .then( () => { })
            .catch( e => {
                failureCallback('Synchronization failed');
            });
        });
    }

    update( successCallback, failureCallback ) {
        if ( this.data.key === void 0 ) return failureCallback('input key');
        //if ( this.data.category_id === void 0 ) return failureCallback('input category_id');
        //if ( this.data.title === void 0 ) return failureCallback('input title');
        let key = this.data.key;
        delete this.data.key;
        this.get( key, x => {
            if ( x == null ) return failureCallback('post does not exists');
            this .ref .child( key ) .update( this.data, re => {
                successCallback();
            })
            .catch(e  => failureCallback( e.message ) );
        });
    }
    
    /**
     * Delete a category.
     * 
     * @note When it is deleted, successCallback() will be called.
     *      When it is not deleted, failureCallback() will be called.
     *      When the post does not exist, failreCallback() with error message will be called.
     */
    delete( key: string, successCallback, failureCallback? ) {
        this.get( key, s => {
            if ( s ) {
                this .ref .child( key ) .remove()
                    .then( x => successCallback() )
                    .catch( e => failureCallback( e.message ) );
            }
            else {
                if ( failureCallback ) failureCallback( 'post does not exists' );
            }
        }, failureCallback );
    }

    get(id, successCallback, failureCallback?) {
        this.ref.child(id).once( 'value', snapshot => {
            if ( snapshot.exists() ) successCallback( snapshot.val() );
            else successCallback( null );
        }, failureCallback );
    }

    gets( successCallback, failureCallback? ) {
        this.ref.once( 'value', snapshot => {
            if ( snapshot.exists() ) successCallback( snapshot.val() );
            else successCallback( null );
        }, failureCallback );
    }

    /**
     * Removes the complete location
     */
    destroy( callback? ) {
        this.ref.remove( callback );
    }
}