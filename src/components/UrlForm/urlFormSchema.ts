import { z } from "zod";

const UrlFormSchema = z.object({
  url: z.string().url(),
});

type UrlFormSchemaType = z.infer<typeof UrlFormSchema>;

export { UrlFormSchema };
export type { UrlFormSchemaType };
