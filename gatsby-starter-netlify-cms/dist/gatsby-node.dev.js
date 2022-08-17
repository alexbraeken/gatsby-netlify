"use strict";

var _ = require('lodash');

var path = require('path');

var _require = require('gatsby-source-filesystem'),
    createFilePath = _require.createFilePath;

var _require2 = require('gatsby-remark-relative-images'),
    fmImagesToRelative = _require2.fmImagesToRelative;

var admin = require('firebase-admin');

var activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

require("dotenv").config({
  path: ".env.".concat(activeEnv)
});

var serviceAccount = {
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
var db = admin.firestore();

exports.createPages = function (_ref) {
  var actions = _ref.actions,
      graphql = _ref.graphql;
  var createPage = actions.createPage;
  return graphql("\n    {\n      allMarkdownRemark(limit: 1000) {\n        edges {\n          node {\n            id\n            fields {\n              slug\n            }\n            frontmatter {\n              tags\n              templateKey\n              preferred_language\n            }\n          }\n        }\n      }\n    }\n  ").then(function _callee(result) {
    var posts, propList, tags;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!result.errors) {
              _context.next = 3;
              break;
            }

            result.errors.forEach(function (e) {
              return console.error(e.toString());
            });
            return _context.abrupt("return", Promise.reject(result.errors));

          case 3:
            posts = result.data.allMarkdownRemark.edges;
            posts.forEach(function (edge) {
              var id = edge.node.id;

              if (edge.node.frontmatter.templateKey !== "testimonial" && edge.node.frontmatter.templateKey !== "team-member" && edge.node.frontmatter.templateKey !== "algarve-slide" && edge.node.frontmatter.templateKey !== "activity-post" && edge.node.frontmatter.templateKey !== "ownerTestimonial" && edge.node.frontmatter.templateKey !== "job-listing" && edge.node.fields) {
                createPage({
                  path: edge.node.fields.slug,
                  tags: edge.node.frontmatter.tags,
                  component: path.resolve("src/templates/".concat(String(edge.node.frontmatter.templateKey), ".js")),
                  // additional data can be passed via context
                  context: {
                    id: id
                  }
                });
              }
            });
            propList = [];
            _context.next = 8;
            return regeneratorRuntime.awrap(getFirestoreData(propList));

          case 8:
            propList = _context.sent;
            console.log(propList);
            propList.forEach(function (prop) {
              createPage({
                path: "/properties/".concat(prop),
                component: path.resolve("src/pages/properties/index.js")
              });
            }); // Tag pages:

            tags = []; // Iterate through each post, putting all found tags into `tags`

            posts.forEach(function (edge) {
              if (_.get(edge, "node.frontmatter.tags")) {
                tags = tags.concat(edge.node.frontmatter.tags);
              }
            }); // Eliminate duplicate tags

            tags = _.uniq(tags); // Make tag pages

            tags.forEach(function (tag) {
              var tagPath = "/tags/".concat(_.kebabCase(tag), "/");
              createPage({
                path: tagPath,
                component: path.resolve("src/templates/tags.js"),
                context: {
                  tag: tag
                }
              });
            });

          case 15:
          case "end":
            return _context.stop();
        }
      }
    });
  });
};

exports.onCreateNode = function (_ref2) {
  var node = _ref2.node,
      actions = _ref2.actions,
      getNode = _ref2.getNode;
  var createNodeField = actions.createNodeField;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === "MarkdownRemark") {
    var value = createFilePath({
      node: node,
      getNode: getNode
    });
    createNodeField({
      name: "slug",
      node: node,
      value: value
    });
  }
};

exports.onCreateWebpackConfig = function (_ref3) {
  var stage = _ref3.stage,
      loaders = _ref3.loaders,
      actions = _ref3.actions,
      getConfig = _ref3.getConfig;

  if (stage === 'build-html') {
    actions.setWebpackConfig({
      externals: getConfig().externals.concat(function (context, request, callback) {
        var regex = /^@?firebase(\/(.+))?/; // exclude firebase products from being bundled, so they will be loaded using require() at runtime.

        if (regex.test(request)) {
          return callback(null, 'umd ' + request);
        }

        callback();
      })
    });
  }
};

exports.onCreatePage = function _callee2(_ref4) {
  var page, actions, createPage;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          page = _ref4.page, actions = _ref4.actions;
          createPage = actions.createPage;

          if (page.path.match(/^\/properties\//)) {
            page.matchPath = "/properties/*", createPage(page);
          }

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var getFirestoreData = function getFirestoreData(propList) {
  var snapshot;
  return regeneratorRuntime.async(function getFirestoreData$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(db.collection('Descriptions').get());

        case 2:
          snapshot = _context3.sent;
          snapshot.docs.forEach(function (doc) {
            propList.push(doc.id);
          });
          return _context3.abrupt("return", propList);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
};