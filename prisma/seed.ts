// prisma/seed.ts
import { PrismaClient } from "../src/generated/prisma";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create 5 key users
  const fixedUsers = await Promise.all(
    ["elon", "nasa", "linux", "openai", "peterdev"].map((username) =>
      prisma.user.create({
        data: {
          username,
          email: `${username}@example.com`,
          name: faker.person.fullName(),
          bio: faker.lorem.sentence(),
          avatar: faker.image.avatar(),
          banner: faker.image.urlPicsumPhotos({ width: 800, height: 200 }),
        },
      })
    )
  );

  // Create 15 random users
  const randomUsers = await Promise.all(
    Array.from({ length: 15 }).map(() =>
      prisma.user.create({
        data: {
          username: faker.internet.username(),
          email: faker.internet.email(),
          name: faker.person.fullName(),
          bio: faker.lorem.sentence(),
          avatar: faker.image.avatar(),
          banner: faker.image.urlPicsumPhotos({ width: 800, height: 200 }),
        },
      })
    )
  );

  const users = [...fixedUsers, ...randomUsers];
  console.log(`✅ Created ${users.length} users`);

  // Create 40 tweets
  const tweets = [];
  for (let i = 0; i < 40; i++) {
    const author = faker.helpers.arrayElement(users);
    const tweet = await prisma.tweet.create({
      data: {
        content: faker.lorem.sentence(),
        authorId: author.id,
      },
    });
    tweets.push(tweet);
  }

  console.log(`✅ Created ${tweets.length} tweets`);

  // Create 25 comments (replies)
  for (let i = 0; i < 25; i++) {
    const tweet = faker.helpers.arrayElement(tweets);
    const author = faker.helpers.arrayElement(users);
    await prisma.tweet.create({
      data: {
        content: faker.lorem.sentences(2),
        authorId: author.id,
        parentId: tweet.id,
      },
    });
  }

  console.log("✅ Created 25 comments (replies)");

  // Add 100 likes
  for (let i = 0; i < 100; i++) {
    const tweet = faker.helpers.arrayElement(tweets);
    const user = faker.helpers.arrayElement(users);
    try {
      await prisma.like.create({
        data: {
          userId: user.id,
          tweetId: tweet.id,
        },
      });
    } catch {}
  }

  // Add 40 retweets
  for (let i = 0; i < 40; i++) {
    const tweet = faker.helpers.arrayElement(tweets);
    const user = faker.helpers.arrayElement(users);
    try {
      await prisma.retweet.create({
        data: {
          userId: user.id,
          tweetId: tweet.id,
        },
      });
    } catch {}
  }

  console.log("✅ Added likes and retweets");

  // Add 70 follows
  for (let i = 0; i < 70; i++) {
    const follower = faker.helpers.arrayElement(users);
    const following = faker.helpers.arrayElement(users);
    if (follower.id !== following.id) {
      try {
        await prisma.follow.create({
          data: {
            followerId: follower.id,
            followingId: following.id,
          },
        });
      } catch {}
    }
  }

  console.log("✅ Added followers");

  console.log("🌱 Seeding finished.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
