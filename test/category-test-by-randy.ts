import { Category } from '../category';
import { Test as t } from './test';
export class CategoryTestByRandy {
    category: Category;
    constructor() {
        console.log('CategoryTestByRandy::constructor()');
        this.category = new Category( 'test-randy-category' );
    }


    test( callback ) {
        console.log('CategoryTestByRandy::test() begins');
        this.category.destroy( () => this.createCategories( () => 
            this.createCategories( () => this.createCategories( () =>
                this.countCategories( () =>
                    this.deleteCategory( callback )
                )
        ))));
    }

    createCategories( callback ) {
        this.category
            .id('three cat: ' + new Date().getTime()).name('My Cat').title('This is my cate')
            .create( s => {
                if ( s ) t.fail('cat category creation failed: ' + s);
                else t.pass('cat category created');
                callback();
            }, e => {
                t.fail('failed on create cat category: ' + e );
                callback();
            });
    }
    countCategories( callback ) {
        this.category.gets( re => {
            let len = Object.keys( re ).length;
            if ( len == 3 ) t.pass('there are 3 categories');
            else t.fail('There should be 3 cateroies');
            callback();
        }, e => {
            t.fail('fail to sync to server:' + e);
            callback();
        });
    }

    deleteCategory( callback ) {
        this.category.gets( re => {
            let len = Object.keys( re ).length;
            if ( len == 3 ) {
                t.pass('there are 3 categories');
                let key = Object.keys( re ).pop();
                this.category.delete( key, s => {
                    if ( s ) t.fail('failed: ' + s);
                    else t.pass('category deleted ');
                    callback();
                }, e => {
                    t.fail('failed to sync: ' + e);
                    callback();
                });
            }
            else {
                t.fail('There should be 3 cateroies');
                callback();
            }
        }, e => {
            t.fail('fail to sync to server:' + e);
            callback();
        });

    }
}