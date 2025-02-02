import { useState, useEffect } from "react";

const FREQUENT_CONTACTS_KEY = "frequentContacts";

type ContactType = {
  id: number;
  name: string;
  avatar?: string;
  phone: string;
  city?: string;
};

export const useFrequentContacts = () => {
  const [frequentContacts, setFrequentContacts] = useState<ContactType[]>([]);

  // Load from localStorage on component mount
  useEffect(() => {
    const storedContacts = localStorage.getItem(FREQUENT_CONTACTS_KEY);
    if (storedContacts) {
      setFrequentContacts(JSON.parse(storedContacts));
    }
  }, []);

  // Function to add a new visited contact
  const addContactVisit = (contact: ContactType) => {
    setFrequentContacts((prev) => {
      const updatedContacts = [
        contact,
        ...prev.filter(({ id }) => id !== contact.id),
      ].slice(0, 4);
      localStorage.setItem(
        FREQUENT_CONTACTS_KEY,
        JSON.stringify(updatedContacts),
      );
      return updatedContacts;
    });
  };

  return { frequentContacts, addContactVisit };
};
