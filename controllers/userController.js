const User = require("../models/user");
const jwt = require("jsonwebtoken");
const UserRegistor = require("../models/userRegister");
const Services = require("../models/services");
const Card = require("../models/card");

exports.addNewUser = async (req, res, next) => {
  const name = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;
  try {
    // Client required he needs to se the passwords of users

    // const hashedPassword = await bcrypt.hash(password, 12);
    // password = hashedPassword;
    const isFound = await User.findOne({ email: email });
    if (isFound) {
      res.send({ message: false });
    }
    const newUser = new User({
      fullName: name,
      email: email.toLowerCase(),
      password: password.toLowerCase(),
    });
    const result = await newUser.save();
    if (result) {
      res.status(200).send({ message: "User saved successfully" });
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.userLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    if (email === "admin@gmail.com" && password === "admin") {
      res.status(200).send({ message: "admin" });
      return;
    } else {
      const userInfo = await User.findOne({ email: email.toLowerCase() });
      if (userInfo) {
        if (userInfo.password === password.toLowerCase()) {
          const token = jwt.sign({ userId: userInfo._id }, "secret", {
            expiresIn: "2h",
          });
          // const filter = JSON.stringify(userInfo._id);
          // const progress = JSON.stringify(userInfo.token);
          const req = {
            id: userInfo._id,
            token: token,
            progress: userInfo.token,
          };
          res.status(200).send(req);
        }
      } else {
        res.send({ message: false });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.addUserIdentity = async (req, res, next) => {
  const userInfo = req.body.userRegistor;
  try {
    const user = await User.findByIdAndUpdate(userInfo.user, { token: "40" });
    const registerUserInfo = new UserRegistor(userInfo);
    await registerUserInfo.save();
    if (registerUserInfo) {
      res.send({ message: "User registration successful" });
    } else {
      res.send({ message: false });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getUserIdentity = async (req, res, next) => {
  const id = req.body.id;
  try {
    const userInfo = await UserRegistor.findOne({ user: id });
    if (userInfo) {
      res.send(userInfo);
    } else {
      res.send(false);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updateRegiterProfile = async (req, res, next) => {
  const id = req.body.id;
  const company = req.body.company;
  const individual = req.body.individual;
  const profileUrl = req.body.profileUrl;
  const identityFileUrl = req.body.identityFileUrl;
  const addressFileUrl = req.body.addressFileUrl;

  try {
    const user = await User.findByIdAndUpdate(id, { token: "0" });
    if (individual) {
      const userInfo = await UserRegistor.findOneAndUpdate(
        { user: id },
        {
          profileUrl: profileUrl,
          individual: individual,
          identityFileUrl,
          addressFileUrl,
        }
      );
      if (userInfo) {
        res.send({ message: "User Profile created successfully" });
      } else {
        res.send(false);
      }
    } else if (company) {
      const userInfo = await UserRegistor.findOneAndUpdate(
        { user: id },
        {
          profileUrl: profileUrl,
          company: company,
        }
      );
      if (userInfo) {
        res.send({ message: "User Profile created successfully" });
      } else {
        res.send(false);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.addNewService = async (req, res, next) => {
  const userId = req.body.userId;
  const Title = req.body.Title;
  const description = req.body.description;
  const rateHr = req.body.rateHr;
  const rateWeek = req.body.rateWeek;
  const thumbnailUrl = req.body.thumbnailUrl;

  try {
    const users = await User.findByIdAndUpdate(userId, { token: "80" });
    const user = await UserRegistor.findOne({ user: userId });
    if (user) {
      const newService = new Services({
        Title,
        description,
        rateHr,
        rateWeek,
        thumbnailUrl,
        user: user._id,
      });
      await newService.save();
      if (newService) {
        const userInfo = await UserRegistor.findOneAndUpdate(
          { user: userId },
          {
            $push: { services: newService._id },
          }
        );
        if (userInfo) {
          res.send(true);
        }
      }
    } else {
      res.send(false);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.addcard = async (req, res, next) => {
  const userId = req.body.userId;
  const cardInfo = req.body.cardInfo;
  try {
    const users = await User.findByIdAndUpdate(userId, { token: "100" });
    const newCard = new Card(cardInfo);
    await newCard.save();
    if (newCard) {
      const user = await UserRegistor.findOneAndUpdate(
        { user: userId },
        {
          card: newCard._id,
        }
      );
      if (user) {
        res.send(true);
      } else {
        res.send(false);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getUserRegisterInfo = async (req, res, next) => {
  const userId = req.body.userId;
  try {
    if (userId !== "undefined") {
      const user = await UserRegistor.findOne({ user: userId });
      if (user) {
        res.send(user);
      } else {
        res.send(false);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getUserCardInfo = async (req, res, next) => {
  const userId = req.body.userId;
  try {
    const user = await UserRegistor.findOne({ user: userId })
      .populate("card")
      .exec();
    if (user) {
      res.send(user);
    } else {
      res.send(false);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.addDocToVerify = async (req, res, next) => {
  const userId = req.body.userId;
  const docInfo = req.body.docInfo;

  try {
    const user = await UserRegistor.findOneAndUpdate(
      { user: userId },
      {
        $push: { verifyDoc: docInfo },
      }
    );
    if (user) {
      res.send(user);
    } else {
      res.send(false);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUserData = async (req, res, next) => {
  try {
    const user = await User.find();
    if (user) {
      res.send(user);
    } else {
      res.send(false);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUserDetailedData = async (req, res, next) => {
  try {
    const user = await UserRegistor.find();
    if (user) {
      res.send(user);
    } else {
      res.send(false);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getUserAllInfo = async (req, res, next) => {
  const userId = req.body.userId;
  try {
    const user = await UserRegistor.findOne({ user: userId })
    .populate("card")
    .populate("services")
    .populate("verifyDoc")
    .exec();
    if (user) {
      res.send(user);
    } else {
      res.send(false);
    }
  } catch (error) {
    console.log(error);
  }
};
