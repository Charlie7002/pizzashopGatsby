import { MdLocalPizza as icon } from 'react-icons/md';
import priceInput from '../components/PriceInput';

export default {
  name: 'pizza',
  title: 'Pizzas',
  type: 'document',

  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizzas',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLenght: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of pizza in cents',
      validation: (Rule) => Rule.min(1000).max(50000),
      inputComponent: priceInput,
    },
    {
      name: 'topping',
      title: 'Topping',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      topping0: 'topping.0.name',
      topping1: 'topping.1.name',
      topping2: 'topping.2.name',
      topping3: 'topping.3.name',
    },
    prepare: ({ title, media, ...toppings }) => ({
      title,
      media,
      subtitle: Object.values(toppings).filter(Boolean).join(', '),
    }),
  },
};
