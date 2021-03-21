import { graphql, Link } from "gatsby";
import React from "react";
import Img from "gatsby-image";
import SEO from "../components/SEO";
import useForm from "../utils/useForm";
import calculatePizzaPrice from "../utils/calculatePizzaPrice";
import formatMoney from "../utils/formayMoney";
import OrderStyle from "../styles/OrderStyle";
import MenuItemStyles from "../styles/MenuItemStyles";
import usePizza from "../utils/usePizza";
import PizzaOrder from "../components/PizzaOrder";
import calculateOrderTotal from "../utils/calculateOrderTotal";
import Layout from "../components/Layout";
import styled from "styled-components";

const Beers = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: -30px auto 20px;
`;

export default function OrderPage({ data }) {
	const pizzas = data.pizzas.nodes;
	const { values, updateValue } = useForm({ name: "", email: "", trytry: "" });

	const { order, addToOrder, removeFromOrder, error, message, loading, submitOrder } = usePizza({
		pizzas,
		values,
	});
	if (message) {
		return <p>{message}</p>;
	}
	return (
		<Layout>
			<SEO title="Order a Pizza" />
			<Beers className="beers">
				<h3>Don't forget beers! (Dine in Only) &nbsp;: &nbsp; </h3>
				<Link to="/beers">
					<button> 🍻 See Ours Beers</button>
				</Link>
			</Beers>
			<OrderStyle onSubmit={submitOrder}>
				<fieldset className="info" disabled={loading}>
					<legend>Your Info</legend>
					<label htmlFor="name"> Name</label>
					<input type="text" name="name" value={values.name} onChange={updateValue} />

					<label htmlFor="email"> Email</label>
					<input type="email" name="email" id="email" value={values.email} onChange={updateValue} />
					{/* Pour la secu */}
					<input type="trytry" name="trytry" id="trytry" value={values.trytry} onChange={updateValue} className="trytry" />
				</fieldset>
				<fieldset className="menu">
					<legend>Menu</legend>

					{pizzas.map((pizza) => (
						<MenuItemStyles key={pizza.id}>
							<Img width="50" height="50" fluid={pizza.image.asset.fluid} alt={pizza.name} />
							<h2>{pizza.name}</h2>
							<div>
								{["S", "M", "L"].map((size) => (
									<button key={`${pizza.id}+${size}`} type="button" onClick={() => addToOrder({ id: pizza.id, size })}>
										{size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
									</button>
								))}
							</div>
						</MenuItemStyles>
					))}
				</fieldset>
				<fieldset className="order" disabled={loading}>
					<legend>Order</legend>
					<PizzaOrder order={order} removeFormOrder={removeFromOrder} pizzas={pizzas} />
				</fieldset>
				<fieldset disabled={loading}>
					<h3>Your Total is {formatMoney(calculateOrderTotal(order, pizzas))}</h3>
					<div>{error ? <p> Error {error}</p> : ""}</div>
					<button type="submit" disabled={loading}>
						{loading ? "Placing Order..." : "Order Ahead"}
					</button>
				</fieldset>
			</OrderStyle>
		</Layout>
	);
}

export const query = graphql`
	query {
		pizzas: allSanityPizza {
			nodes {
				name
				id
				slug {
					current
				}
				price
				image {
					asset {
						fluid(maxWidth: 100) {
							...GatsbySanityImageFluid
						}
					}
				}
			}
		}
	}
`;
