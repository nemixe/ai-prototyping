# Specification  
A web-based application to display and manage a list of **users** in a table format. Users can search, filter, create, edit, and view detailed data.  

## Details  

### List Page  
- **Display**: The user list should be presented in a table format.  
- **Search Feature**: Users can search by **username**.  
- **Filter Feature**: Users can filter data by **gender, role, and status**.  
- **Sorting Feature**: Users can sort data by any available property.  
- **Table Columns**:  
  - Username  
  - Full Name  
  - Role  
  - Permission Count (Total granted permissions)  
  - Address  
  - Email  
  - Status (Approved, Revised, Rejected)  
  - Created At  
  - Updated At  
- **Main Functionality**: The list page focuses on displaying data with options to **create, edit, and view details**.  
- **Sample Data**: Provide at least **10 sample entries**.  

### Detail Page  
- Displays the full details of a selected **user**.  
- Includes **approval actions**: **Reject, Approve, Revise**.  
- Displays a list of **permissions** in a table format with the following columns:  
  - **Menu** (The section/module where the permission applies)  
  - **Permission Type** (e.g., Read, Create, Delete)  
  - **Total Users** (Number of users with the same permission)  
- **Sample Data Permission**: Provide at least **10 sample entries for permissions**.  
- **Display User Login Activity**:  
  - login time (date and time)
  - logout time (date and time)
  - device/browser used.  
  - total onlie time
  - use Step from 'antd'

### Edit Page  
- Allows users to update **user** details.  
- Fields should be pre-filled with the selected data.  

### Create Page  
- Allows users to add a new **user**.  

### Additional Notes  
- **Short URLs must be unique**.  
- **Create/Edit User Requirements**: The following fields are required:  
  - **Username**  
  - **Full Name**  
  - **Email**  
  - **Role**  
  - **Password**  
  - **Address**  
