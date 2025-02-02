import { act, renderHook } from "@testing-library/react";
import { useFrequentContacts } from "../index";

// Mock localStorage
beforeEach(() => {
  localStorage.clear();
});

const contact1 = {
  id: 1,
  name: "Alice",
  phone: "123",
  avatar: "img1",
  city: "NY",
};
const contact2 = {
  id: 2,
  name: "Bob",
  phone: "456",
  avatar: "img2",
  city: "LA",
};
const contact3 = {
  id: 3,
  name: "Charlie",
  phone: "789",
  avatar: "img3",
  city: "SF",
};
const contact4 = {
  id: 4,
  name: "David",
  phone: "321",
  avatar: "img4",
  city: "TX",
};
const contact5 = {
  id: 5,
  name: "Eve",
  phone: "654",
  avatar: "img5",
  city: "CHI",
}; // This one should remove Alice

test("should add a contact to frequent contacts", () => {
  const { result } = renderHook(() => useFrequentContacts());

  act(() => {
    result.current.addContactVisit(contact1); // ✅ Correct function name
  });

  expect(result.current.frequentContacts).toEqual([contact1]);
  //   expect(JSON.parse(localStorage.getItem("frequentContacts")!)).toEqual([
  //     contact1,
  //   ]);
  const storedContacts = localStorage.getItem("frequentContacts");
  const parsedContacts = storedContacts ? JSON.parse(storedContacts) : [];

  expect(parsedContacts).toEqual([contact1]);
});

test("should keep the last 4 visited contacts", () => {
  const { result } = renderHook(() => useFrequentContacts());

  act(() => {
    result.current.addContactVisit(contact1);
    result.current.addContactVisit(contact2);
    result.current.addContactVisit(contact3);
    result.current.addContactVisit(contact4);
    result.current.addContactVisit(contact5); // This should remove contact1 (Alice)
  });

  expect(result.current.frequentContacts).toEqual([
    contact5,
    contact4,
    contact3,
    contact2,
  ]);
  expect(result.current.frequentContacts.length).toBe(4);
});

test("should move existing contact to the top when revisited", () => {
  const { result } = renderHook(() => useFrequentContacts());

  act(() => {
    result.current.addContactVisit(contact1);
    result.current.addContactVisit(contact2);
    result.current.addContactVisit(contact3);
    result.current.addContactVisit(contact4);
    result.current.addContactVisit(contact1); // Alice should move to the top
  });

  expect(result.current.frequentContacts).toEqual([
    contact1,
    contact4,
    contact3,
    contact2,
  ]);
});
