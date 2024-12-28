"use server";

import { z } from "zod";
import { UrlFormSchema } from "./urlFormSchema";
import { saveUrl } from "@/service/Url";

type UrlFormFormData = z.infer<typeof UrlFormSchema>;
type BaseActionResponse = {
  type: "success" | "error";
  message: string;
};
type SuccessActionResponse = BaseActionResponse & {
  type: "success";
  data: {
    url: string;
  };
};
type ErrorResponse = BaseActionResponse & {
  type: "error";
};
type ActionResponse = SuccessActionResponse | ErrorResponse;

const createUrlAction = async (
  urlFormData: UrlFormFormData
): Promise<ActionResponse> => {
  try {
    const { url: address } = urlFormData;
    const savedUrl = await saveUrl(address);

    return {
      type: "success",
      message: "URL created successfully",
      data: {
        url: savedUrl.address,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      type: "error",
      message: "Something went wrong. Try again later.",
    };
  }
};

export { createUrlAction };
