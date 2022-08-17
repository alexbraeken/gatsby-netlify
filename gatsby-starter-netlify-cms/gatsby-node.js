const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
const admin = require('firebase-admin')

const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

const serviceAccount = {
  "type": "service_account",
  "project_id": "gatsby-test-286520",
  "private_key_id": process.env.GATSBY_PRIVATE_KEY_ID,
  "private_key": process.env.GATSBY_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.GATSBY_CLIENT_EMAIL,
  "client_id": process.env.GATSBY_CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/local-node-scripts%40gatsby-test-286520.iam.gserviceaccount.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
              preferred_language
            }
          }
        }
      }
    }
  `).then(async (result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((edge) => {
      const id = edge.node.id
      if (edge.node.frontmatter.templateKey !== "testimonial" 
      && edge.node.frontmatter.templateKey !== "team-member" 
      && edge.node.frontmatter.templateKey !== "algarve-slide"
      && edge.node.frontmatter.templateKey !== "activity-post"
      && edge.node.frontmatter.templateKey !== "ownerTestimonial"
      && edge.node.frontmatter.templateKey !== "job-listing"
      && edge.node.fields){

          createPage({
          path: edge.node.fields.slug,
          tags: edge.node.frontmatter.tags,
          component: path.resolve(
            `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
          ),
          // additional data can be passed via context
          context: {
            id,
          },
        })
      }
    })

    let propList = []
    propList = await getFirestoreData(propList)
    console.log(propList)
    propList.forEach((prop) => {
      createPage({
        path: `/properties/${prop}`,
        component: path.resolve(
          "src/pages/properties/index.js"
        )
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach((edge) => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach((tag) => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreateWebpackConfig = ({
  stage,
  loaders,
  actions,
  getConfig
}) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      externals: getConfig().externals.concat(function(context, request, callback) {
        const regex = /^@?firebase(\/(.+))?/;
        // exclude firebase products from being bundled, so they will be loaded using require() at runtime.
        if (regex.test(request)) {
          return callback(null, 'umd ' + request);
        }
        callback();
      })
    });
  }
};


exports.onCreatePage = async ({page, actions}) => {
  const { createPage } = actions
  
    if (page.path.match(/^\/properties\//)) {
      page.matchPath= "/properties/*",
      createPage(page)
    }
}

const getFirestoreData = async (propList) => {
  const snapshot = await db.collection('Descriptions').get();
  snapshot.docs.forEach((doc) => {
    propList.push(doc.id)
  })
  return propList
}