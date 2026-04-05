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
        requestStatus: requestStatus[0],
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
  requestStatus: string,
  adminNotes: string,
  userId: number,
) => {
  try {
  } catch (error) {
    console.error("createRequest", error);
    return null;
  }
};
