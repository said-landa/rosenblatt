//main.rs contains imports, App, and engine startup.

use winit::event_loop::{ActiveEventLoop, ControlFlow, EventLoop}; //EventLoop prepares communication with the operating system; ControlFlow determines whether that loop waits or keeps cycling. use lets us write their short names. ActiveEventLoop provides access to the running event loop from inside those event-handling methods. We’ll use it to create the game window and eventually respond to a close request.
//EventLoop starts and drives event processing; ActiveEventLoop lets our application interact with that loop during callbacks.
use winit::window::{Window, WindowId}; //Makes Winit’s Window type available by its short name. This represents the operating-system window that will eventually display the game. WindowId identifies which window an event belongs to. It identifies the window without containing or owning the window itself.
use winit::application::ApplicationHandler; //A contract describing methods an application provides to receive events. We’ll implement it for App, so Winit can call our code when the application resumes or its window receives input.
use winit::event::WindowEvent; //event is Winit’s module containing event types. For Rosenblatt, these events will let the engine react when the player presses a key, resizes the window, or requests that it close. A Resized event, for example, carries the new dimensions.

#[derive(Default)] //Asks Rust to generate a default initialization for the structure immediately below it.
struct App { //Defines a structure named App: a container for state that persists between operating-system events.
    window: Option<Window>, //Declares a field named window. Option<Window> expresses two valid states: None means no window exists yet; Some(window) holds an existing window.
}

impl ApplicationHandler for App { //This is where we’ll define how Rosenblatt responds to application and window events
    fn resumed(&mut self, event_loop: &ActiveEventLoop) { //This is where we’ll create the game window. resumed is the callback name required by Winit. Once we start event processing, Winit calls it at startup and when the application resumes on platforms supporting that lifecycle. &mut self gives the method an exclusive, mutable borrow of the current App. This lets it update self.window while leaving ownership of the application with its caller.
        //event_loop names the parameter through which Winit supplies access to the running loop. : &ActiveEventLoop specifies that parameter’s type. The & means we borrow access rather than take ownership.
        if self.window.is_none() { //we’ll place window creation inside these braces. Since resumed can be called multiple times, this condition will prevent us from creating another window while the application already holds one.
            let attributes = Window::default_attributes()
                .with_title("Rosenblatt"); //we now have the configuration we’ll pass to the operating system when creating the game window.
            let window = event_loop.create_window(attributes)
                .expect("Failed to create a window"); //this is the call that will create Rosenblatt’s operating-system window when the callback runs.
            self.window = Some(window); //window is the local window created in the previous statement. Passing it into Some moves ownership into the application’s field. It does not create or copy another window.
            //App now keeps the window alive after resumed returns. Later event callbacks can access that same window through self.window.
            
        }
    }
}

fn main() {
    let event_loop = EventLoop::new().expect("Failed to create event loop."); //Creates the event-loop context and stores it in event_loop. This initializes the platform machinery needed to create windows and eventually receive events. Creation can fail; expect(...) stops startup with that message if it does.
    event_loop.set_control_flow(ControlFlow::Poll); //Configures the loop to begin another iteration immediately after finishing one, once we start it. This supports a game that continues updating while the player leaves the controls untouched.
    let mut app = App::default(); //we now construct the application state that will persist between events once connected to the event loop.

}