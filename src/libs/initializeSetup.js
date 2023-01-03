import Role from "../models/Role";

export const createRoles = async () => {
    try {
        const counter = await Role.estimatedDocumentCount();

        if (counter > 0) return;
      
        const values = await Promise.all([
          new Role({ name: "user" }).save(),
          new Role({ name: "admin" }).save(),
          new Role({ name: "moderator" }).save(),
        ]);
      
        
    } catch (error) {
        console.log("Error en el archivo initializeSetup.js con la creación de roles ")
    }
};
