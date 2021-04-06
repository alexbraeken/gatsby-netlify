const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

require("dotenv").config({
  path: `.env.${activeEnv}`,
})


module.exports = {
  siteMetadata: {
    title: 'Smartavillas - Holiday Rentals Villas and Apartments in the Eastern Algarve',
    description:
      'Smartavillas.com specialise in helping Property Owners to provide their guests with good quality accommodation - at affordable prices - in the Eastern Algarve, with Tavira being the focal point. With its spectacular scenery, sandy beaches, good food, friendly people and great golf, we can think of no other reason why you would choose to holiday anywhere else! If you are looking for the perfect holiday rental or are Property Owners wishing to offer your holiday home for rental, then look no further. We pride ourselves on tailoring our services to meet your needs. We are a small and friendly company that really puts you - the customer - first.',
    menuLinks: [
      {
        "name": "Home",
        "link": "/",
        "subNav": null
      },
      {
        "name": "Our Properties",
        "link": "",
        "subNav": [{"name":"propertiesList"}]
      },
      {
        "name": "Our Business",
        "link": "/team/",
        "subNav": [{
          "name": "Why Book With Us?",
          "link": "/whyBookSmartavillas",
        },
        {
          "name": "List Your Property",
          "link": "/ListWithUs",
        },
        {
          "name": "Meet the Team",
          "link": "/team",
        },
        ]
      },
      {
        "name": "Traveller Tips",
        "link": "/travelerTips/",
        "subNav": null
      },
      {
        "name": "Holiday Extras",
        "link": "",
        "subNav": [{
          "name": "Airport Transfers",
          "link": "/holidayExtras/airport-transfers",
        },{
          "name": "Car Hire",
          "link": "/holidayExtras/car-hire",
        },{
          "name": "Food Packs",
          "link": "/holidayExtras/food-packs",
        },
      ]
      },
      {
        "name": "The Algarve",
        "link": "",
        "subNav": [{
          "name": "The Algarve",
          "link": "/location/algarve",
        },
        {
          "name": "Tavira",
          "link": "/location/tavira",
        },
        {
          "name": "Altura",
          "link": "/location/altura",
        },
        {
          "name": "Cabanas & Conceicao De Tavira",
          "link": "/location/cabanasConceicaoDeTavira",
        },
        {
          "name": "Cacela Velha",
          "link": "/location/cacelaVelha",
        },
        {
          "name": "Castro Marim",
          "link": "/location/castroMarim",
        },
        {
          "name": "Corte Antonio Martins",
          "link": "/location/corteAntonioMartins",
        },
        {
          "name": "Fuzeta",
          "link": "/location/fuzeta",
        },
        {
          "name": "Manta Rota",
          "link": "/location/mantaRota",
        },
        {
          "name": "Moncarapacho",
          "link": "/location/moncarapacho",
        },
        {
          "name": "Santa Catarina",
          "link": "/location/santaCatarina",
        },
        {
          "name": "Santo Estevao",
          "link": "/location/santoEstevao",
        },
        {
          "name": "Vila Nova De Cacela",
          "link": "/location/vilaNovaDeCacela",
        },
      ]
      },
      {
        "name": "Contact Us",
        "link": "/contact",
        "subNav": null
      },
    ]
    },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/public`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/activities`,
        name: 'activities',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/algarveSlides`,
        name: 'algarveSlides',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/teamMembers`,
        name: 'teamMembers',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/testimonials`,
        name: 'testimonials',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/ownerTestimonials`,
        name: 'ownerTestimonials',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/newsAlert`,
        name: 'newsAlert',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/property/*`] },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
      },
    },// must be after other CSS plugins
    {
      resolve: `gatsby-plugin-google-analytics-gdpr`,
      options: {
        // The property ID; the tracking code won't be generated without it.
        trackingId: "UA-173992217-1", 
        // Optional parameter (default false) - Enable analytics in development mode.
        enableDevelopment: false, // default false
        // Optional parameter (default true) - Some countries (such as Germany) require you to use the _anonymizeIP function for Google Analytics. Otherwise you are not allowed to use it.
        anonymizeIP: true,
        // Optional parameter (default false) - Starts google analytics with cookies enabled. In some countries (such as Germany) this is not allowed.
        autoStartWithCookiesEnabled: false, 
        // Optional parameter - Configuration for react-ga and google analytics 
        reactGaOptions: {
            debug: true,
            gaOptions: {
                sampleRate: 100
            }
        }
      },
    },
    {
      resolve: `gatsby-plugin-cookiehub-banner`,
      options: {
          // The ID is part of the CookieHub URL: https://cookiehub.net/cc/YOUR_COOKIEHUB_ID.js
          cookieHubId: "31b140ff",
          // Optional parameter (default false) - Use new v2 API.
          cookieHubV2Api: false,
          // Categories configured with CookieHub
          categories: [
          { 
              categoryName: 'analytics', // Unique id of the category which is set by Cookiehub.
              cookieName: 'gatsby-plugin-google-analytics-gdpr_cookies-enabled' // Your custom cookie name
          },
          { 
              categoryName: 'marketing',
              cookieName: 'marketing-enabled'
          }
          ]
      }
  },
  {
    resolve: `gatsby-source-instagram-all`,
    options: {
      access_token: process.env.GATSBY_INSTAGRAM_TOKEN,
    }
  }, 
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
