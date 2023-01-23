//TODO: seeds script should come here, so we"ll be able to put some data in our local env

var mongoose = require("mongoose");
require("../models/User");
require("../models/Item");
require("../models/Comment");

var User = mongoose.model("User");
var Item = mongoose.model("Item");
var Comment = mongoose.model("comment");


var items = ["bike", "car", "house", "phone", "laptop"];
var description = "This is a mock description. ";
var adjectives = ["small", "luxurious", "big", "vintage", "new"];
var randomNumber = (number)=>{
    return Math.floor(Math.random() * number);
};

var seedDB = async ()=>{
    var testUser = new User();
    let seed = randomNumber(70);
    testUser.username = `testUser${seed}`;
    testUser.email = `notValid${seed}@yahoo.com`
    testUser.setPassword("111");
    await testUser.save();
    let anItem = new Item;
    anItem.title = `${adjectives[randomNumber()]} ${items[randomNumber()]}`;
    anItem.description = description;
    anItem.image = `https://picsum.photos/id/${randomNumber(200)}/200`;
    anItem.seller = testUser;
    await anItem.save();
    let aComment = new Comment("some test comment");
    aComment.item = anItem;
    aComment.seller = testUser;
    await aComment.save();
    mongoose.disconnect();
    return;
    
}

mongoose.connect(process.env.MONGODB_URI);

seedDB();
