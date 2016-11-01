import { Test as t } from './test';
import { Category, CategoryData } from '../category';
export class CategoryTest {
    category: Category; // Category instance with temporary category location path.
    categories: Array<CategoryData>;
    constructor() {
        this.category = new Category( 'test' );
    }

    test( callback ) {
        this.addTwoCategory(
            x => this.updateCategory(
                x => this.removeOneCategory(
                    x => this.addOneCategory(
                        () => this.category.ref.remove( callback )
                    )
                )
            )
        );
    }

    addTwoCategory( callback ) {
        this.category.ref.remove( e => {
            if ( e ) return t.fail("removing category");
            this.category
                .set('id', 'alpha')
                .set('name', 'Alpha version')
                .create( x => {
                this.category
                    .set('id', 'beta')
                    .set('name', 'Beta Doc')
                    .create( x => {
                        this.category.gets( x => {
                            let len = Object.keys(x).length;
                            console.log("x.length: " + len, x)
                            if ( len == 2 ) {
                                t.pass("length=2")
                            }
                            else {
                                t.fail("FAIL : length!=2")
                            }
                            callback();
                        })
                    }, e => t.fail('Error on  beta : ' + e ));
                }, e => t.fail('Error on alpha : ' + e ));

        });
    }
    updateCategory( callback ) {
        this.category.id('alpha').name('My Alpha').update( () => {
            this.category.get( 'alpha', re => {
                // console.log('updateCategory: ', re );
                if ( re.name == 'My Alpha' ) t.pass("updateCategory");
                else t.fail("updateCategory failed ");
                callback();
            } );
        }, e => t.fail( 'Error on updateCategory : ' + e ));
    }
    removeOneCategory( callback ) {
        this.category.delete( 'alpha', s => {
            this.category.gets( y => {
                let len = Object.keys( y ).length;
                if ( len == 1 ) t.pass('delete ok');
                else t.fail('delete failed');
                callback();
            });
        } );
    }
    addOneCategory( callback ) {
        this.category.id('gamma').name('Galaxy Gamma').title('Bluest gamma').create( x => {
            this.category.gets( x => {
                let len = Object.keys( x ).length;
                if ( len == 2 ) t.pass('adding a category');
                else t.fail('adding a category');

                this.category.get('gamma', x => {
                    if ( x.name == 'Galaxy Gamma' ) t.pass("gamma added");
                    else t.fail("adding gamma failed");
                    callback();
                });
            })
        }, e => alert( e ) );
    }
}