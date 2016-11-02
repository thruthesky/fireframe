export class Test {
    static count = 0;
    static pass( message, callback? ) {
        console.log('PASS ' + ( ++Test.count ) + ' => ' + message );
        if ( callback ) callback();
    }
    static fail ( message, callback? ) {
        console.error('FAIL ' + ( ++Test.count ) + ' >> ' + message );
        if ( callback ) callback();
    }
    static check( message, re, callback ) {
        if ( re ) return this.fail('message : ' + re );
        this.pass( message );
        callback();
    }
}