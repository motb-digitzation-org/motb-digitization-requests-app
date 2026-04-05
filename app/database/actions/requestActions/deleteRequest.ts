"use server";
import { eq, or } from "drizzle-orm";
import { db } from "../../drizzle";
import { requestsTable } from "../../schema";

export const deleteAllRequests = async (userId: number) => {
  try {
    const delUser = await db
      .delete(requestsTable)
      .where(eq(requestsTable.userId, userId))
      .returning();

    if (delUser) {
      return {
        success: true,
        message: "Deleted all requests",
        user: delUser,
      };
    }

    return {
      success: false,
      message: "Could not delete all requests",
    };
  } catch (error) {
    console.error("deleteAllRequests", error);
    return {
      success: false,
      message: "Error deleting all request",
      error,
    };
  }
};
