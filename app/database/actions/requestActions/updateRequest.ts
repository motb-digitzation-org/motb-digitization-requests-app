"use server";

import { eq } from "drizzle-orm";
import { db } from "../../drizzle";
import { requestsTable } from "../../schema";

export const updateRequestAsRequester = async (
	id: number,
  objectClass: string,
  objectName: string,
  objectCode: string,
  objectTier: number,
  objectOnDisplay: boolean,
  objectLocation: string,
  objectWidth: string,
  objectHeight: string,
  objectDepth: string,
  requestDueDate: Date | undefined,
  requestType: string,
  requestNotes: string,
  userId: number,
) => {
  try {
    const [updateRequest] = await db
      .update(requestsTable).set({
        objectClass,
        objectName,
        objectCode,
        objectTier,
        objectOnDisplay,
        objectLocation,
        objectWidth,
        objectHeight,
        objectDepth,
        requestDueDate,
        requestType,
        requestNotes,
        userId,
      }).where(eq(requestsTable.id, id)).returning();

    if (updateRequest) {
      return {
        success: true,
        message: "Updated request",
        request: updateRequest,
      };
    }

    return {
      success: false,
      message: "Could not update request",
    };
  } catch (error) {
    console.error("updateRequest", error);
    return {
      success: false,
      message: "Error updating request",
      error,
    };
  }
};