import { AuthenticationError, Link, useMutation, Routes } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import React, { useCallback } from "react"
import { Button, List, ListItem, TextField } from "@material-ui/core"
import { useState } from "react"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const [error, setError] = useState<null | AuthenticationError>(null)

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault()
      const values = {
        email: event.target.email.value,
        password: event.target.password.value,
      }
      try {
        await loginMutation(values)
      } catch (err) {
        if (err instanceof AuthenticationError) {
          setError(err)
        }
      }
    },
    [loginMutation]
  )

  return (
    <form onSubmit={onSubmit} style={{ width: 400 }}>
      <List>
        <ListItem>
          <h2>ログイン</h2>
        </ListItem>
        <ListItem>
          <TextField
            type="email"
            id="email"
            name="email"
            required
            label="メールアドレス"
            variant="outlined"
            placeholder="example@example.com"
            fullWidth
          />
        </ListItem>
        <ListItem>
          <TextField
            type="password"
            id="password"
            name="password"
            required
            label="パスワード"
            variant="outlined"
            placeholder="********"
            fullWidth
          />
        </ListItem>
        {error && (
          <ListItem role="alert" style={{ color: "red" }}>
            メールアドレスまたはパスワードが間違っています
          </ListItem>
        )}
        <ListItem>
          <Button type="submit" variant="contained" color="primary">
            ログイン
          </Button>
        </ListItem>
        <ListItem>
          <span style={{ marginTop: "2rem" }}>
            <Link href={Routes.ForgotPasswordPage()}>
              <a>パスワードを忘れた？</a>
            </Link>
          </span>
        </ListItem>
        <ListItem>
          <span style={{ marginTop: "0.5rem" }}>
            または <Link href={Routes.SignupPage()}>ユーザー登録</Link>
          </span>
        </ListItem>
      </List>
    </form>
  )
}

export default LoginForm
