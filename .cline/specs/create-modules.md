# Modules Specification

## NOTE

- DONT MAKE the [resource].md file just understand it
- Make dummy file with constant variable

A web-based application to manage a generic resource. Users can perform CRUD (Create, Read, Update, Delete) operations such as listing items, viewing details, creating new items, and editing or deleting existing items. The application leverages file-based routing to automatically generate routes based on the file structure.

## File-based Routing Structure

### List Page (Read)

- **File Path:** `/src/app/[resource]/page.jsx`
- **Example File** `.cline/example/list.jsx`
- **Route:** `/[resource]`
- **Features:**
  - Displays a list of items for the resource.
  - Supports features like search, filtering, and sorting.
  - Main focus is on listing items with navigation to create, edit, or view details.
  - Sample data and data properties will be defined via prompt.

### Detail Page (Read)

- **File Path:** `/src/app/[resource]/[id]/page.jsx`
- **Example File** `.cline/example/detail.jsx`
- **Route:** `/[resource]/:id`
- **Features:**
  - Shows detailed information for a selected item.
  - Includes a back button to return to the list page.

### Edit Page (Update)

- **File Path:** `/src/app/[resource]/[id]/update/page.jsx`
- **Example File** `.cline/example/update.jsx`
- **Route:** `/[resource]/:id/edit`
- **Features:**
  - Provides a form for updating an existing item.
  - Pre-fills fields with the current item data.
  - Includes validation rules (e.g., required fields).
  - Contains actions such as a back button, cancel button, and submit button to save changes.

### Create Page (Create)

- **File Path:** `/src/app/[resource]/create/page.jsx`
- **Example File** `.cline/example/create.jsx`
- **Route:** `/[resource]/create`
- **Features:**
  - Provides a form to create a new item.
  - Includes validation rules (e.g., required fields).
  - Contains actions such as a back button, cancel button, and submit button to save the new item.

## Additonal Note

Dont forget to add a section [resource] to SIDEBAR_ITEMS located on `/src/app/layout.jsx`

## Summary

This file-based routing system uses a clear folder and file naming convention to automatically generate nested routes for any generic resource. Dynamic segments (like `[id]`) are transformed into URL parameters (e.g., `:id`), making the implementation of CRUD operations straightforward. The specific data properties and sample data will be defined dynamically as needed via prompts.
