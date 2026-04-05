// used in request form
export const classifications = [
  "Amulet (AMU)",
  "Antiquity (ATQ)",
  "Art (ART)",
  "Art-Stained-Glass (ART)",
  "Audiovisual (AV)",
  "Bible-Printed Book (BIB)",
  "Binders Fragment (BF)",
  "Bullae (BUL)",
  "Ceramics (CER)",
  "Coin (NUM)",
  "Cuneiform (CUN)",
  "Facsimile (FAC)",
  "Furniture (FUR)",
  "Incunable (INC)",
  "Jewelry (JWL)",
  "Jewish Paraphernalia (JUD)",
  "Manuscript (MS)",
  "Manuscript-Papyrus (MS/PAP)",
  "Metals (MTL)",
  "Mummy Paraphernalia (MMY)",
  "Object (OBJ)",
  "Ostraca (OSTR)",
  "Pamphlet (PAM)",
  "Papers (PPR)",
  "Papyrus (PAP)",
  "Photograph (PHO)",
  "Press (PRS)",
  "Printed Book (PBK)",
  "Scroll (SCR)",
  "Seal (SEA)",
  "Statuary (STA)",
  "Stone (STN)",
  "Textile (TXT)",
  "Torah Paraphernalia (ARK)",
].sort((a, b) => a.localeCompare(b));

export interface RequestFormValues {
  firstName: string;
  lastName: string;
  email: string;
  classification: string; // always controlled, empty string when none
  objectName: string;
  objectCode: string;
  tier: string;
  onDisplay: boolean;
  objectLocation: string;
  width: string;
  height: string;
  depth: string;
  requestDueDate: Date | undefined;
  requestType: string;
  additionalNotes: string;
  objectPulledDate?: Date | undefined;
  objectPutBackDate?: Date | undefined;
  requestStartDate?: Date | undefined;
  requestEndDate?: Date | undefined;
  totalImageSize?: string;
  requestStatus?: string;
}

export const requestStatus = ["Created", "In Progress", "Done", "Abandoned"];

//  <div className="request-details">
//         <div className="request-info mb-4">
//           <p className="font-bold">Object Classification</p>
//           <p>[content]</p>
//         </div>
//         <div className="request-info mb-4">
//           <p className="font-bold">Object Name</p>
//           <p>[content]</p>
//         </div>
//         <div className="request-info mb-4">
//           <p className="font-bold">Object Code</p>
//           <p>[content]</p>
//         </div>
//         <div className="request-info mb-4">
//           <p className="">Tier</p>
//           <p>[content]</p>
//         </div>
//         <div className="request-info mb-4">
//           <p className="font-bold">On Display?</p>
//           <p>[content]</p>
//         </div>
//         <div className="request-info mb-4">
//           <p className="font-bold">Object Location</p>
//           <p>[content]</p>
//         </div>
//         <div className="request-info mb-4">
//           <p className="font-bold">Dimensions</p>
//           <p>[content]</p>
//         </div>
//         <div className="request-info mb-4">
//           <p className="font-bold">Request Due Date</p>
//           <p>[content]</p>
//         </div>
//         <div className="request-info mb-4">
//           <p className="font-bold">Request Type</p>
//           <p>[content]</p>
//         </div>
//         <div className="request-info mb-4">
//           <p className="font-bold">Additional Notes</p>
//           <p>[content]</p>
//         </div>
//         <Button>Update Request</Button>
//       </div>
