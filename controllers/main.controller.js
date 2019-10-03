const bcrypt = require('bcryptjs');
const User = require('../models/User.model');

exports.main = async function(req, res, next) {
  let user = await User.findOne({ _id: req.session.user });

  res.render("front", { 'user': user, 'loggedIn': req.session.user });
};

exports.loginForm = function(req, res, next) {
  res.render("login");
};

exports.login = async function(req, res, next) {
  let user = await User.findOne({ email: req.fields.email });
    if (!user) {
        return res.status(400).send('Incorrect email or password');
    }
 
    const validPassword = await bcrypt.compare(req.fields.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }    

    req.session.user = user._id;

    res.redirect(`/`);
};

exports.logOut = function(req, res, next) {
    req.session.destroy();
		res.redirect('/');
};

exports.registerForm = function(req, res, next) {
  res.render("register");
};

exports.createUser = function(req,res,next) {
  let hashed_kodeord = bcrypt.hashSync(req.fields.password, 10);  
  const doc = new User();
  doc.name = req.fields.name;
  doc.email = req.fields.email;
  doc.password = hashed_kodeord;
  doc.save();
  res.redirect('/login');    
}

exports.createPost = async function(req, res, next) {
  try {
    const result = await User.findByIdAndUpdate(req.params.id,{
        $push: {
          posts:{
            text: req.fields.newpost,
            date: new Date()
        }
      }
  });

    res.redirect('/');
} catch (error) {
    console.error(error);
    res.redirect('/');
}  
};

exports.getFriends = async function(req, res, next) {
  let user = await User.find();
  res.render("friends", { 'users': user});
};

exports.getUser = async function(req, res, next) {
  let user = await User.findOne({ _id: req.params.id });

  for (let i = 0; i < user.posts.length; i++) {
    user.posts[i].liked = false;

    user.posts[i].likes.forEach(like =>{
      if(like.userid == req.session.user)
      {
        user.posts[i].liked = true;
        user.posts[i].idOfLike = like.userid;
      }
    });
    
  }
  

  res.render("user", { 'user': user, 'loggedIn': req.session.user });
};

exports.likePost = async function(req, res, next) {
  try {
    const result = await User.findOneAndUpdate( {'posts._id':req.params.id},{
        $push: {
          'posts.$.likes':{
            'userid': req.session.user
        }
      }
  });
  res.redirect(`/user/${req.params.user}`)
  } catch (error) {
      console.error(error);
      res.redirect('/');
  }  
};

exports.deleteLike = async function(req, res, next) {
  try {
    const result = await User.findOneAndUpdate( {'posts._id':req.params.id},{
        $pull: {
          'posts.$.likes': {$in: {
            'userid': req.session.user
        }}
      }
  });

  res.redirect(`/user/${req.params.user}`)
  } catch (error) {
      console.error(error);
      res.redirect('/');
  }  
};