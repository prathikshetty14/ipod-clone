# iPod Clone

## Table of Contents

- [About the Project](#project-description)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Author](#author)

## Project Description

The iPod Clone project is a React-based clone of the classic iPod interface. It replicates the familiar iPod menu structure, complete with interactive button gestures using ZingTouch. At present, the music section is fully implemented, allowing users to play, pause, skip tracks, and navigate back and forth. The other menu options are placeholders, displaying dummy icons. A live clock is integrated into the navigation bar.

## Features

- **Menu Page**: Includes four different menu options (wallpaper, music, app store, settings).

- **ZingTouch Integration**: Administrators can assign reviews to employees.
  
- **Music Section**: Employees can submit their reviews.
  
- **Navigation Bar**: Administrators can view, update, and delete reviews.


## Project Structure

- **App.js**: The main React component that handles the overall logic of the iPod interface. It manages the menu, button interactions, and the music player.
  
- **iPodMain.js**: This component creates the main container for the iPod interface, including the display and buttons.
  
- **iPodButtons.js**: A component responsible for rendering and handling the button interactions. It utilizes ZingTouch for gesture recognition and includes buttons for Menu, Backward, Forward, and Play/Pause.
  
- **iPodDisplay.js**: Manages the display and navigation of the iPod interface. It includes the clock display, battery and Wi-Fi icons, and dynamically renders the appropriate content based on the selected menu and state.


## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- React installed and running.

### Installation

1. Clone the repository:

`git clone https://github.com/prathikshetty14/ipod-clone`
   
2. Navigate to the project directory:

`cd ipod-app`

3. Install the required dependencies:

`npm install`


## Usage

- Start the development server:
  `npm start`
- Open your web browser and visit http://localhost:3000 to access the iPod Clone interface.
- Employees can log in and submit their assigned reviews.
- Use the iPod interface with ZingTouch-powered button interactions to navigate through the menu and enjoy the music section.


## Future Development

This project is an ongoing work in progress. Future development plans may include:

- Implementation of additional menu options, such as the app store and settings.
- Improvements to the overall user experience and interface design.


## Author
*Prathik Shetty* - **Full Stack Developer**
