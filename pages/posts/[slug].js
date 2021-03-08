import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getAllPostsWithSlug, getPost } from "../../helpers/api";
import renderToString from 'next-mdx-remote/render-to-string'
import ProjectTemplate from "../../components/projectsPage/projectTemplate";

export default function CreatePost({ post, mdx, aboutProjectMdx }) {
  const router = useRouter();
  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div>
      {router.isFallback ? (
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
              aboutProject={aboutProjectMdx}
            />
          </article>
        </>
      )}
    </div>
  );
}

export async function getStaticProps({ params }) {
  const data = await getPost(params.slug);
  const mdxSource = await renderToString(data?.post?.markdownDescription);
  const aboutProjectMdx = await renderToString(data?.post?.aboutProject);

  return {
    props: {
      post: data?.post ?? null,
      mdx: mdxSource,
      aboutProjectMdx: aboutProjectMdx,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths: allPosts?.map(({ slug }) =>{
      console.log('slug - ',slug)
      return `/posts/${slug}`
    } ) ?? [],
    fallback: true,
  };
}
