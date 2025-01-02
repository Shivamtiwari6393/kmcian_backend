const { Storage } = require('@google-cloud/storage')
const path = require('path')

const getSignedUrl = async (req, res) => {


    const { fileName, fileType } = req.query

    const storage = new Storage({
        keyFilename: path.join(__dirname, 'gold-setup-446607-t3-aba9a262a47e.json')
    })

    const bucketName = 'shivam-6393'


    try {

        const bucket = storage.bucket(bucketName)

        const file = bucket.file(fileName)


        const options = {
            version: 'v4',
            action: 'write',
            expires: Date.now() + 10 * 60 * 1000,
            contentType: fileType
        }

        const url = await file.getSignedUrl(options)
        return res.status(200).json({ url })
    } catch (error) {

        console.log('Error generating signed url', error);
        return res.status(500).send('Internal server error');

    }

}


module.exports = getSignedUrl