import  {  Config,  getFunctions,  getSchemaCreator  }  from  "nobox-client";
const token = process.env.NEXT_PUBLIC_NOBOX_ACCESS_TOKEN ;
const endpoint = process.env.NEXT_PUBLIC_NOBOX_ENDPOINT;

if(!token || !endpoint) {
    throw new Error("Accesstoken and API endpoint are required")
}
export const config: Config = {
endpoint, 
project:  "Sendly", 
token, 
};

export const createRowSchema = getSchemaCreator(config, { type: "rowed" });

export const createKeyGroupSchema = getSchemaCreator(config, { type: "key-group" });

export  const  Nobox  =  getFunctions(config);