import { defineField, defineType } from "sanity";

export default defineType({
    name: 'city',
    title: 'City',
    type: 'document',
    fields :[
        defineField({name : 'name', title : 'Name', type : 'string'})        
    ]
})