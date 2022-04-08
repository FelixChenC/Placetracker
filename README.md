### Installation

1. `git clone https://github.com/FelixChenC/Placetracker` Clone the repo to your local
2. `cd Placetracker` Go to the project folder
3. `npm install` Install all libraries into your project
4. `npm start` Start your project

### Structure

    .
    ├── node_modules            # Externl modules that project deponds on
    ├── src                     # Project source folder
    │   ├── app                 # Main application folder
    │   │   ├── components      # Used to save components
    │   │        ├──Header      # Header folder for header and search input field
    │   │        ├──Map         # Map folder for google map and markers on the map
    │   │        ├──Table       # Table folder for table displaying all search places
    │   │   ├── context         # Use to store places context
    │   │   ├── reducers        # Used to save place reducer
    └─
