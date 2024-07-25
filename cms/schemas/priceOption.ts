import { defineField } from 'sanity';

export default defineField({
  name : 'priceOption',
  title : 'Price Option',
  type : 'document',
  fields:[
<<<<<<< HEAD
    defineField({ name: 'name', title: 'name', type: 'string', }),
=======
    defineField({ name: 'title', title: 'Title', type: 'string', }),
>>>>>>> 18ba5bfbc7a801efed4378ff01e47a9e87751519
    defineField({ name: 'price', title: 'Price(USD)', type: 'number', }),
    defineField({ name: 'ticketApplicability', title: 'Ticket Applicability', type: 'string', }),
  ]
});
