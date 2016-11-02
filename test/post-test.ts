import { Test as t } from './test';
import { Post, PostData } from '../post';
import { Category } from '../category';
export class PostTest {
    post: Post; // Post instance with temporary post path.
    posts: Array<PostData>;
    category: Category;

    constructor() {
        this.post = new Post( 'post-test', 'category-test' );
        this.category = new Category( 'category-test' );
    }


    test( callback ) {
        console.log("PostTest::test()");
        this.removeTest( x =>
            this.createTest( x =>
                this.updateTest( x =>
                    this.deleteTest( x =>
                        callback()
                    )
                )
            )
        )
    }


    removeTest( callback ) {
        console.log('PostTest::removeTest()');
        this.post.destroy( () => {
            this.category.destroy( callback );
        });
    }
    createTest( callback ) {
        console.log('PostTest::createTest()');
        this.emptySubject( x =>
            this.inputTitleOnly( x =>
                this.inputWrongCategory( x =>
                    this.createCategory( x =>
                        this.createPost( x => this.createPost( x => ( this.createPost ( x => 
                                this.countPost( callback )
                        ) ) )
                        )
                    )
                )
            )
        )
    }
    emptySubject( callback ) {
        console.log("PostTest::emptySubject()");
        this.post.create( () => console.log('FAIL : it must be an error'), e => {
            if ( e == 'input title' ) {
                t.pass('input title');
                callback();
            }
            else t.fail('FAIL : something happened. error message must be "input title"');
        });
    }
    inputTitleOnly ( callback ) {
        console.log("PostTest::inputTitleOnly()");
        this.post.title('title only').create( () => console.log('FAIL : it must be input category_id error'), e => {
            if ( e == 'input category_id' ) {
                t.pass('PASS : input category_id');
                callback();
            }
            else t.fail('FAIL : something happened. error message must be "input category_id"');
        });
    }
    inputWrongCategory( callback ) {
        console.log("PostTest::inputCategoryWithSubject()");
        this.post
            .category_id('wrong-category-id')
            .title('This is first post')
            .create( s => t.fail('it must be wrong category error'), e => {
                if ( e == 'wrong category' ) {
                    t.pass('wrong category');
                    callback();
                }
                else t.fail('unknown error : ' + e);
            });
    }
    createCategory( callback ) {
        this.category.id('qna').name('QnA')
            .create( s => t.check('createCategory', s, callback ),
                e => t.fail('PostTest::createCategory() => ' + e) );
    }
    createPost( callback ) {
        this.post
            .category_id('qna')
            .title("QnA : title : " + new Date().getTime() )
            .create( s => t.check('createPost', s, callback ) , e => t.fail('post create : ' + e ) );
    }
    countPost( callback ) {
        this.post.gets( re => {
            //console.log( 'countPost: data : ', re );
            let len = Object.keys(re).length;
            if ( len == 3 ) t.pass('countPost : ' + len );
            else t.fail('countPost : ' + len );
            callback();
        });
    }
    updateTest( callback ) {
        this.post.gets( re => {
            let len = Object.keys( re ).length;
            if ( len == 0 ) {
                t.fail('No posts');
                return callback();
            }

            let key = Object.keys( re ).pop();
            let post: PostData = re[ key ];
            // console.log('post: ', post);
            post.title = post.title + ' - edited';

            this.post
                .key( key )
                .title( post.title )
                .update( s => {
                    if ( s ) {
                        t.fail('update error: ' + s );
                        return callback();
                    }
                    this.post.get( key, s => {
                        if ( s == null ) t.fail('post does not exist after update');
                        else t.pass('updateTest');
                        return callback();
                    } );
                }, e => t.fail('failed to update post : ' + e));
        });
    }
    deleteTest( callback ) {
        this.post.gets( re => {
            if ( re ) {
                let key = Object.keys( re ).reverse().pop();
                this.post.delete( key, s => t.pass('delete success', callback), () => t.fail('delete failed', callback));
            }
            else {
                t.fail('post does not exists');
                callback();
            }
        });
    }
}
