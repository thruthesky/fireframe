
import { Category, CATEGORY } from '../fireframe/category';
export interface CATEGORY {
    id: string;
    name: string;
    title: string;
    description: string;
}
export class CategoryTest {
    category: Category;
    categories: Array<CATEGORY>;
    constructor() {
        this.category = new Category( 'test' );
        this.runTest( () => this.category.ref.remove() );
    }
    runTest( callback ) {
        this.addTwoCategory(
            x => this.updateCategory(
                x => this.removeOneCategory(
                    x => this.addOneCategory(
                        x => callback()
                    )
                )
            )
        );
    }
    addTwoCategory( callback ) {
        this.category.ref.remove( e => {
            if ( e ) return alert("ERROR on removing category");
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
                                console.log("PASS : length=2")
                            }
                            else {
                                console.log("FAIL : length!=2")
                            }
                            callback();
                        })
                    }, e => alert('Error on  beta : ' + e ));
                }, e => alert('Error on alpha : ' + e ));

        });
    }
    updateCategory( callback ) {
        this.category.id('alpha').name('My Alpha').update( () => {
            this.category.get( 'alpha', re => {
                // console.log('updateCategory: ', re );
                if ( re.name == 'My Alpha' ) console.log("PASS : updateCategory");
                else console.log("FAIL : updateCategory failed ");
                callback();
            } );
        }, e => alert( 'Error on updateCategory : ' + e ));
    }
    removeOneCategory( callback ) {
        this.category.delete( 'alpha', s => {
            this.category.gets( y => {
                let len = Object.keys( y ).length;
                if ( len == 1 ) console.log('PASS : delete ok');
                else console.log('FAIL : delete failed');
                callback();
            });
        } );
    }
    addOneCategory( callback ) {
        this.category.id('gamma').name('Galaxy Gamma').title('Bluest gamma').create( x => {
            this.category.gets( x => {
                let len = Object.keys( x ).length;
                if ( len == 2 ) console.log('PASS : adding a category');
                else console.log('FAIL : adding a category');

                this.category.get('gamma', x => {
                    if ( x.name == 'Galaxy Gamma' ) console.log("PASS : gamma added");
                    else console.log("FAIL : adding gamma failed");
                    callback();
                });
            })
        }, e => alert( e ) );
    }
}