import React, { ReactNode, Suspense } from "react"
import { Head, Link } from "blitz"
import clsx from "clsx"
import { Container, IconButton, useTheme, Toolbar, AppBar, Drawer } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import { useStyles } from "./useStyle"
import { MyDrawer } from "./MyDrawer"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Head>
        <title>{title || "ハートフルマップ"}</title>
      </Head>
      <Container className={classes.root}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => {
                setOpen(!open)
              }}
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <h1>
              <Link href="/" passHref>
                <a style={{ color: "white", textDecoration: "none" }}>
                  {title || "ハートフルマップ"}
                </a>
              </Link>
            </h1>
          </Toolbar>
        </AppBar>
        <Drawer
          className={clsx(classes.drawer, {
            [classes.drawerShift]: open,
          })}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton
              onClick={() => {
                setOpen(!open)
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <MyDrawer />
          </Suspense>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {children}
        </main>
      </Container>
    </>
  )
}

export default Layout
