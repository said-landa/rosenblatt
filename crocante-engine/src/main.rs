//main.rs contains imports, App, and engine startup.

use winit::event_loop::{ControlFlow, EventLoop}; //EventLoop prepares communication with the operating system; ControlFlow determines whether that loop waits or keeps cycling. use lets us write their short names
use winit::window::Window; //Makes Winit’s Window type available by its short name. This represents the operating-system window that will eventually display the game.

#[derive(Default)] //Asks Rust to generate a default initialization for the structure immediately below it.
struct App { //Defines a structure named App: a container for state that persists between operating-system events.
    window: Option<Window>, //Declares a field named window. Option<Window> expresses two valid states: None means no window exists yet; Some(window) holds an existing window.
}

fn main() {
    let event_loop = EventLoop::new().expect("Failed to create event loop."); //Creates the event-loop context and stores it in event_loop. This initializes the platform machinery needed to create windows and eventually receive events. Creation can fail; expect(...) stops startup with that message if it does.
    event_loop.set_control_flow(ControlFlow::Poll); //Configures the loop to begin another iteration immediately after finishing one, once we start it. This supports a game that continues updating while the player leaves the controls untouched.

}