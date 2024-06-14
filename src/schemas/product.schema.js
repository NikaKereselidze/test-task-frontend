import { z } from "zod";

const productSchema = z.object({
  email: z.string().email().min(2).max(50),
  name: z.string(),
});

export default productSchema;
