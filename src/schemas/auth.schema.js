import { z } from "zod";

const authSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(8),
});

export default authSchema;
