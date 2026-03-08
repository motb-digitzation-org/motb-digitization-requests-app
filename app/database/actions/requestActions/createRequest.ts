"use server";

import { db } from "../../drizzle";
import { requestsTable } from "../../schema";

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
    /**
     * Performs an upsert operation (insert or update). When conflict occurs (e.g., duplicate PK or unique constraint), instead of failing it updates the existing row.
     * 
     * conflict detection: You specify a `target` to monitor conflicts
     * 
     * `set` defines which columns to update
     */
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
        userId,
      })
      .onConflictDoUpdate({
        target: requestsTable.id,
        set: {
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
        },
      }).returning();

      return {
        success: true,
        message: "Created request",
        request: createRequest
      }

  } catch (error) {
    console.error("createRequest", error);
    return {
      success: false,
      message: "Error creating request",
      error
    };
  }
};

export const createRequestAsFulfiller = async (
  objectClass: string,
  objectName: string,
  objectCode: string,
  objectTier: number,
  objectOnDisplay: boolean,
  objectLocation: string,
  objectWidth: string,
  objectHight: string,
  objectDepth: string,
  objectMule: string,
  objectPulledDate: string,
  objectPutBackDate: string,
  requestDueDate: string,
  requestType: string,
  requestNotes: string,
  requestStartDate: string,
  requestEndDate: string,
  requestExportDate: string,
  requestTotalImgSize: string,
  adminNotes: string,
  userId: number,
) => {
  try {
  } catch (error) {
    console.error("createRequest", error);
    return null;
  }
};
