"use server";

import { db } from "../../drizzle";
import { requestsTable } from "../../schema";
import { requestStatus } from "../../utils";

export const createRequestAsRequester = async (
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
    const [createRequest] = await db
      .insert(requestsTable)
      .values({
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
        requestStatus: requestStatus[0].value,
        userId,
      })
      .returning();

    if (createRequest) {
      return {
        success: true,
        message: "Created request",
        request: createRequest,
      };
    }

    return {
      success: false,
      message: "Could not create request",
    };
  } catch (error) {
    console.error("createRequest", error);
    return {
      success: false,
      message: "Error creating request",
      error,
    };
  }
};