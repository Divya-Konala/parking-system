# Parking Lot Management System

This project implements a parking lot management system using React and Redux. The application allows users to manage parking slots, vehicles, and various filters for data visualization.

## Features

- **Entry Form**: The entry form lets users input the total number of parking slots available. It initializes the parking slots in the system.

- **Add Form**: The add form allows users to add new vehicles to the parking lot. Users can provide registration numbers, vehicle colors, and vehicle types (car/bike).

- **Lot Management**: Displays a data table of parked vehicles with filtering options for registration number, vehicle type, color, and slot number. It also provides an "Exit" button to remove vehicles from parking.

- **Visual Representation**: Provides a visual representation of the parking lot. Each parking slot is represented visually with information about the parked vehicles. Cars are shown with a car icon, while bikes are shown with bike icons.

## Getting Started

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd parking-system`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`

## Project Structure

- `src/redux`: Contains Redux actions, reducers, and action types.
- `src/components`: Contains the different components of the application (EntryForm, AddForm, LotManagement, DataTable, VisualRepresentation, etc.).
- `src/images`: Contains images used in the application.

## Dependencies

- React: A JavaScript library for building user interfaces.
- Redux: A state management library for managing the application's state.
- react-redux: Official React bindings for Redux.

## Author

Divya Konala

