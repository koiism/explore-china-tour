import { defineField } from 'sanity';

export default defineField({
  name : 'priceOption',
  title : 'Price Option',
  type : 'document',
  fields:[
    defineField({ name: 'name', title: 'name', type: 'string', }),
    defineField({ name: 'price', title: 'Price(USD)', type: 'number', }),
    defineField({ name: 'ticketApplicability', title: 'Ticket Applicability', type: 'string', }),
  ]
});
