// used in request form
export const classifications = [
  { value: "AMU", label: "Amulet (AMU)" },
  { value: "ATQ", label: "Antiquity (ATQ)" },
  { value: "ART", label: "Art (ART)" },
  { value: "ART-SG", label: "Art-Stained-Glass (ART-SG)" },
  { value: "AV", label: "Audiovisual (AV)" },
  { value: "BIB", label: "Bible-Printed Book (BIB)" },
  { value: "BF", label: "Binders Fragment (BF)" },
  { value: "BUL", label: "Bullae (BUL)" },
  { value: "CER", label: "Ceramics (CER)" },
  { value: "NUM", label: "Coin (NUM)" },
  { value: "CUN", label: "Cuneiform (CUN)" },
  { value: "FAC", label: "Facsimile (FAC)" },
  { value: "FUR", label: "Furniture (FUR)" },
  { value: "INC", label: "Incunable (INC)" },
  { value: "JWL", label: "Jewelry (JWL)" },
  { value: "JUD", label: "Jewish Paraphernalia (JUD)" },
  { value: "MS", label: "Manuscript (MS)" },
  { value: "MS-PAP", label: "Manuscript-Papyrus (MS-PAP)" },
  { value: "MTL", label: "Metals (MTL)" },
  { value: "MMY", label: "Mummy Paraphernalia (MMY)" },
  { value: "OBJ", label: "Object (OBJ)" },
  { value: "OSTR", label: "Ostraca (OSTR)" },
  { value: "PAM", label: "Pamphlet (PAM)" },
  { value: "PPR", label: "Papers (PPR)" },
  { value: "PAP", label: "Papyrus (PAP)" },
  { value: "PHO", label: "Photograph (PHO)" },
  { value: "PRS", label: "Press (PRS)" },
  { value: "PBK", label: "Printed Book (PBK)" },
  { value: "SCR", label: "Scroll (SCR)" },
  { value: "SEA", label: "Seal (SEA)" },
  { value: "STA", label: "Statuary (STA)" },
  { value: "STN", label: "Stone (STN)" },
  { value: "TXT", label: "Textile (TXT)" },
  { value: "ARK", label: "Torah Paraphernalia (ARK)}" },
].sort((a, b) => a.label.localeCompare(b.label));

export interface RequestFormValues {
  firstName: string;
  lastName: string;
  email: string;
  classification: {value: string; label: string;}; // always controlled, empty string when none
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

  // additional admin (= fulfiller) fields
  mule?: string;
  pulledDate?: Date | undefined;
  putBackDate?: Date | undefined;
  requestStartDate?: Date | undefined;
  requestEndDate?: Date | undefined;
  requestExportDate?: Date | undefined;
  totalImageSize?: string;
  requestStatus?: string;
  adminNotes?: string;
}

export const requestStatus = [
  { value: "created", label: "Created" },
  { value: "inProg", label: "In Progress" },
  { value: "done", label: "Done" },
  { value: "abandoned", label: "Abandoned" },
];

export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "requester" | "fulfiller";
  createdAt: string;
  updatedAt: string;
}

export function getGlobalUser() {
  const userData = window.sessionStorage.getItem("user");

  if (userData) {
    const userParsed = JSON.parse(userData);
    return userParsed;
  }
}
