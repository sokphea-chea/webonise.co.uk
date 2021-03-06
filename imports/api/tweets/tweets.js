import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class TweetsCollection extends Mongo.Collection {
    insert(doc, callback) {
        const ourDoc = doc;
        ourDoc.createdAt = ourDoc.createdAt || new Date();
        return super.insert(ourDoc, callback);
    }
    update(selector, modifier) {
        return super.update(selector, modifier);
    }
    remove(selector) {
        return super.remove(selector);
    }
}

export const Tweets = new TweetsCollection('tweets');

// Deny all client-side updates since we will be using methods to manage this collection
Tweets.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

Tweets.schema = new SimpleSchema({
    twid: {
        type: String,
        max: 200
    },
    body: {
        type: String
    },
    date: {
        type: Date
    },
    createdAt: {
        type: Date,
        denyUpdate: true
    }
});

Tweets.attachSchema(Tweets.schema);

Tweets.publicFields = {
    body: 1,
    date: 1,
    createdAt: 1
};
