# Description

## Views

In this project: `views` are all React components that are rendered by the router at specific route. They are the main components of the application. The can me called also pages.

## GuestLayout

The layout tags (first 2 `<div>`) can be moved to the `<GuestLayout>` component, but we will lost the animation: `<https://youtu.be/qJq9ZMB2Was?t=3464>` We can create a state in the `<GuestLayout>` component, and pass it to the `<Login>` and `<Signup>` components, where it will be changed to trigger rendering of the parent and the animation will be triggered too.
