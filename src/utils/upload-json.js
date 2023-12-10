import * as fs from 'node:fs/promises';


const uploadJsonFile = async (fileName) => {
	try {
		const file = await fs.readFile(`./json/${fileName}.json`, { encoding: "utf8" });
        if(!file){
            throw new Error('file is empty')
        }

        const data = JSON.parse(file)
        return Array.isArray(data) ? data : [data]

	} catch (error) {
        throw new Error(error.message)
    }
};

export { uploadJsonFile };
