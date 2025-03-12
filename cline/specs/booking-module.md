# Specification  
A web-based application to display and manage a list of **bookings** in a table format. Users can search, filter, create, edit, and view detailed booking information.  

## Details  

### List Page  
- **Display**: The booking list should be presented in a table format.  
- **Search Feature**: Users can search by **book title, user name**.  
- **Filter Feature**: Users can filter data by **booking status, user type, and booking date**.  
- **Sorting Feature**: Users can sort data by any available property.  
- **Table Columns**:  
  - Booking ID  
  - Book Title  
  - User Name  
  - User Type (Member, Guest, Admin)  
  - Booking Date  
  - Due Date  
  - Status (Booked, Returned, Overdue, Cancelled)  
  - Created At  
  - Updated At  
- **Main Functionality**: The list page focuses on displaying data with options to **create, edit, and view details**.  
- **Sample Data**: Provide at least **10 sample entries**.  

### Detail Page  
- Displays the full details of a selected **booking**.  
- Includes **booking management actions**: **Cancel Booking, Extend Booking, Mark as Returned**.  
- Displays a list of **associated book details** with the following columns:  
  - **Book Title**  
  - **Author**  
  - **ISBN**  
  - **Genre**  
  - **Availability Status**  
- **Sample Data for Book Details**: Provide at least **10 sample entries**.  
- **Display User Booking History**:  
  - Booked by
  - Booking date  
  - Approval workflow history (e.g., Requested, Approved, Rejected, Returned by John (Admin)) 
  
### Edit Page  
- Allows users to update **booking** details.  
- Fields should be pre-filled with the selected data.  

### Create Page  
- Allows users to add a new **booking**.  

### Additional Notes  
- **Each booking ID must be unique**.  
- **Create/Edit Booking Requirements**: The following fields are required:  
  - **Book Title**  
  - **User Name**  
  - **User Type**  
  - **Booking Date**  
  - **Due Date**  
  - **Status**  

