# **Spesification**  
A web-based application to display and manage a list of **movies** in a table format. Users can search, filter, create, edit, and view movie details.  

## **Details**  

### **List Page**  
- **Display**: The movie list should be presented in a tab "All Movies" and "Trending". Each tab should have a table with the following properties:
- **All Movie Properties**:  
  - Title  
  - Release Date  
  - Director  
  - Total Copies  
  - Created At  
  - Updated At  
- **Trending Movie Properties**:  
  - Title  
  - Release Date  
  - Director  
  - View this month
  - Social Mentions
  - Created At  
  - Updated At  
- **Search Feature**: Users can search for movies by title.  
- **Filter Feature**: Users can filter data by **director** and **release date**.  
- **Sorting Feature**: Users can sort data by **director, release date, and total copies**.  
- **Main Focus**: The functionality is limited to displaying the movie list with actions to **create, edit, and see details**.  
- **Sample Data**: Provide at least **10 sample movies**.  

### **Detail Page**  
- Displays the full details of a selected **movies**.  
- Includes **movie management actions**: **Delete, Edit**.  
- Displays a list of **associated actor details** with the following columns:  
  - **Name**  
  - **Gender**  
  - **Birthdate**  
  - **Country**  
- **Sample Data for Movie Details**: Provide at least **4 sample entries**.  
- **Display Timestamp Movie timeline**:  
  - Time
  - Topic  

### **Edit Page**  
- Allows users to update **movie** details.
- Allows users to edit actor
- Fields should be pre-filled with existing movie data.  
- Validation rules should be applied (**e.g., title and director cannot be empty**).  

### **Create Page**  
- Allows users to create **movie** details.  
- Allows users to add new actor
- Validation rules should be applied (**e.g., title and director cannot be empty**).  
