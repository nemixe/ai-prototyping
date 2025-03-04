# CRUD File-Based Routing Specification

This document explains how file-based routing works for a CRUD (Create, Read, Update, Delete) system in a web application. Each file path corresponds to a specific route and page type. The structure uses a simple naming convention to determine the purpose of each file.

## Rules for Sharing Components ( Create and Update Page)

- create the form components inside `/_components` folder
- `/src/app/[resource]/_components/form.tsx`

## Routing Basics

- **Base Directory:**  
  All files are placed under the `/src/app` folder.

- **Resource Folder:**  
  Each resource has its own folder (e.g., `[resource]`). Use a generic name that represents any resource.

- **Page Files:**
  - Files ending with `page.jsx` are standard page components.
  - Use square brackets (e.g., `[id]`) for dynamic segments, which become URL parameters (e.g., `:id`).

## Examples

### 1. List Page (Read)

- **File Path:** `/src/app/[resource]/page.jsx`
- **Generated Route:** `/[resource]`
- **Purpose:**  
  Displays a list of items for the resource.
- **Usage:**  
  The page may include features like search, filtering, and pagination.

### 2. Create Page (Create)

- **File Path:** `/src/app/[resource]/create/page.jsx`
- **Generated Route:** `/[resource]/create`
- **Purpose:**  
  Provides a form to create a new item.
- **Usage:**  
  The page exports a component with form fields, and may include loader and action functions to handle form submission and validation.

### 3. Detail Page (Read)

- **File Path:** `/src/app/[resource]/[id]/page.jsx`
- **Generated Route:** `/[resource]/:id`
- **Purpose:**  
  Shows detailed information about a specific item.
- **Usage:**  
  The `[id]` segment is dynamic. When a user visits `/[resource]/123`, the value `123` is passed as the item ID to the page.

### 4. Edit Page (Update)

- **File Path:** `/src/app/[resource]/[id]/edit/page.jsx`
- **Generated Route:** `/[resource]/:id/edit`
- **Purpose:**  
  Provides a form to update an existing item.
- **Usage:**  
  The page is pre-filled with the current details of the item and allows users to edit and save changes. Loader and action functions can be used to manage data fetching and form submission.

### 5. Delete Confirmation Page (Delete)

- **File Path:** `/src/app/[resource]/[id]/delete/page.jsx`
- **Generated Route:** `/[resource]/:id/delete`
- **Purpose:**  
  Displays a confirmation page before deleting an item.
- **Usage:**  
  The page confirms whether the user wants to delete the item and typically includes an action function to handle the deletion.

## Additional Notes

- **Route Generation:**  
  The file system structure is automatically converted into nested routes. For example, the file path `/src/app/products/[id]/page.jsx` generates the route `/products/:id`.

This simple specification is designed to help an AI system understand how to generate file-based routes for a CRUD application using a generic resource. Placeholders such as `[resource]` and `[id]` can be replaced with actual resource names and identifiers as needed.
