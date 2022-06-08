"use strict";

const {
  db,
  models: { User, Wishlist, Gift },
} = require("../server/db");
// a generator that generates random avatar images
const { AvatarGenerator } = require("random-avatar-generator");
 
const generator = new AvatarGenerator();

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    await User.create({
      username: "cody",
      password: "123",
      email: "cody@fsa.com",
      DOB:'1995-01-02',
      isAdmin: true,
      avatar: generator.generateRandomAvatar(),
    }),
    await User.create({
      username: "murphy",
      password: "123",
      email: "murphy@fsa.com",
      DOB:'1998-02-02',
      avatar: generator.generateRandomAvatar(),
    }),
    await User.create({
      username: "ying",
      password: "123",
      email: "ying@fsa.com",
      DOB:'1998-08-08',
      avatar: generator.generateRandomAvatar(),
    }),
    await User.create({
      username: "savannah",
      password: "123",
      email: "savannah@fsa.com",
      DOB:'1995-07-10',
      avatar: generator.generateRandomAvatar(),
    }),
    await User.create({
      username: "maribel",
      password: "123",
      email: "maribel@fsa.com",
      DOB:'1995-09-12',
      avatar: generator.generateRandomAvatar(),
    }),
    await User.create({
      username: "simon",
      password: "123",
      email: "simon@fsa.com",
      DOB:'1985-05-11',
      avatar: generator.generateRandomAvatar(),
    }),
  ]);

  //default list for each user
  await Wishlist.create({
    userId: users[0].dataValues.id,
    default: true,
    name: "Default Wishlist"
  });

  await Wishlist.create({
    userId: users[1].dataValues.id,
    default: true,
    name: "Default Wishlist"
  });
  await Wishlist.create({
    userId: users[2].dataValues.id,
    default: true,
    name: "Default Wishlist"
  });
  await Wishlist.create({
    userId: users[3].dataValues.id,
    default: true,
    name: "Default Wishlist"
  });
  await Wishlist.create({
    userId: users[4].dataValues.id,
    default: true,
    name: "Default Wishlist"
  });
  await Wishlist.create({
    userId: users[5].dataValues.id,
    default: true,
    name: "Default Wishlist"
  });

  //additional list for each user
  await Wishlist.create({
    name: "Birthday Wishlist",
    userId: users[0].dataValues.id
  });
  await Wishlist.create({
    name: "Valentine's Day Ideas",
    userId: users[1].dataValues.id
  });
  await Wishlist.create({
    name: "Birthday Ideas",
    userId: users[2].dataValues.id
  });
  await Wishlist.create({
    name: "Graduation Gifts",
    userId: users[3].dataValues.id
  });
  await Wishlist.create({
    name: "Anniversary Gifts",
    userId: users[4].dataValues.id
  });
  await Wishlist.create({
    name: "Mother's Day",
    userId: users[5].dataValues.id
  });

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
      ying: users[2],
      savannah: users[3],
      maribel: users[4],
      simon: users[5]
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
