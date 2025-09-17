// prisma/seed.ts
import { PrismaClient } from "../src/generated/prisma";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();


async function main() {
  console.log('🌱 Seeding database...');

  // Clear database
  await prisma.bookmark.deleteMany();
  await prisma.retweet.deleteMany();
  await prisma.like.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.tweet.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create 10 users
  const users = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.user.create({
        data: {
          username: faker.internet.username().toLowerCase(),
          email: faker.internet.email(),
          name: faker.person.fullName(),
          bio: faker.lorem.sentence(),
          avatar: faker.image.avatar(),
          banner: `https://picsum.photos/seed/${faker.string.uuid()}/1200/300`,
        },
      })
    )
  );

  // 2. Create 60 original tweets
  const tweets = await Promise.all(
    Array.from({ length: 60 }).map(() => {
      const author = faker.helpers.arrayElement(users);
      return prisma.tweet.create({
        data: {
          content: faker.lorem.sentences({ min: 1, max: 3 }),
          image: Math.random() < 0.4
            ? [`https://picsum.photos/seed/${faker.string.uuid()}/600/400`]
            : [],
          authorId: author.id,
        },
      });
    })
  );

  // 3. Create 29 replies
  const replies = await Promise.all(
    Array.from({ length: 29 }).map(() => {
      const replyingUser = faker.helpers.arrayElement(users);
      const parentTweet = faker.helpers.arrayElement(tweets);
      return prisma.tweet.create({
        data: {
          content: faker.lorem.sentence(),
          image: [],
          authorId: replyingUser.id,
          parentId: parentTweet.id,
        },
      });
    })
  );

  // 4. Likes (30 unique user-tweet pairs)
  const likePairs = new Set<string>();
  while (likePairs.size < 30) {
    const user = faker.helpers.arrayElement(users);
    const tweet = faker.helpers.arrayElement([...tweets, ...replies]);
    const key = `${user.id}-${tweet.id}`;
    if (!likePairs.has(key)) {
      likePairs.add(key);
      await prisma.like.create({
        data: {
          userId: user.id,
          tweetId: tweet.id,
        },
      });
    }
  }

  // 5. Retweets (30 unique user-tweet pairs)
  const retweetPairs = new Set<string>();
  while (retweetPairs.size < 30) {
    const user = faker.helpers.arrayElement(users);
    const tweet = faker.helpers.arrayElement(tweets);
    const key = `${user.id}-${tweet.id}`;
    if (!retweetPairs.has(key)) {
      retweetPairs.add(key);
      await prisma.retweet.create({
        data: {
          userId: user.id,
          tweetId: tweet.id,
        },
      });
    }
  }

  // 6. Bookmarks (30 unique user-tweet pairs)
  const bookmarkPairs = new Set<string>();
  while (bookmarkPairs.size < 30) {
    const user = faker.helpers.arrayElement(users);
    const tweet = faker.helpers.arrayElement([...tweets, ...replies]);
    const key = `${user.id}-${tweet.id}`;
    if (!bookmarkPairs.has(key)) {
      bookmarkPairs.add(key);
      await prisma.bookmark.create({
        data: {
          userId: user.id,
          tweetId: tweet.id,
        },
      });
    }
  }

  // 7. Follows (25 unique user-user pairs)
  const followPairs = new Set<string>();
  while (followPairs.size < 25) {
    const follower = faker.helpers.arrayElement(users);
    let following = faker.helpers.arrayElement(users);
    while (follower.id === following.id) {
      following = faker.helpers.arrayElement(users); // no self-follow
    }
    const key = `${follower.id}-${following.id}`;
    if (!followPairs.has(key)) {
      followPairs.add(key);
      await prisma.follow.create({
        data: {
          followerId: follower.id,
          followingId: following.id,
        },
      });
    }
  }

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
