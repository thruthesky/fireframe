import { Test as t } from '../test';
import { Post, PostData } from '../../post';
import { Category, CategoryData } from '../../category';
import * as firebase from 'firebase';
import { Database } from '../fireframe/database';
export class CategoryRandyTest {
    post: Post; // Post instance with temporary post path.
    posts: Array<PostData>;
    category: Category;


    path_category: string = 'test-randy-category';
    path_post: string = 'test-randy-post';

   constructor() {
        this.post = new Post( this.path_post, this.path_category );
        this.category = new Category( this.path_category );
    }


    test( callback ) {
        this.category.destroy(
            () => this.testSets( () =>
                this.createTest(          
                 x => this.createSameCategoryTest( callback )
             ) )
         );
    }

    createSameCategoryTest(callback){
         console.log("Test :: Creating same Category");
          this.category.id("Hero").name("Marvels").title("Avengers")
            .create(s=>{            
                t.fail("Success creating same category: server says" + s);
                callback();
            },
            e=>{
                t.pass("Not able to create same category::"+ e);
                callback();
            });
    }


    createTest(callback){
        console.log("Test :: Creating new Category");
        this.category.id("Hero").name("Marvels").title("Avengers")
           .create(s=>{            
                t.pass("Success creating new category:");              
                callback();
            },
            e=>{
                t.fail("fail on creating new category::"+ e);
                callback();
          });
    }

    testSets( callback ) {

        let id = 'cat: ' + new Date().getTime();
        this.category.sets( <CategoryData> { id: id, name: 'Cat name' } );
        if ( this.category.getData().id == id ) t.pass('cat added');
        else t.fail('cat did not add');

        this.category.create( s => {
            if ( s ) t.fail('testSets() fail to create a category : ' + s );
            else t.pass('testSets()');
            if ( this.category.getData().id === void 0 ) t.pass('data cleared');
            else t.fail('data not cleared');
            callback();
        }, e => {
            t.fail('testSets() fail to create : ' + e );
            if ( this.category.getData().id === void 0 ) t.pass('data cleared');
            else t.fail('data not cleared');
            callback();
        } );

    }
}
