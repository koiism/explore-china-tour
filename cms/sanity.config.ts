import {media} from 'sanity-plugin-media'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemas'
import {presentationTool, DocumentLocationResolver} from 'sanity/presentation'
import {Observable, map} from 'rxjs'
import {documentInternationalization} from '@sanity/document-internationalization'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'


export const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
export const dataset = process.env.SANITY_STUDIO_DATASET!

const locate: DocumentLocationResolver = (params, context) => {
  const {documentStore} = context

  if (params.type === 'post') {
    // Listen to the query and fetch the draft and published document
    const doc$ = documentStore.listenQuery(`*[_id == $id][0]{slug,title}`, params, {
      perspective: 'previewDrafts',
    }) as Observable<{
      slug: {current: string | null} | null
      title: string | null
    } | null>

    return doc$.pipe(
      map((doc) => {
        if (!doc || !doc.slug?.current) return null

        return {
          locations: [
            {
              title: doc.title || 'Untitled',
              href: `/post/${doc.slug.current}`,
            },
            {
              title: 'Posts',
              href: `/`,
            },
          ],
        }
      }),
    )
  }

  return null
}

export default defineConfig({
  name: 'project-name',
  title: 'Project Name',
  projectId,
  dataset,
  plugins: [
    documentInternationalization({
      // Required configuration
      supportedLanguages: [
        {id: 'en', title: 'English'},
        {id: 'zh-cn', title: '简体中文'},
      ],
      schemaTypes: ['post'],
    }),
    internationalizedArray({
      languages: [
        {id: 'en', title: 'English'},
        {id: 'fr', title: 'French'}
      ],
      defaultLanguages: ['en'],
      fieldTypes: ['string', 'text'],
    }),
    structureTool(),
    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000',
        previewMode: {
          enable: '/preview/enable',
          disable: '/preview/disable',
        },
      },
      locate,
    }),
    visionTool(),
    media(),
  ],
  schema: {
    types: schemaTypes,
  },
})
