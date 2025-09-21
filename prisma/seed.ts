import prisma from "@/lib/prisma";
import { faker } from "@faker-js/faker";

async function main() {
  console.log("🌱 Seeding database...");

  // Clear all existing data
  await prisma.bookmark.deleteMany();
  await prisma.retweet.deleteMany();
  await prisma.like.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.tweet.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create 3 users
  const users = await Promise.all(
    Array.from({ length: 3 }).map(() =>
      prisma.user.create({
        data: {
          username: faker.internet.username().toLowerCase(),
          email: faker.internet.email(),
          name: faker.person.fullName(),
          avatar: faker.image.avatar(),
          banner: `https://picsum.photos/seed/${faker.string.uuid()}/1200/300`,
          bio: faker.lorem.sentence(),
        },
      })
    )
  );

  // 2. Each user creates 6 tweets (all with images)
  const tweets = [];
  for (const user of users) {
    const userTweets = await Promise.all(
      Array.from({ length: 6 }).map(() =>
        prisma.tweet.create({
          data: {
            content: faker.lorem.sentence(),
            image: `https://picsum.photos/seed/${faker.string.uuid()}/600/400`,
            authorId: user.id,
          },
        })
      )
    );
    tweets.push(...userTweets);
  }

  // 3. Make all users follow each other (no self-follow)
  for (const follower of users) {
    for (const following of users) {
      if (follower.id !== following.id) {
        await prisma.follow.create({
          data: {
            followerId: follower.id,
            followingId: following.id,
          },
        });
      }
    }
  }

  // 4. Each user likes every other user's tweets
  for (const user of users) {
    for (const tweet of tweets) {
      if (tweet.authorId !== user.id) {
        await prisma.like.create({
          data: {
            userId: user.id,
            tweetId: tweet.id,
          },
        });
      }
    }
  }

  // 5. Each user replies to 3 tweets from others
  for (const user of users) {
    const otherTweets = tweets.filter((t) => t.authorId !== user.id);
    const replyTargets = faker.helpers.arrayElements(otherTweets, 3);

    for (const parentTweet of replyTargets) {
      await prisma.tweet.create({
        data: {
          content: faker.lorem.sentence(),
          image: `https://picsum.photos/seed/${faker.string.uuid()}/600/400`,
          authorId: user.id,
          parentId: parentTweet.id,
        },
      });
    }
  }

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
