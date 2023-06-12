datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  user_id   Int       @id @default(autoincrement())
  name      String
  email     String    @unique
  password  String
  posts     Post[]
  comments  Comment[]
  followers Follower[]

  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Post {
  post_id    Int           @id @default(autoincrement())
  user_id    Int
  title      String
  content    String
  likes      Int
  user       User          @relation(fields: [user_id], references: [user_id])
  comments   Comment[]
  hashtags   PostHashtag[]
  createdAt  DateTime      @default(now())
  updatedAt  DateTime      @updatedAt
}

model Comment {
  comment_id Int           @id @default(autoincrement())
  post_id    Int
  user_id    Int
  content    String
  post       Post          @relation(fields: [post_id], references: [post_id])
  user       User          @relation(fields: [user_id], references: [user_id])
  createdAt  DateTime      @default(now())
  updatedAt  DateTime      @updatedAt
}

model Follower {
  follower_id  Int          @id @default(autoincrement())
  user_id      Int
  user         User         @relation(fields: [user_id], references: [user_id])
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt
}

model Hashtag {
  hashtag_id   Int          @id @default(autoincrement())
  posts        PostHashtag[]

  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt
}

model PostHashtag {
  post_id      Int
  hashtag_id   Int
  post         Post         @relation(fields: [post_id], references: [post_id])
  hashtag      Hashtag      @relation(fields: [hashtag_id], references: [hashtag_id])

  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt

  @@id([post_id, hashtag_id])
}
