import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      {
        id: "artsy",
        clientId: process.env.GRAVITY_CLIENT_ID,
        clientSecret: process.env.GRAVITY_CLIENT_SECRET,
        name: "Artsy",
        type: "oauth",
        authorization: process.env.GRAVITY_AUTHORIZE_URL,
        token: process.env.GRAVITY_TOKEN_URL,
        client: {
          token_endpoint_auth_method: "client_secret_post",
        },
        userinfo: {
          url: process.env.GRAVITY_USERINFO_URL,
          async request (context) {
            const response = await fetch(context.provider.userinfo.url, {
              headers: { "X-Access-Token": context.tokens.access_token } // override default of Authorization: Bearer ... token
            })
            return await response.json()
          }
        },
        profile(profile) {
          return {
            id: profile?.id,
            name: profile?.name,
            email: profile?.email
          }
        },
      }
    // ...add more providers here
    ],
})
