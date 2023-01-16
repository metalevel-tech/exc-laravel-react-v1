# Description

## Outlets in Layouts

The child roots of the base elements - e.g. `<DefaultLayout />` or `<GuestLayout />` (see [`router.jsx`](../router.jsx)) will be rendered in the the place of the `<Outlet />` component. While the rest of the code defined within the layouts will be persistent.

- Here is an example how to use `<Outlet />` with `<Routes>` (without using `createBrowserRouter()` as it is in our code): <https://reactrouter.com/en/main/components/outlet>

## GuestLayout

See the [`_description.md`](../views/_description.md) in the `views/` directory.
