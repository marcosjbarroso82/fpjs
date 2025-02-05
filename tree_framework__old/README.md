# Tree Framework
This is a framework for building web apps through a process of applying controller sequentially to an app model.

## Resources
- https://raw.githubusercontent.com/linq2js/immhelper/refs/heads/master/readme.md

## TODO
- [ ] Toggle Automatic Excution of Messages.
- [ ] Use a *Factory* to apply common logic to the controllers like "quick return" if the message has been executed or if the prefix of the message is not relevant to the controller.
- [x] Nested sequence of execution of controllers.
- [ ] Cuando un controlador hace su trabajo y deja un nextMsg, este nextMsg debe ser proveido en un factory.
- [ ] Implement a "Control Panel" to send messages from outside the app.
- [ ] Create a PAUSE and PLAY button to control the execution of the controllers.
- [ ] Use paths to get the value of a property from the appState.
- [ ] Implement the validation of schemas for imputs and outputs of controllers.
- [ ] Implement a *Timer* to emulate calls from outside the app.
