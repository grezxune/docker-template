import { InMemoryCache, makeVar } from '@apollo/client'

export const redirectPathOnAuthentication = makeVar('/')

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        redirectPathOnAuthentication: {
          read() {
            return redirectPathOnAuthentication()
          },
        },
      },
    },
  },
})
