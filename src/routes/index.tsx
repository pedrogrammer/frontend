import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContactDetails, ContactList, NotFound } from "../components/pages";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/contact/:id" element={<ContactDetails />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
