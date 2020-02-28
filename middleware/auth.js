export default function({ app, route, redirect }) {
  app.$auth().onAuthStateChanged((user) => {
    if(route.path !== '/') {
      if(!user) redirect('/')
    }
  })
}
