import { defineField } from 'sanity';

export default defineField({
  name : 'priceOption',
  title : 'Price Option',
  type : 'document',
  fields:[
    defineField({ name: 'name', title: 'name', type: 'string', }),
    defineField({
      name: 'price',
      title: 'Price(USD)',
      type: 'number',
      validation: (Rule) => {
        return Rule.required();
      }
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      options: {
        list: [
          'Adult',
          'Kid',
          'Senior',
          'Minor',
          'General',
        ]
      }
    }),
    defineField({
      name: 'ticketApplicability',
      title: 'Ticket Applicability',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare: function(selection) {
      const { title } = selection;
      return {
        ...selection,
        title: title || 'untitled',
      };
    },
  },
});
