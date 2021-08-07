import React from "react"
import { BlitzPage, useMutation, Routes, Link } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { List, ListItem } from "@material-ui/core"
import { states } from "detect-location-jp"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <Layout>
      <h2>ハートフルマップへようこそ！</h2>
      <p>
        <Link href="/auth/signup">ユーザー登録</Link>
        または
        <Link href="/auth/login">ログイン</Link>
        することで、口コミの投稿ができます。
      </p>
      <p>都道府県を選択してください。</p>
      <List>
        {states
          .sort((a, b) => {
            return parseInt(a.code) - parseInt(b.code)
          })
          .map((state) => {
            return (
              <ListItem key={state.id} component="a" href={"/place/" + state.state_ja}>
                {state.code} {state.state_ja}
              </ListItem>
            )
          })}
      </List>
    </Layout>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
