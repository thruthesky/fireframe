import { Test as t } from '../test';
import { Post, PostData } from '../../post';
import { Category } from '../../category';
export class PostTest {
    post: Post; // Post instance with temporary post path.
    posts: Array<PostData>;
    category: Category;

    constructor() {
        this.post = new Post( 'post-test', 'category-test' );
        this.category = new Category( 'category-test' );
    }

}