//TODO: seeds script should come here, so we"ll be able to put some data in our local env

var mongoose = require("mongoose");
require("../models/User");
require("../models/Item");
require("../models/Comment");

var User = mongoose.model("User");
var Item = mongoose.model("Item");
var Comment = mongoose.model("Comment");


var items = ["bike", "car", "house", "phone", "laptop"];
var description = "This is a mock description. ";
var adjectives = ["small", "luxurious", "big", "vintage", "new"];
var aComment = "wow, what an item!";

var randomNumber = (number)=>{
    return Math.floor(Math.random() * number);
};

var seedUserWithItems = async (id)=>{
    var testUser = new User();
    testUser.username = `testUser${id}`;
    testUser.email = `notValid${id}@yahoo.com`
    testUser.setPassword("111");
    await testUser.save();
    const item = await saveItem(testUser);
    await createComment(testUser, item);
    
    return;
}

async function saveItem(testUser) {
    let anItem = new Item();
    anItem.title = `${adjectives[randomNumber(5)]} ${items[randomNumber(5)]}`;
    anItem.description = description;
    anItem.image = `https://picsum.photos/id/${randomNumber(200)}/200`;
    anItem.seller = testUser;
    anItem.tagList = ["#test"];
    await anItem.save();
    return anItem;
}
async function createComment(user, item){
    let aComment = new Comment('test comment');
    aComment.item = item;
    Comment.seller = user;
    await aComment.save();
    return;
}
async function seed() {
    mongoose.connect(process.env.MONGODB_URI);
    let allPromises = [];
    for (let index = 0; index < 101; index++) {
        allPromises.push(seedUserWithItems());
    }
    await Promise.allSettled(allPromises);
    await mongoose.disconnect();
    return;
    
}

seed();