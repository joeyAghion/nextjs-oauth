import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { authenticatedPost } from "openid-client/lib/helpers/client"

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
          authorization: "https://stagingapi.artsy.net/oauth2/authorize",
          token: {
            url: "https://stagingapi.artsy.net/oauth2/access_token",
            async request(context) {
              console.log("context", context) //DEBUG
              // context contains useful properties to help you make the request.
              // const tokens = await makeTokenRequest(context)

              const response = await authenticatedPost.call(
                context.client,
                'token',
                {
                  form: body,
                  responseType: 'json',
                },
                { clientAssertionPayload, DPoP },
              );
              let responseBody;

              return {} //{ tokens }
            }
          },
          client: {
            token_endpoint_auth_method: "client_secret_post",
          },
          userinfo: "https://stagingapi.artsy.net/api/v1/me",
          profile(profile) {
            return {
              id: profile.id,
              name: profile.name,
              email: profile.email
            }
          },
        }
    // ...add more providers here
    ],
})
