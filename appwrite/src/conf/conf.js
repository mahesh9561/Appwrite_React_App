const conf = {
    appwwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwwritePROJECTID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwwriteDATABASEID: String(import.meta.env.VITE_DATABASE_ID),
    appwwriteCOLLECTIONID: String(import.meta.env.VITE_COLLECTION_ID),
    appwwriteBUCKETID: String(import.meta.env.VITE_BUCKET_ID)

}

export default conf