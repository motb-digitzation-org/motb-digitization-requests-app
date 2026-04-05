"use server";

import { desc, eq } from "drizzle-orm";
import { db } from "../../drizzle";
import { requestsTable } from "../../schema";

export const getAllRequestsByUser = async (userId: number) => {
  try {
    const getAllRequests = await db
      .select()
      .from(requestsTable)
      .where(eq(requestsTable.userId, userId))
      .orderBy(desc(requestsTable.createdAt));

		if (getAllRequests.length > 0) {
			return {
				success: true,
				message: "All requests by user",
				requestsList: getAllRequests
			}
		}

		return {
      success: false,
      message: "Could not get all requests by user",
    };
  } catch (error) {
    console.error("getAllRequestsByUser", error);
    return {
      success: false,
      message: "Could not get all requests by user",
      error,
    };
  }
};
