import React from "react";
import { graphql } from "gatsby";
import PizzaList from "../components/PizzaList";
import ToppingFilter from "../components/ToppingFilter";
import SEO from "../components/SEO";
import Layout from "../components/Layout";

export default function PizzasPage({ data, pageContext }) {
	const pizzas = data.pizzas.nodes;
	return (
		<Layout>
			<SEO title={pageContext.topping ? `Pizzas width ${pageContext.topping}` : `All Pizzas`} />
			<ToppingFilter activeTopping={pageContext.topping} />
			<PizzaList pizzas={pizzas} />
		</Layout>
	);
}

export const query = graphql`
	query PizzaQuery($topping: [String]) {
		pizzas: allSanityPizza(filter: { topping: { elemMatch: { name: { in: $topping } } } }) {
			nodes {
				name
				id
				slug {
					current
				}
				topping {
					id
					name
				}
				image {
					asset {
						fluid(maxWidth: 400) {
							...GatsbySanityImageFluid
						}
					}
				}
			}
		}
	}
`;
