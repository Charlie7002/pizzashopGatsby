const nodemailer = require("nodemailer");

function generateOrderEmail({ order, total }) {
	return `<div>
  <h2>Your recent order for ${total}</h2>
  <p>Please start walking over, we will have your order ready in the next 20 min</p>
  <ul>
  ${order.map(
		(item) => `<li><img src="${item.thumbnail}" alt=${item.name}/>
  ${item.size} ${item.name}-${item.price}</li>`
  )}
  </ul>
<p>Your total <strong>${total}</strong></p>
<style>
ul{
  list-style:none;
}
</style>
  </div>`;
}

// create transport
const transporter = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: 587,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	},
});

exports.handler = async (event, context) => {
	const body = JSON.parse(event.body);
	// Check if they have filled out the honeypot
	if (body.trytry) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "Boop beep bop Robobot bye bye kiss error 69",
			}),
		};
	}
	// Validate the data coming in is correct
	const requiredFields = ["email", "name", "order"];

	for (const field of requiredFields) {
		console.log(`Checking that ${field} is good`);
		if (!body[field]) {
			return {
				statusCode: 400,
				body: JSON.stringify({
					message: `Oops! You are missing the ${field} field`,
				}),
			};
		}
	}

	// make sure they actually have items in that order
	if (!body.order.length) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: `Why would you order nothing?!`,
			}),
		};
	}

	// send the email
	const info = await transporter.sendMail({
		from: "Slick's Slices <slick@example.com>",
		to: `${body.name} <${body.email}>, orders@example.com`,
		subject: "New order!",
		html: generateOrderEmail({ order: body.order, total: body.total }),
	});
	return {
		statusCode: 200,
		body: JSON.stringify({ message: "Success" }),
	};
};
