import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';
import { Post } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  try {
    // Seed data for PostgreSQL
    await prisma.user.createMany({
      data: [
        { name: 'John Doe', email: 'john@example.com', password: 'password123', updatedAt: new Date() },
        { name: 'Jane Smith', email: 'jane@example.com', password: 'password456', updatedAt: new Date() },
        // Add more users here...
      ],
    });

    const  user = await prisma.user.findFirst({}) as User;

    await prisma.post.createMany({
      data: [
        { user_id: user.user_id, title: 'First Post', content: 'Lorem ipsum dolor sit amet...', likes: 10, updatedAt: new Date() },
        { user_id: user.user_id, title: 'Second Post', content: 'Praesent commodo cursus...', likes: 5, updatedAt: new Date() },
        // Add more posts here...
      ],
    });

    const  post = await prisma.post.findFirst({}) as Post;

    await prisma.comment.createMany({
      data: [
        { post_id: post.post_id, user_id: user.user_id, content: 'Great post!', updatedAt: new Date() },
        { post_id: post.post_id,user_id: user.user_id, content: 'Nice work!', updatedAt: new Date() },
        // Add more comments here...
      ],
    });

    await prisma.follower.createMany({
      data: [
        { user_id: user.user_id, updatedAt: new Date() },
        { user_id: user.user_id, updatedAt: new Date() },
        // Add more followers here...
      ],
    });

    await prisma.hashtag.createMany({
      data: [
        // Add hashtags here...
      ],
    });

    await prisma.postHashtag.createMany({
      data: [
        // Add more post-hashtag associations here...
      ],
    });

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error while seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
