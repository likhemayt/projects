import { getPosts } from "./src/lib/wordpress";

async function run() {
  const posts = await getPosts(3);
  console.log(JSON.stringify(posts, null, 2));
}

run();
