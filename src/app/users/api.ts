import {
  TUserCreateRequest,
  TUserDetailResponse,
  TUserGetRequest,
  TUserListResponse,
  TUserUpdateRequest,
} from "./type";

export const getUsers = async (params: TUserGetRequest): Promise<TUserListResponse> => {
  // Using dummy data as per specs
  const dummyUsers = Array.from({ length: 10 }, (_, index) => ({
    id: "9b89100c-fd49-4b87-b2fd-763832c59cc1",
    fullname: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    birthdate: "1990-01-01",
    password: "password123",
    created_at: "2024-02-21T00:00:00Z",
    updated_at: null,
    deleted_at: null,
  }));

  return {
    status_code: 200,
    data: {
      items: dummyUsers,
      meta: {
        page: params.page || 1,
        per_page: params.limit || 10,
        total: dummyUsers.length,
        total_page: Math.ceil(dummyUsers.length / (params.limit || 10)),
      },
    },
    version: "1.0",
  };
};

export const getUser = async (id: string): Promise<TUserDetailResponse> => {
  // Using dummy data as per specs
  return {
    status_code: 200,
    data: {
      id,
      fullname: `User ${id}`,
      email: `user${id}@example.com`,
      birthdate: "1990-01-01",
      password: "password123",
      created_at: "2024-02-21T00:00:00Z",
      updated_at: null,
      deleted_at: null,
    },
    version: "1.0",
  };
};

export const createUser = async (data: TUserCreateRequest): Promise<TUserDetailResponse> => {
  return {
    status_code: 200,
    data: {
      id: "9b89100c-fd49-4b87-b2fd-763832c59cc1",
      ...data,
      created_at: new Date().toISOString(),
      updated_at: null,
      deleted_at: null,
    },
    version: "1.0",
  };
};

export const updateUser = async (
  id: string,
  data: TUserUpdateRequest,
): Promise<TUserDetailResponse> => {
  return {
    status_code: 200,
    data: {
      ...data,
      id,
      updated_at: new Date().toISOString(),
    },
    version: "1.0",
  };
};

export const deleteUser = async (id: string): Promise<{ status_code: number; version: string }> => {
  console.log(id);
  return { status_code: 200, version: "1.0" };
};
