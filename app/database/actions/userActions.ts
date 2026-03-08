"use server";
import { eq } from "drizzle-orm";
import { db } from "../drizzle";
import { usersTable } from "../schema";

type CreateUserResult =
  | {
      success: true;
      message: string;
      user: typeof usersTable.$inferSelect;
    }
  | { success: false; message: string; error?: unknown };

export const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  role: "requester" | "fulfiller",
): Promise<CreateUserResult> => {
  try {
    const existingUser = await getUser(email);

    if (existingUser) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    // using [createUser] is array destructuring to pull out the first and only object from that array
    const [createUser] = await db
      .insert(usersTable)
      .values({
        firstName,
        lastName,
        email,
        role,
      })
      .returning();

    return {
      success: true,
      message: "Created user",
      user: createUser,
    };
  } catch (error) {
    console.error("createUser", error);
    return {
      success: false,
      message: "Error creating user",
      error,
    };
  }
};

export const getUser = async (email: string) => {
  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    return user.length === 0 ? null : user;
  } catch (error) {
    console.error("getUser", error);
    return null;
  }
};

export const updateUser = async (
  userId: number,
  firstName: string,
  lastName: string,
  email: string,
) => {
  try {
    const [updateUser] = await db
      .update(usersTable)
      .set({
        firstName,
        lastName,
        email,
        updatedAt: new Date(Date.now()),
      })
      .where(eq(usersTable.id, userId))
      .returning();

      if (updateUser) {
        return {
          success: true,
          message: "Updated user",
          user: updateUser,
        }
      }

      return {
        success: false,
        message: "Could not update user",
      }
  } catch (error) {
    console.error("updateUser", error);
    return {
      success: false,
      message: "Error updating user",
      error
    };
  }
};
