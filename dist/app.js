/**
 * For must action being performed in the app,
 * the pondClient triggers an event to the window object.
 * To hook up on perform more actions you can add a listener to the window object.
 *
 * The LiveSocket object on the server has an emit function that can be used to send events to the client.
 */

window.addEventListener('pond-ready', event => {
    console.log('Pond is ready!', event.detail);
})

window.addEventListener('info', event => {
    console.log('Displaying alert!', event.detail);
});

window.addEventListener('navigate-start', event => {
    console.log('Navigating to', event.detail);
});

window.addEventListener('navigate-end', event => {
    console.log('Navigated to', event.detail);
});
