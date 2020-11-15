import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getAllPostsWithSlug, getPost } from "../../helpers/api";
import renderToString from 'next-mdx-remote/render-to-string'
import ProjectTemplate from "../../components/projectTemplate";

export default function CreatePost({ post, mdx }) {
  const router = useRouter();
  console.log("post content");
  console.log(post);
  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div>
      {router.isFallback ? (
        // add loader animation
        <h1>Loading…</h1>
      ) : (
        <>
          <article>
            <ProjectTemplate
              key={post.slug}
              slug={post.slug}
              date={post.createdAt}
              image={post.mainImage}
              title={post.title}
              techUsed={post.technologiesUsed}
              content = {mdx}
              sourceLink = {post.sourceCode}
              liveDemo = {post.liveDemo}
              whiteOrBlackText= {post.whiteOrBlackText}
              primaryColour={post.primaryColour}
              secondaryColour={post.secondaryColour}
            />
          </article>
        </>
      )}
    </div>
  );
}

export async function getStaticProps({ params }) {
  console.log('testing')
  console.log(params)
  const data = await getPost(params.slug);
  console.log('data')
  console.log(data)

  const mdxSource = await renderToString(data?.post.markdownDescription);
  return {
    props: {
      post: data?.post ?? null,
      mdx: mdxSource
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  console.log(allPosts)
  return {
    paths: allPosts?.map(({ slug }) =>{
      console.log('slug - ',slug)
      return `/posts/${slug}`
    } ) ?? [],
    fallback: true,
  };
}
