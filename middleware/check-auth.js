export default async ({ store }) => {
  await store.dispatch('core/authorize')
}
