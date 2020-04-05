// middleware to test if a company uuid is passed as a query string on the url
export default function({ route, redirect }) {
  const { id } = route.query
  const regex = RegExp(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  )
  if (!route.query.id || !regex.test(id)) redirect('/tools')
}
