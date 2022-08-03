const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

require("dotenv").config({
  path: `.env.${activeEnv}`,
})


module.exports = {
  siteMetadata: {
    title: 'Smartavillas - Holiday Rentals Villas and Apartments in the Eastern Algarve',
    description:
      'Smartavillas.com is a property management company which specialises in helping property owners to provide their guests with good quality accommodation - at affordable prices - in the Eastern Algarve, with Tavira being the focal point. With its spectacular scenery, sandy beaches, good food, friendly people and great golf, we can think of no other reason why you would choose to holiday anywhere else! If you are looking for the perfect holiday rental or are Property Owners wishing to offer your holiday home for rental, then look no further. We pride ourselves on tailoring our services to meet your needs. We are a small and friendly company that really puts you - the customer - first.',
    menuLinks: [
      {
        "name": {
          "en":"Home",
          "pt": "Início",
          "fr": "Accueil",
          "es": "Inicio"
        },
        "link": "/",
        "subNav": null
      },
      {
        "name": {
          "en":"Our Properties",
          "pt": "As nossas Propriedades",
          "fr":"Nos propriétés",
          "es":"Nuestras propiedades"
        },
        "link": "",
        "subNav": [{
          "name":{
            "en":"propertiesList",
            "pt":"propertiesList",
            "fr":"propertiesList",
            "es":"propertiesList"
          }
        }]
      },
      {
        "name": {
          "en":"Our Business",
          "pt": "A nossa empresa",
          "fr":"Nos activités",
          "es":"Nuestro negocio"
        },
        "link": "/team/",
        "subNav": [{
          "name": {
            "en":"Why Book With Us?",
            "pt": "Porquê reservar conosco?",
            "fr":"Pourquoi réserver avec nous?",
            "es":"¿Por qué reservar con nosotros?"
          },
          "link": "/whyBookSmartavillas",
        },
        {
          "name": {
            "en":"List Your Property",
            "pt": "Liste Sua Propriedade",
            "fr":"Inscrivez votre propriété",
            "es":"Registre su propiedad"
          },
          "link": "/ListWithUs",
        },
        {
          "name": {
            "en":"Meet the Team",
            "pt": "A nossa equipa",
            "fr":"Rencontrez l'équipe",
            "es":"Nuestro equipo"
          },
          "link": "/team",
        },
        ]
      },
      {
        "name": {
          "en":"Traveller Tips",
          "pt": "Dicas de viagem",
          "fr":"Conseils aux voyageurs",
          "es":"Consejos de viaje"
        },
        "link": "/travelerTips/",
        "subNav": null
      },
      {
        "name": {
          "en":"Holiday Extras",
          "pt": "Extras de férias",
          "fr":"Suppléments de vacances",
          "es":"Primas de vacaciones"
        },
        "link": "",
        "subNav": [{
          "name": {
            "en":"Airport Transfers",
            "pt": "Transferes de Aeroporto",
            "fr":"Transferts aéroport",
            "es":"Translados al Aeropuerto"
          },
          "link": "/holidayExtras/airport-transfers",
        },{
          "name": {
            "en":"Car Hire",
            "pt": "Aluguer de viaturas",
            "fr":"Location de voiture",
            "es":"Alquiler de vehiculos"
          },
          "link": "/holidayExtras/car-hire",
        },{
          "name": {
            "en":"Food Packs",
            "pt": "Pacotes de Alimentos",
            "fr":"Paquets de Repas",
            "es":"Paquetes de Comida"
          },
          "link": "/holidayExtras/food-packs",
        },
      ]
      },
      {
        "name": {
          "en":"The Algarve",
          "pt": "O  Algarve",
          "fr":"L'Algarve",
          "es":"El algarve"
        },
        "link": "",
        "subNav": [
          {
          "name": {
            "en":"The Algarve",
            "pt": "O  Algarve",
            "fr":"L'Algarve",
            "es":"El algarve"
          },
          "link": "/location/algarve",
          },
          {
            "name": {
              "en":"Tavira",
              "pt": "Tavira",
              "fr":"Tavira",
              "es":"Tavira"
            },
            "link": "/location/tavira",
          },
          {
            "name": {
              "en":"Altura",
              "pt": "Altura",
              "fr":"Altura",
              "es":"Altura"
            },
            "link": "/location/altura",
          },
          {
            "name": {
              "en":"Cabanas & Conceicao De Tavira",
              "pt": "Cabanas e Conceição De Tavira",
              "fr":"Cabanas e Conceição De Tavira",
              "es":"Cabanas e Conceição De Tavira"
            },
            "link": "/location/cabanasConceicaoDeTavira",
          },
          {
            "name": {
              "en":"Cacela Velha",
              "pt": "Cacela Velha",
              "fr":"Cacela Velha",
              "es":"Cacela Velha"
            },
            "link": "/location/cacelaVelha",
          },
          {
            "name": {
              "en":"Castro Marim",
              "pt": "Castro Marim",
              "fr":"Castro Marim",
              "es":"Castro Marim"
            },
            "link": "/location/castroMarim",
          },
          {
            "name": {
              "en":"Corte Antonio Martins",
              "pt": "Corte Antonio Martins",
              "fr":"Corte Antonio Martins",
              "es":"Corte Antonio Martins"
            },
            "link": "/location/corteAntonioMartins",
          },
          {
            "name": {
              "en":"Fuzeta",
              "pt": "Fuzeta",
              "fr":"Fuzeta",
              "es":"Fuzeta"
            },
            "link": "/location/fuzeta",
          },
          {
            "name": {
              "en":"Manta Rota",
              "pt": "Manta Rota",
              "fr":"Manta Rota",
              "es":"Manta Rota"
            },
            "link": "/location/mantaRota",
          },
          {
            "name": {
              "en":"Moncarapacho",
              "pt": "Moncarapacho",
              "fr":"Moncarapacho",
              "es":"Moncarapacho"
            },
            "link": "/location/moncarapacho",
          },
          {
            "name": {
              "en":"Santa Catarina",
              "pt": "Santa Catarina",
              "fr":"Santa Catarina",
              "es":"Santa Catarina"
            },
            "link": "/location/santaCatarina",
          },
          {
            "name": {
              "en":"Santo Estevao",
              "pt": "Santo Estevao",
              "fr":"Santo Estevao",
              "es":"Santo Estevao"
            },
            "link": "/location/santoEstevao",
          },
          {
            "name": {
              "en":"Santa Luzia",
              "pt": "Santa Luzia",
              "fr":"Santa Luzia",
              "es":"Santa Luzia"
            },
            "link": "/location/santaLuzia",
          },
          {
            "name": {
              "en":"Vila Nova De Cacela",
              "pt": "Vila Nova De Cacela",
              "fr":"Vila Nova De Cacela",
              "es":"Vila Nova De Cacela"
            },
            "link": "/location/vilaNovaDeCacela",
          },
        ]
      },
      {
        "name": {
          "en":"Contact Us",
          "pt": "Contate-Nos",
          "fr":"Nous contacter",
          "es":"Contáctenos"
        },
        "link": "/contact",
        "subNav": null
      },
    ],
    siteUrl: `https://www.smartavillas.com`,
    },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: ['/tags/'],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage(filter: {context: {i18n: {routed: {eq: false}}}}) {
              edges {
                node {
                  context {
                    i18n {
                      defaultLanguage
                      languages
                      originalPath
                    }
                  }
                  path
                }
              }
            }
          }
        `,
        serialize: ({site, allSitePage}) => {
          return allSitePage.edges.map((edge) => {
            const {languages, originalPath, defaultLanguage} = edge.node.context.i18n;
            const {siteUrl} = site.siteMetadata;
            const url = siteUrl + originalPath;
            const links = [
              {lang: defaultLanguage, url},
              {lang: 'x-default', url}
            ];
            languages.forEach((lang) => {
              if (lang === defaultLanguage) return;
              links.push({lang, url: `${siteUrl}/${lang}${originalPath}`});
            });
            return {
              url,
              changefreq: 'daily',
              priority: originalPath === '/' ? 1.0 : 0.7,
              links
            };
          });
        }
      }
    },
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/locales`,
        name: `locale`
      }
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
        languages: [`en`, `pt`, `fr`, `es`],
        defaultLanguage: `en`,
        // if you are using Helmet, you must include siteUrl, and make sure you add http:https
        siteUrl: `https://www.smartavillas.com`,
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
    },
    {
      resolve: `gatsby-plugin-react-redux`,
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
          ignoreFunction: true,
        },
        // [optional] - if true will clean up after itself on the client, default:
        cleanupOnClient: true,
        // [optional] - name of key on `window` where serialized state will be stored, default:
        windowKey: '__PRELOADED_STATE__',
      }
    },
    `gatsby-plugin-image`,
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`],
          quality: 90,
          placeholder: `dominantColor`,
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
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
        trackingId: process.env.GATSBY_GOOGLE_TRACKING_ID, 
        // Optional parameter (default false) - Enable analytics in development mode.
        enableDevelopment: false, // default false
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
      },
    },
    {
      resolve: `gatsby-plugin-cookiehub-banner`,
      options: {
          // The ID is part of the CookieHub URL: https://cookiehub.net/cc/YOUR_COOKIEHUB_ID.js
          cookieHubId: process.env.GATSBY_COOKIEHUB_ID,
          // Optional parameter (default false) - Use new v2 API.
          cookieHubV2Api: true,
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
  {
    resolve: "gatsby-plugin-firebase",
    options: {
      credentials: {
        apiKey: "AIzaSyAm328dRbonZ0xgqClzsgjsJmxFFJ5xOVE",
        authDomain: "gatsby-test-286520.firebaseapp.com",
        databaseURL: "https://gatsby-test-286520.firebaseio.com",
        projectId: "gatsby-test-286520",
        storageBucket: "gatsby-test-286520.appspot.com",
        messagingSenderId: "563210852511",
        appId: "1:563210852511:web:49d5d7956244ea13602aaa",
        measurementId: "G-S6HYLDYXK0"
      }
    }
  },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
