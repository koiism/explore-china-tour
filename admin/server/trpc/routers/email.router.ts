import process from 'node:process'
import nodemailer from 'nodemailer'
import { render } from '@vue-email/render'
import { mapValues } from 'es-toolkit'
import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { zEmailOptionsBase, zEmailOptionsDefault } from './zods/email'
import { emailTemplates } from '~/app/components/Email/Template'

const EMAIL_HOST = process.env.EMAIL_HOST
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD

const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  auth: {
    user: EMAIL_HOST,
    pass: EMAIL_PASSWORD,
  },
  secure: false,
  tls: { rejectUnauthorized: false },
})

function mailRouterGenerator() {
  return mapValues(emailTemplates, (template) => {
    const inputSchema = z.object({
      option: template.schema,
    }).merge(zEmailOptionsBase)
    return publicProcedure
      .input(inputSchema)
      .query((opts) => {
        const { to, subject, text, from = EMAIL_HOST, option } = opts.input
        render(template.template, { option }).then((html) => {
          const mailOptions = {
            from,
            to,
            subject,
            text,
            html,
          }
          return transporter.sendMail(mailOptions)
        })
      })
  })
}

const templateRouters = mailRouterGenerator()

const send = publicProcedure
  .input(zEmailOptionsDefault)
  .query((opts) => {
    const { to, subject, text, html, from = EMAIL_HOST } = opts.input
    const mailOptions = {
      from,
      to,
      subject,
      text,
      html,
    }
    return transporter.sendMail(mailOptions)
  })

export const EmailRouter = router({
  email: router({
    send,
    ...templateRouters,
  }),
})
