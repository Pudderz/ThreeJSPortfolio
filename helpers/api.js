const POST_GRAPHQL_FIELDS = `
title
snippet
createdAt
slug
createdAt
technologiesUsed
liveDemo
sourceCode
primaryColour
secondaryColour
whiteOrBlackText
markdownDescription
aboutProject
mainImage{
  url
  title
  width
  height
}
`
const POST_GRAPHQL_HOMEPAGE_FIELDS = `
title
snippet
createdAt
slug
primaryColour
liveDemo
sourceCode
secondaryColour
whiteOrBlackText
mainImage{
  url
  title
  width
  height
}
`

const POST_GRAPHQL_SLUG_FIELDS = `
slug
`
async function fetchGraphQL(query) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json())
}

function extractPost(fetchResponse) {
  return fetchResponse?.data?.contentCollection?.items?.[0]
}

function extractPostEntries(fetchResponse) {
  return fetchResponse?.data?.contentCollection?.items
}

export async function getPreviewPostBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      contentCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return extractPost(entry)
}

export async function getAllPostsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      contentCollection(where: { slug_exists: true }, order: createdAt_DESC) {
        items {
          ${POST_GRAPHQL_SLUG_FIELDS}
        }
      }
    }`
  )
  console.log(entries)
  return extractPostEntries(entries)
}

export async function getAllPostsForHome() {
  console.log('running allposts')
  const entries = await fetchGraphQL(
    `query {
      contentCollection(where: { slug_exists: true },order: createdAt_DESC){
        items {
          ${POST_GRAPHQL_HOMEPAGE_FIELDS}
        }
      }
    }`
  )
  console.log('entries')
 console.log(entries)
  return extractPostEntries(entries)
}

export async function getPost(slug) {
  console.log(`slug - ${slug}`)
  const entry = await fetchGraphQL(
    `query {
      contentCollection(where: { slug: "${slug}" }, limit: 1){
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return {
    post: extractPost(entry),
  }
}
