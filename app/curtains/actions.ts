"use server";

import { toggleCurtain } from "@/services/curtainService";
import { curtainDevices } from "./curtain-data";

export type CurtainCommandState = {
  status: "idle" | "success" | "error";
  message: string;
};

function getCurtainLabel(curtainId: string): string {
  return curtainDevices.find((curtain) => curtain.id === curtainId)?.label ?? curtainId;
}

function isDesiredState(value: string): value is "open" | "close" {
  return value === "open" || value === "close";
}

export async function toggleCurtainAction(
  _state: CurtainCommandState,
  formData: FormData,
): Promise<CurtainCommandState> {
  const curtainId = String(formData.get("curtainId") ?? "");
  const desiredState = String(formData.get("desiredState") ?? "");

  if (!curtainId || !isDesiredState(desiredState)) {
    return {
      status: "error",
      message: "Choose a curtain and action before sending the command.",
    };
  }

  await toggleCurtain(curtainId, desiredState === "open");

  return {
    status: "success",
    message: `${getCurtainLabel(curtainId)} is now ${desiredState === "open" ? "open" : "closed"}.`,
  };
}

export async function toggleAllCurtainsAction(
  _state: CurtainCommandState,
  formData: FormData,
): Promise<CurtainCommandState> {
  const desiredState = String(formData.get("desiredState") ?? "");

  if (!isDesiredState(desiredState)) {
    return {
      status: "error",
      message: "Choose a scene before sending the command.",
    };
  }

  const shouldOpen = desiredState === "open";

  for (const curtain of curtainDevices) {
    await toggleCurtain(curtain.id, shouldOpen);
  }

  return {
    status: "success",
    message: `All curtain zones have been ${shouldOpen ? "opened" : "closed"}.`,
  };
}