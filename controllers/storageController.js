const { Storage } = require('@google-cloud/storage')
const fs = require('fs');


const getSignedUrl = async (req, res) => {


    const { fileName, fileType } = req.query

    if (!fileName || !fileType) {
        return res.status(400).json({ "message": 'Missing required query parameters: fileName or fileType' });
    }


    const credentialsPath = '/tmp/service-account-key.json';
    fs.writeFileSync(credentialsPath, process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

    const storage = new Storage({ keyFilename: credentialsPath });
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
        fs.unlinkSync(credentialsPath);

        return res.status(200).json({ url })
    } catch (error) {

        console.log('Error generating signed url', error);
        if (fs.existsSync(credentialsPath)) {
            fs.unlinkSync(credentialsPath);
        }
        return res.status(500).send('Internal server error');

    }

}


module.exports = getSignedUrl