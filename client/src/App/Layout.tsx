import NavBar from "./NavBar"

export default function Layout({ children }: any) {
  return (
    <div>
      <NavBar />

      {children}
    </div>
  )
}
