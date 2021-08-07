import { useRouter } from "next/dist/client/router"
import React from "react"
import Layout from "app/core/layouts/Layout"

export const Page: React.VFC = () => {
  const router = useRouter()
  const { state, city } = router.query

  return (
    <Layout>
      <h2>
        {state}, {city}
      </h2>
    </Layout>
  )
}

export default Page
