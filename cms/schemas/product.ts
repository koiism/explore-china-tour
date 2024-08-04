import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => {
        return Rule.required();
      },
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [ { type: 'image' } ]
    }),
    defineField({
      name: 'ticketOptions',
      title: 'Ticket Options',
      type: 'array',
      of: [ defineArrayMember({
        name: 'ticketOption',
        title: 'Ticket Option',
        type: 'object',
        fields: [
          defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
          }),
          defineField({
            name: 'description',
            title: 'Option Descrption',
            type: 'text',
          }),
          defineField({
            name : 'entryTime',
            title : 'Entry Time',
            type : 'array',
            of : [ { type : 'string' } ]
          }),
          defineField({
            name : 'dateRange',
            title : 'Date Range',
            type : 'object',
            fields :[
              defineField({ name: 'startDate', title : 'Start Date', type :'date' }),
              defineField({ name: 'endDate', title : 'End Date', type :'date' }),
              defineField({ name: 'closedDate', title : 'Closed Date(Mon to Sun)', type : 'string' })
            ]
          }),
          defineField({
            name : 'priceOptions',
            title : 'Price Option',
            type : 'array',
            of : [ defineArrayMember({
              name : 'priceOption',
              title : 'Price Option',
              type : 'reference',
              to : [ { type : 'priceOption' } ]
            }) ]
          }) ],
      }) ],
    }),
    defineField({
      name : 'userInfo',
      title : 'User Info',
      type : 'array',
      of : [{type : 'string'}],
      options :{list:['name', 'passport', 'birthday']},
      initialValue:['name', 'passport', 'birthday']
    }),
    defineField({
      name : 'city',
      title : 'City',
      type : 'reference',
      to : [ { type : 'city' } ]
    }),
    defineField({
      name : 'category',
      title : 'Category',
      type : 'reference',
      to : [ { type : 'category' } ]
    }),
    defineField({
      name: 'openingTime',
      title: 'Opening Time',
      type: 'array',
      of: [ defineArrayMember({
        name: 'detail',
        title: 'Detail',
        type: 'object',
        fields: [
          defineField({ name : 'desc', title: 'Desc', type : 'string' }),
          defineField({ name : 'start', title: 'Start', type : 'string' }),
          defineField({ name : 'end', title: 'End', type : 'string' }),
        ]
      }) ]
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'geopoint',
    }),
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'text',
    }),
    defineField({
      name: 'enterInfo',
      title: 'Enter Infomation',
      type: 'object',
      fields : [
        defineField({ name : 'whatToBring', title : 'What to Bring', type : 'text' }),
        defineField({ name : 'howToUseTickets', title : 'How to Use The Ticket', type : 'blockContent' }),
        defineField({ name : 'freeTicketPolicy', title : 'Free Ticket Policy', type : 'blockContent' })
      ]
    }),
    defineField({
      name: 'notAllowed',
      title: 'Not Allowed',
      type: 'blockContent',
    }),
    defineField({
      name: 'notice',
      title: 'Notice',
      type: 'blockContent',
    }),
    defineField({
      name: 'cancelRelativeTime',
      title: 'Cancel Relative Time',
      type: 'number',
      validation: (rule) => {
        return rule.integer().positive();
      }
    }),

  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'image.0.asset'
    },
    prepare: function(selection) {
      const { author, title } = selection;
      return {
        ...selection,
        title: title || 'untitled',
        subtitle: author && `by ${author}`
      };
    },
  },
});


