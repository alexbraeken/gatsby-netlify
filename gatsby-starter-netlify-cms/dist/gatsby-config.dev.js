"use strict";

var activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

require("dotenv").config({
  path: ".env.".concat(activeEnv)
});

module.exports = {
  siteMetadata: {
    title: 'Smartavillas - Holiday Rentals Villas and Apartments in the Eastern Algarve',
    description: 'Smartavillas.com specialise in helping Property Owners to provide their guests with good quality accommodation - at affordable prices - in the Eastern Algarve, with Tavira being the focal point. With its spectacular scenery, sandy beaches, good food, friendly people and great golf, we can think of no other reason why you would choose to holiday anywhere else! If you are looking for the perfect holiday rental or are Property Owners wishing to offer your holiday home for rental, then look no further. We pride ourselves on tailoring our services to meet your needs. We are a small and friendly company that really puts you - the customer - first.',
    menuLinks: [{
      "name": {
        "en": "Home",
        "pt": "Início"
      },
      "link": "/",
      "subNav": null
    }, {
      "name": {
        "en": "Our Properties",
        "pt": "As nossas Propriedades"
      },
      "link": "",
      "subNav": [{
        "name": {
          "en": "propertiesList",
          "pt": "propertiesList"
        }
      }]
    }, {
      "name": {
        "en": "Our Business",
        "pt": "A nossa empresa"
      },
      "link": "/team/",
      "subNav": [{
        "name": {
          "en": "Why Book With Us?",
          "pt": "Porquê reservar conosco?"
        },
        "link": "/whyBookSmartavillas"
      }, {
        "name": {
          "en": "List Your Property",
          "pt": "Liste Sua Propriedade"
        },
        "link": "/ListWithUs"
      }, {
        "name": {
          "en": "Meet the Team",
          "pt": "A nossa equipa"
        },
        "link": "/team"
      }]
    }, {
      "name": {
        "en": "Traveller Tips",
        "pt": "Dicas de viagem"
      },
      "link": "/travelerTips/",
      "subNav": null
    }, {
      "name": {
        "en": "Holiday Extras",
        "pt": "Extras de férias"
      },
      "link": "",
      "subNav": [{
        "name": {
          "en": "Airport Transfers",
          "pt": "Transferes de Aeroporto"
        },
        "link": "/holidayExtras/airport-transfers"
      }, {
        "name": {
          "en": "Car Hire",
          "pt": "Aluguer de viaturas"
        },
        "link": "/holidayExtras/car-hire"
      }, {
        "name": {
          "en": "Food Packs",
          "pt": "Pacotes de Alimentos"
        },
        "link": "/holidayExtras/food-packs"
      }]
    }, {
      "name": {
        "en": "The Algarve",
        "pt": "O  Algarve"
      },
      "link": "",
      "subNav": [{
        "name": {
          "en": "The Algarve",
          "pt": "O  Algarve"
        },
        "link": "/location/algarve"
      }, {
        "name": {
          "en": "Tavira",
          "pt": "Tavira"
        },
        "link": "/location/tavira"
      }, {
        "name": {
          "en": "Altura",
          "pt": "Altura"
        },
        "link": "/location/altura"
      }, {
        "name": {
          "en": "Cabanas & Conceicao De Tavira",
          "pt": "Cabanas e Conceição De Tavira"
        },
        "link": "/location/cabanasConceicaoDeTavira"
      }, {
        "name": {
          "en": "Cacela Velha",
          "pt": "Cacela Velha"
        },
        "link": "/location/cacelaVelha"
      }, {
        "name": {
          "en": "Castro Marim",
          "pt": "Castro Marim"
        },
        "link": "/location/castroMarim"
      }, {
        "name": {
          "en": "Corte Antonio Martins",
          "pt": "Corte Antonio Martins"
        },
        "link": "/location/corteAntonioMartins"
      }, {
        "name": {
          "en": "Fuzeta",
          "pt": "Fuzeta"
        },
        "link": "/location/fuzeta"
      }, {
        "name": {
          "en": "Manta Rota",
          "pt": "Manta Rota"
        },
        "link": "/location/mantaRota"
      }, {
        "name": {
          "en": "Moncarapacho",
          "pt": "Moncarapacho"
        },
        "link": "/location/moncarapacho"
      }, {
        "name": {
          "en": "Santa Catarina",
          "pt": "Santa Catarina"
        },
        "link": "/location/santaCatarina"
      }, {
        "name": {
          "en": "Santo Estevao",
          "pt": "Santo Estevao"
        },
        "link": "/location/santoEstevao"
      }, {
        "name": {
          "en": "Santa Luzia",
          "pt": "Santa Luzia"
        },
        "link": "/location/santaLuzia"
      }, {
        "name": {
          "en": "Vila Nova De Cacela",
          "pt": "Vila Nova De Cacela"
        },
        "link": "/location/vilaNovaDeCacela"
      }]
    }, {
      "name": {
        "en": "Contact Us",
        "pt": "Contate-Nos"
      },
      "link": "/contact",
      "subNav": null
    }],
    siteUrl: "https://www.smartavillas.com"
  },
  plugins: ['gatsby-plugin-react-helmet', 'gatsby-plugin-sass', {
    resolve: "gatsby-plugin-sitemap",
    options: {
      excludes: ['/tags/']
    }
  }, {
    // keep as first gatsby-source-filesystem plugin for gatsby image support
    resolve: 'gatsby-source-filesystem',
    options: {
      path: "".concat(__dirname, "/public"),
      name: 'uploads'
    }
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: "".concat(__dirname, "/src/pages"),
      name: 'pages'
    }
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: "".concat(__dirname, "/src/activities"),
      name: 'activities'
    }
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: "".concat(__dirname, "/src/algarveSlides"),
      name: 'algarveSlides'
    }
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: "".concat(__dirname, "/src/teamMembers"),
      name: 'teamMembers'
    }
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: "".concat(__dirname, "/src/testimonials"),
      name: 'testimonials'
    }
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: "".concat(__dirname, "/src/ownerTestimonials"),
      name: 'ownerTestimonials'
    }
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: "".concat(__dirname, "/src/newsAlert"),
      name: 'newsAlert'
    }
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: "".concat(__dirname, "/static/img"),
      name: 'images'
    }
  }, {
    resolve: "gatsby-source-filesystem",
    options: {
      path: "".concat(__dirname, "/src/locales"),
      name: "locale"
    }
  }, {
    resolve: "gatsby-plugin-react-i18next",
    options: {
      localeJsonSourceName: "locale",
      // name given to `gatsby-source-filesystem` plugin.
      languages: ["en", "pt"],
      defaultLanguage: "en",
      // if you are using Helmet, you must include siteUrl, and make sure you add http:https
      siteUrl: "https://www.smartavillas.com",
      // you can pass any i18next options
      // pass following options to allow message content as a key
      i18nextOptions: {
        interpolation: {
          escapeValue: false // not needed for react as it escapes by default

        },
        keySeparator: false,
        nsSeparator: false
      }
    }
  }, {
    resolve: "gatsby-plugin-react-redux",
    options: {
      // [required] - path to your createStore module
      pathToCreateStoreModule: './src/state/createStore',
      // [optional] - options passed to `serialize-javascript`
      // info: https://github.com/yahoo/serialize-javascript#options
      // will be merged with these defaults:
      serialize: {
        space: 0,
        // if `isJSON` is set to `false`, `eval` is used to deserialize redux state,
        // otherwise `JSON.parse` is used
        isJSON: true,
        unsafe: false,
        ignoreFunction: true
      },
      // [optional] - if true will clean up after itself on the client, default:
      cleanupOnClient: true,
      // [optional] - name of key on `window` where serialized state will be stored, default:
      windowKey: '__PRELOADED_STATE__'
    }
  }, 'gatsby-plugin-sharp', 'gatsby-transformer-sharp', {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [{
        resolve: 'gatsby-remark-relative-images',
        options: {
          name: 'uploads'
        }
      }, {
        resolve: 'gatsby-remark-images',
        options: {
          // It's important to specify the maxWidth (in pixels) of
          // the content container as this plugin uses this as the
          // base for generating different widths of each image.
          maxWidth: 2048
        }
      }, {
        resolve: 'gatsby-remark-copy-linked-files',
        options: {
          destinationDir: 'static'
        }
      }]
    }
  }, {
    resolve: "gatsby-plugin-create-client-paths",
    options: {
      prefixes: ["/property/*"]
    }
  }, {
    resolve: 'gatsby-plugin-netlify-cms',
    options: {
      modulePath: "".concat(__dirname, "/src/cms/cms.js")
    }
  }, {
    resolve: 'gatsby-plugin-purgecss',
    // purges all unused/unreferenced css rules
    options: {
      develop: true,
      // Activates purging in npm run develop
      purgeOnly: ['/all.sass'] // applies purging only on the bulma css file

    }
  }, // must be after other CSS plugins
  {
    resolve: "gatsby-plugin-google-analytics-gdpr",
    options: {
      // The property ID; the tracking code won't be generated without it.
      trackingId: process.env.GATSBY_GOOGLE_TRACKING_ID,
      // Optional parameter (default false) - Enable analytics in development mode.
      enableDevelopment: false,
      // default false
      // Optional parameter (default true) - Some countries (such as Germany) require you to use the _anonymizeIP function for Google Analytics. Otherwise you are not allowed to use it.
      anonymizeIP: true,
      // Optional parameter (default false) - Starts google analytics with cookies enabled. In some countries (such as Germany) this is not allowed.
      autoStartWithCookiesEnabled: false,
      // Optional parameter - Configuration for react-ga and google analytics 
      reactGaOptions: {
        debug: false,
        gaOptions: {
          sampleRate: 100
        }
      }
    }
  }, {
    resolve: "gatsby-plugin-cookiehub-banner",
    options: {
      // The ID is part of the CookieHub URL: https://cookiehub.net/cc/YOUR_COOKIEHUB_ID.js
      cookieHubId: process.env.GATSBY_COOKIEHUB_ID,
      // Optional parameter (default false) - Use new v2 API.
      cookieHubV2Api: true,
      // Categories configured with CookieHub
      categories: [{
        categoryName: 'analytics',
        // Unique id of the category which is set by Cookiehub.
        cookieName: 'gatsby-plugin-google-analytics-gdpr_cookies-enabled' // Your custom cookie name

      }, {
        categoryName: 'marketing',
        cookieName: 'marketing-enabled'
      }]
    }
  }, {
    resolve: "gatsby-source-instagram-all",
    options: {
      access_token: process.env.GATSBY_INSTAGRAM_TOKEN
    }
  }, 'gatsby-plugin-netlify' // make sure to keep it last in the array
  ]
};