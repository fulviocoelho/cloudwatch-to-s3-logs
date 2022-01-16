import IFolder from "../interfaces/IFolder"

function folder(): IFolder {
    return {
        generatePrefix: (s3_folder: string) => {
            const new_name = s3_folder.replace(/\//gi, '-')
            return new_name.substring(1, new_name.length)
        }
    }
}

export { folder }