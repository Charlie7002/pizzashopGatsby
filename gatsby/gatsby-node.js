import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  const PizzaTemplate = path.resolve('./src/templates/Pizza.js');
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: PizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

// try
// async function turnSingleSlicemasterIntoPages({ graphql, actions }) {
//   const SliceMasterTemplate = path.resolve('./src/templates/SliceMaster.js');
//   const { data } = await graphql(`
//     query {
//       slicemasters: allSanityPerson {
//         nodes {
//           name
//           slug {
//             current
//           }
//         }
//       }
//     }
//   `);
//   data.slicemasters.nodes.forEach((person) => {
//     actions.createPage({
//       path: `slicemasters/${person.slug.current}`,
//       component: SliceMasterTemplate,
//       context: {
//         slug: person.slug.current,
//       },
//     });
//   });
// }
// try

async function turnToppingsIntoPages({ graphql, actions }) {
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
      },
    });
  });
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  const baseURL = 'https://api.sampleapis.com/beers/ale';
  const res = await fetch(baseURL);
  const beers = await res.json();

  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

async function turnSliceMasterIntoPages({ graphql, actions }) {
  const SliceMasterTemplate = path.resolve('./src/templates/SliceMaster.js');
  const { data } = await graphql(`
    query {
      persons: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  data.persons.nodes.forEach((person) => {
    actions.createPage({
      path: `slicemasters/${person.slug.current}`,
      component: SliceMasterTemplate,
      context: {
        name: person.name,
        slug: person.slug.current,
      },
    });
  });

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.persons.totalCount / pageSize);

  Array.from({ length: pageCount }).forEach((_, i) => {
    console.log(`creating page${i}`);
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

export async function sourceNodes(params) {
  // fetch list of beers and source them into gatsby api
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSliceMasterIntoPages(params),
    // turnSingleSlicemasterIntoPages(params),
  ]);
}
