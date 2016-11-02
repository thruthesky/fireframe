import { Test as t } from './test';
import { Post, PostData } from '../post';
import { Category } from '../category';
import * as firebase from 'firebase';
import { Database } from '../fireframe/database';
export class CategoryTest {
    post: Post; // Post instance with temporary post path.
    posts: Array<PostData>;
    category: Category;

   constructor() {
         
        this.post = new Post( 'post-test', 'category-test' );
        this.category = new Category( 'category-test' );
    }


    test( callback ) {
        this.category.destroy(          
             x=> this.createTest(          
               x=> callback()                        
             )
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
                   this.createSameCategoryTest(callback);              
            },
            e=>{
                t.fail("fail on creating new category::"+ e);
                callback();
          });
    }
}
