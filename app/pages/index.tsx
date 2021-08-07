import React, { Suspense } from "react"
import { Link } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { List, ListItem } from "@material-ui/core"
import { states } from "detect-location-jp"

const UserInfo: React.VFC = () => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return <p>{currentUser.email} としてログイン中です</p>
  } else {
    return (
      <p>
        <Link href="/signup">ユーザー登録</Link>
        または
        <Link href="/login">ログイン</Link>
        することで、口コミの投稿ができます。
      </p>
    )
  }
}

const Home: React.VFC = () => {
  return (
    <Layout>
      <h2>ハートフルマップへようこそ！</h2>
      <Suspense fallback={<div>loading...</div>}>
        <UserInfo />
      </Suspense>
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

export default Home
