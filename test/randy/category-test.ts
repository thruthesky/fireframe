import { Test as t } from '../test';
import { Post, PostData } from '../../post';
import { Category, CategoryData } from '../../category';
//import * as firebase from 'firebase';
//import { Database } from '../fireframe/database';
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
            () => this.testSets(
                () =>  this.createTest(          
                    () => this.createSameCategoryTest( 
                       () => this.testgets(
                           () => this.testget(
                               () => this.testDelete(callback)
                            )
                        )
                    )
                ) 
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
                callback();
            },
            e=>{
                t.fail("fail on creating new category::"+ e);
                callback();
          });
    }

    testgets(callback){
        this. category.destroy();    
        this.category.id("One").name("Two").title("Three")
           .create( s => {                    
                if ( s ) t.fail('Test gets() :: fail to create a category: ' + s );           
                else { t.pass("Success on creating category")   
                    this.category.gets( x =>{
                    if( x ){
                        if( x.One.name === "Two" && x.One.title === "Three") t.pass("Test gets() :: get the correct data");
                        else t.fail ("Fail test gets()::should get the correct data");
                        callback();
                    }
                    else {
                        t.fail("Fail test gets():: Should get the created data instead, it returns null");
                        callback();
                    }    
             });
                }                        
            }, e => {
                t.fail("Error creating category :: "+ e )  
                callback();        
            });   
    }



    testDelete(callback){
      
        this.category.destroy();    
        this.category.id("Del").name("Delete").title("Deleting test")
          .create( s => {                    
                if ( s ){  t.fail("fail creating del category " )}
                else{
                    t.pass('Test delete() :: Success on creating del  category: ');  
                    this.category.delete("Del",s=> {
                         t.pass('Test delete() :: Success on deleting del  category: ');  
                          callback(); 
                    },e=>{
                        t.fail("Test delete() :: fail deleting del category" );
                         callback(); 
                    }); 
                     
                }                                  
            }, e => {
                t.fail("Test delete() fail:: del category not created : "+ e )   
                 callback();        
            });   
    }
    
    testget(callback){
        this. category.destroy();    
        this.category.id("Two").name("Four").title("Six")
           .create( s => {                    
                if ( s ) t.fail('Test gets() :: fail to create a category: ' + s );           
                else { t.pass("Success on creating category")   
                    this.category.get( "Two", 
                    s =>{ 
                          if(s){
                              if(s.name === "Four") {
                                 t.pass("Test get() :: success on getting correct data"); 
                                 callback();
                              }
                               
                          }else{
                              t.fail("Test get():: should return object instead, but it returns "+ s);
                              callback();
                          }                                             
                    },
                    e =>{
                        t.fail("Test get():: fail to get data on server")
                         callback(); 
                    });                           
                }                        
            }, e => {
                t.fail("Error creating category :: "+ e )   
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
