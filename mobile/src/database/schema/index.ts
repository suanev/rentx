import { appSchema } from "@nozbe/watermelondb/Schema";
import { carSchema } from "./carSchema";

import { userSchema } from "./userSchema";

const schemas = appSchema({
  version: 5,
  tables: [userSchema, carSchema],
});

export { schemas };
