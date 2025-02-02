export type ContactResponseType = {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  phone: string;
  note: string;
  telegram?: string;
  avatar?: string;
  company?: string;
  address?: string;
  createdAt: number;
  updatedAt: number;
  id: number;
};

export type ContactListResponseType = {
  meta: {
    skipped: number;
    limit: number;
    total: number;
    criteria: ContactListFilterRequestType;
  };
  items: ContactResponseType[];
};

export type ContactListFilterRequestType = {
  [K in keyof ContactResponseType]?: { contains: string };
};
