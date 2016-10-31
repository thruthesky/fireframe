
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
        this.category = new Category( 'beta' );
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
        callback();
    }
    removeOneCategory( callback ) {
        callback();
    }
    addOneCategory( callback ) {
        callback();
    }
}